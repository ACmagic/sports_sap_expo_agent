import lineDisplay from './lineDisplay'
import teaserOddLine from '../collections/teaserOddLine'

const showTeaserOddLine = (action, teams) => {
	if(!action) return null
    switch(action){
        case 'straight':
        case 'parlay':
        case 'winReverse':
        case 'actionReverse':
            return null
        default:
            return lineDisplay(teaserOddLine[action][teams])
    }
}

export default showTeaserOddLine