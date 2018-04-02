import gql from 'graphql-tag';

export default gql`
	query ( $Player: String, $isClosed: Boolean ) {
		betOrders ( Player: $Player, isClosed: $isClosed ) {
			_id
			ID
			title
			Player {
			  username
			}
			resultAmount
			status
			bet {
			  toWin
			  atRisk
			}
			updatedAt
			createdAt
		}
	}
`