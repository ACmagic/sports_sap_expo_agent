export const handleSelectEventOdd = (eventOdd, userWagerLimit) => ({ type: 'SELECT_EVENTODD', payload: eventOdd, userWagerLimit: userWagerLimit })
export const handlePickEventOdd = eventOdd => ({ type: 'PICK_EVENTODD', payload: eventOdd })
export const handleDropEventOdd = eventOdd => ({ type: 'DROP_EVENTODD', payload: eventOdd })
export const handleClearEventOdd = () => ({ type: 'CLEAR_EVENTODD' })

