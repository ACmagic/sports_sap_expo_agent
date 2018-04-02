import gql from 'graphql-tag';

export default gql`
	query ( $Player: String, $isClosed: Boolean ) {
		betOrdersOverview ( Player: $Player, isClosed: $isClosed ) {
			activePlayers
			totalAtRisk
			totalToWin
			totalBets
		}
		agentCurrentCredit {
			balance
			pending
		}
	}
`