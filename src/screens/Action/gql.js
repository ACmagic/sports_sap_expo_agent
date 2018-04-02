import gql from 'graphql-tag';

export const PlayerQuery = gql`
	query {
		player {
			wagerLimit {
				straight
				parlay
				basicTeaser
				specialTeaser
				bigTeaser
				superTeaser
				actionReverse
				winReverse
			}
		}
	}
`