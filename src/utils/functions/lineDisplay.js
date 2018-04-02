const lineDisplay = line => {
    if(line === null || line === 0) return null
    return line > 0 ? ` ( +${line} )` : ` ( -${Math.abs(line)} )`
}

export default lineDisplay