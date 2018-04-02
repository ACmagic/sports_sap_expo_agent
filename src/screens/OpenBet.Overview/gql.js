import gql from 'graphql-tag';

export const PlayerQuery = gql`
	query ( $isClosed: Boolean ) {
		betOrdersOverview ( isClosed: $isClosed ) {
			totalToWin
			totalAtRisk
			totalBets
			overview {
				action {
					straight {
						Pending
					}
					parlay {
						Pending
					}
					basicTeaser {
						Pending
					}
					specialTeaser {
						Pending
					}
					bigTeaser {
						Pending
					}
					superTeaser {
						Pending
					}
					actionReverse {
						Pending
					}
					winReverse {
						Pending
					}
				}
				sport {
					Basketball {
						Pending
					}
					Football {
						Pending
					}
					Baseball {
						Pending
					}
					Hockey {
						Pending
					}
					Soccer {
						Pending
					}
					Fighting {
						Pending
					}
					ESports {
						Pending
					}
				}
				odd {
					MLine {
						Pending
					}
					Spread {
						Pending
					}
					Total {
						Pending
					}
					Draw {
						Pending
					}
				}
			}
		}
	}
`

export const AgentQuery = gql`
	query ( $Player: String, $isClosed: Boolean ) {
		betOrdersOverview ( Player: $Player, isClosed: $isClosed ) {
			activePlayers
			totalToWin
			totalAtRisk
			totalBets
			overview {
				action {
					straight {
						Pending
					}
					parlay {
						Pending
					}
					basicTeaser {
						Pending
					}
					specialTeaser {
						Pending
					}
					bigTeaser {
						Pending
					}
					superTeaser {
						Pending
					}
					actionReverse {
						Pending
					}
					winReverse {
						Pending
					}
				}
				sport {
					Basketball {
						Pending
					}
					Football {
						Pending
					}
					Baseball {
						Pending
					}
					Hockey {
						Pending
					}
					Soccer {
						Pending
					}
					Fighting {
						Pending
					}
					ESports {
						Pending
					}
				}
				odd {
					MLine {
						Pending
					}
					Spread {
						Pending
					}
					Total {
						Pending
					}
					Draw {
						Pending
					}
				}
			}
		}
	}
`