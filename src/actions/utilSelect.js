export const handleSelectWeekNum = weekNum => ({ type: 'SELECT_WEEKNUM', payload: weekNum })

export const handleSetStartOfWeekNum = weekNum => ({ type: 'SET_STARTOFWEEKNUM', payload: weekNum })
export const handleUnsetStartOfWeekNum = weekNum => ({ type: 'UNSET_STARTOFWEEKNUM', payload: weekNum })

export const handleSetEndOfWeekNum = weekNum => ({ type: 'SET_ENDOFWEEKNUM', payload: weekNum })
export const handleUnsetEndOfWeekNum = weekNum => ({ type: 'UNSET_ENDOFWEEKNUM', payload: weekNum })

export const handleSelectPlayer = Player => ({ type: 'SELECT_PLAYER', payload: Player })
export const handleSetPlayer = Player => ({ type: 'SET_PLAYER', payload: Player })
export const handleUnsetPlayer = Player => ({ type: 'UNDSET_PLAYER', payload: Player })

export const handleSelectBetOrder = BetOrder => ({ type: 'SELECT_BETORDER', payload: BetOrder })
export const handleSetBetOrder = BetOrder => ({ type: 'SET_BETORDER', payload: BetOrder })
export const handleUnsetBetOrder = BetOrder => ({ type: 'UNDSET_BETORDER', payload: BetOrder })