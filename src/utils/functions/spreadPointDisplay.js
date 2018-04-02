const spreadPointDisplay = point => {
	if(point === null) return null
    if(point === 0) return 'PK'
    if(point > 0) { return ` +${point}` } else { return ` -${Math.abs(point)}` }
}

export default spreadPointDisplay