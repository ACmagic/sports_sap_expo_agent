const renameAction = action => {
	switch(action){
		case 'straight':
			return 'STRAIGHT'
		case 'parlay':
			return 'PARLAY'
		case 'basicTeaser':
			return 'BASIC TEASER'
		case 'specialTeaser':
			return 'SPECIAL TEASER'
		case 'bigTeaser':
			return 'BIG TEASER'
		case 'superTeaser':
			return 'SUPER TEASER'
		case 'winReverse':
			return 'WIN REVERSE'
		case 'actionReverse':
			return 'ACTION REVERSE'
		default: 
			return ''
	}
}

export default renameAction