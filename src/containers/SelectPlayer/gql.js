import gql from 'graphql-tag';

export const Query = gql`
	query {
		agentPlayers {
			_id
			username
			isActivate
			lastOnlineAt
		}
	}
`