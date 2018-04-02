export const handleSelectSport = sport => ({ type: 'SELECT_SPORT', payload: sport })
export const handlePickSport = sport => ({ type: 'PICK_SPORT', payload: sport })
export const handleDropSport = sport => ({ type: 'DROP_SPORT', payload: sport })

export const handleSelectLeague = league => ({ type: 'SELECT_LEAGUE', payload: league })
export const handlePickLeague = league => ({ type: 'PICK_LEAGUE', payload: league })
export const handleDropLeague = league => ({ type: 'DROP_LEAGUE', payload: league })

export const handleSelectPeriod = (period, pick) => ({ type: 'SELECT_PERIOD', payload: period })
export const handlePickPeriod = (period, pick) => ({ type: 'PICK_PERIOD', payload: period })
export const handleDropPeriod = (period, pick) => ({ type: 'DROP_PERIOD', payload: period })

export const handleClearTable = () => ({ type: 'CLEAR_TABLE' })