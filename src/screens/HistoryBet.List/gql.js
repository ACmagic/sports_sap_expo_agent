import gql from 'graphql-tag';

export const PlayerQuery = gql`
	query ( $isClosed: Boolean!, $startOfWeekNum: Int, $endOfWeekNum: Int ) {
		betOrders ( isClosed: $isClosed, startOfWeekNum: $startOfWeekNum, endOfWeekNum: $endOfWeekNum ) {
			_id
			ID
			title
			resultAmount
			status
			updatedAt
			createdAt
		}
	}
`

export const AgentQuery = gql`
	query ( $Player: String, $isClosed: Boolean!, $startOfWeekNum: Int, $endOfWeekNum: Int ) {
		betOrders ( Player: $Player, isClosed: $isClosed, startOfWeekNum: $startOfWeekNum, endOfWeekNum: $endOfWeekNum ) {
			_id
			ID
			title
			Player {
			  username
			}
			resultAmount
			status
			updatedAt
			createdAt
		}
	}
`