import gql from 'graphql-tag';

export const PlayerQuery = gql`
	query ( $isClosed: Boolean, $startOfWeekNum: Int, $endOfWeekNum: Int ) {
		betOrdersOverview ( isClosed: $isClosed, startOfWeekNum: $startOfWeekNum, endOfWeekNum: $endOfWeekNum ) {
			resultAmount
			totalBets
			overview {
				action {
					straight {
						Won
						Lost
						Push
					}
					parlay {
						Won
						Lost
						Push
					}
					basicTeaser {
						Won
						Lost
						Push
					}
					specialTeaser {
						Won
						Lost
						Push
					}
					bigTeaser {
						Won
						Lost
						Push
					}
					superTeaser {
						Won
						Lost
						Push
					}
					actionReverse {
						Won
						Lost
						Push
					}
					winReverse {
						Won
						Lost
						Push
					}
				}
				sport {
					Basketball {
						Won
						Lost
						Push
					}
					Football {
						Won
						Lost
						Push
					}
					Baseball {
						Won
						Lost
						Push
					}
					Hockey {
						Won
						Lost
						Push
					}
					Soccer {
						Won
						Lost
						Push
					}
					Fighting {
						Won
						Lost
						Push
					}
					ESports {
						Won
						Lost
						Push
					}
				}
				odd {
					MLine {
						Won
						Lost
						Push
					}
					Spread {
						Won
						Lost
						Push
					}
					Total {
						Won
						Lost
						Push
					}
					Draw {
						Won
						Lost
						Push
					}
				}
			}
			
		}
	}
`

export const AgentQuery = gql`
	query ( $Player: String, $isClosed: Boolean, $startOfWeekNum: Int, $endOfWeekNum: Int ) {
		betOrdersOverview ( Player: $Player, isClosed: $isClosed, startOfWeekNum: $startOfWeekNum, endOfWeekNum: $endOfWeekNum ) {
			activePlayers
			resultAmount
			totalBets
			overview {
				action {
					straight {
						Won
						Lost
						Push
					}
					parlay {
						Won
						Lost
						Push
					}
					basicTeaser {
						Won
						Lost
						Push
					}
					specialTeaser {
						Won
						Lost
						Push
					}
					bigTeaser {
						Won
						Lost
						Push
					}
					superTeaser {
						Won
						Lost
						Push
					}
					actionReverse {
						Won
						Lost
						Push
					}
					winReverse {
						Won
						Lost
						Push
					}
				}
				sport {
					Basketball {
						Won
						Lost
						Push
					}
					Football {
						Won
						Lost
						Push
					}
					Baseball {
						Won
						Lost
						Push
					}
					Hockey {
						Won
						Lost
						Push
					}
					Soccer {
						Won
						Lost
						Push
					}
					Fighting {
						Won
						Lost
						Push
					}
					ESports {
						Won
						Lost
						Push
					}
				}
				odd {
					MLine {
						Won
						Lost
						Push
					}
					Spread {
						Won
						Lost
						Push
					}
					Total {
						Won
						Lost
						Push
					}
					Draw {
						Won
						Lost
						Push
					}
				}
			}
		}
	}
`

//	odd {
//		MLine
//		Spread
//		Total
//		Draw
//	}
//}