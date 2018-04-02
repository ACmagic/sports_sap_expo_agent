import gql from 'graphql-tag';

export const Query = gql`
	query {
		agent {
			email
		}
	}
`

export const Mutation = gql`
	mutation ( $passcode: String!, $email: String! ) {
		changeEmail ( passcode: $passcode, email: $email ) {
			title
			content
			status
		}
	}
`