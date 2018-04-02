import gql from 'graphql-tag';

export const Query = gql`
	query ( $BetOrder: String ) {
		betOrder ( BetOrder: $BetOrder ) {
			_id
			ID
			title
			bet {
		      toWin
		      atRisk
			}
			Player {
				username
			}
			isClosed
			status
			createdAt
			Picks {
				_id
				Event {
					title
					period
					team {
						home
						homeROT
						away
						awayROT
					}
					teamLogo {
						away
						home
						default
					}
					updatedAt
					matchTime
				}
				status
				marked {
					oddLine
					oddPoint
					oddTarget
					oddType
					oddLineTarget
					oddPointTarget
				}
			}
		}
	}
`