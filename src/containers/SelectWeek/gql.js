import gql from 'graphql-tag';

export const Query = gql`
	query {
		user {
			createdAt
		}
	}
`