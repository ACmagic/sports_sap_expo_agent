import _ from 'lodash'

const teaserOddLine = {
	'basicTeaser': 		[ 0, 0, -110, 160, 250, 400, 600, 900, 1400],
	'specialTeaser': 	[ 0, 0, -130, 140, 200, 350, 500, 800, 1200],
	'bigTeaser': 		[ 0, 0, -140, 120, 180, 300, 400, 700, 1000],
	'superTeaser': 		[ 0, 0, 0, -130 ]
}

export const generateAtRiskToWin = (action, betType, betAmount, wagerPicks) => {
	let line = 0
	let atRisk = 0
	let toWin = 0
	switch(action){
		case 'straight':
			line = wagerPicks[0].marked.oddLine
			break;
		case 'parlay':
			let parlayLine = wagerPicks.map(({ marked: { oddLine }}) => oddLine > 0 ? (oddLine + 100) / 100 : (Math.abs(oddLine) + 100) / Math.abs(oddLine)).reduce((a, b) => a * b ) -1
			line = parlayLine > 1 ? parlayLine * 100 : -(100 / parlayLine)
			break;
		case 'basicTeaser':
		case 'specialTeaser':
		case 'bigTeaser':
		case 'superTeaser':
			line = teaserOddLine[action][wagerPicks.length]
			break;
		case 'actionReverse':
		case 'winReverse':
			line = wagerPicks.map(({ marked: { oddLine }}) => oddLine > 0 ? betAmount * oddLine / 100 : betAmount / Math.abs(oddLine) * 100 ).reduce((a, b) => a += b)
			break;
		default:
			break;
	}
	
	if(action !== 'actionReverse' || action !== 'winReverse'){
		if(betType === 'wager'){
			if(line > 0) {
				atRisk = betAmount
				toWin = betAmount * line / 100
			}else{
				atRisk = betAmount * Math.abs(line) / 100
				toWin = betAmount
			}
		}else if(betType === 'risk'){
			atRisk = betAmount
			if(line > 0){
				toWin = betAmount * line / 100
			}else{
				toWin = betAmount / Math.abs(line) * 100
			}
		}
	}

	if(action === 'actionReverse' || action === 'winReverse'){
		if(betType === 'wager'){
			atRisk = ( wagerPicks.length - 1 ) * wagerPicks.length * betAmount
			toWin = ( wagerPicks.length - 1 ) * 2 * line
		}else if(betType === 'risk'){
			atRisk = betAmount
			toWin = line / ( wagerPicks.length / 2 )
		}
	}
	return { atRisk: Math.round(atRisk) || 0, toWin: Math.round(toWin) || 0 }
}

export const submitValidate = ({ betAmount, atRisk, toWin }, wagerPicks, { wagerLimit: { minRisk, maxWin }, credit: { available } }  ) => {
	const allEventOnTime = _.every(wagerPicks, [ 'Event.isOddExpired', false ] )  
	const allOddActive = _.every(wagerPicks, [ 'Event.isActionOddActivate', true ] ) 
	const creditRemaining = available - atRisk
	switch(true){
		case betAmount === '': 			return {}
		case !allEventOnTime: 			return { message: 'Event Has Expired' }
		case !allOddActive: 			return { message: 'Event Odd Unavailable'}
		case isNaN(Number(betAmount)): 	return { message: 'Invalid Amount' }
		case creditRemaining < 0: 		return { message: 'Not Enought Credit' }
		case minRisk > Number(atRisk): 	return { message: 'Minimum At Risk ' + minRisk }
		case maxWin < Number(toWin): 	return { message: 'Maximum To Win ' + maxWin }
		default: return {}
	}
}