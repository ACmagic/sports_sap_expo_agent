import gql from 'graphql-tag';

export const Mutation = gql`
	mutation ($password: String!, $newPasscode: String!, $confirmNewPasscode: String!) {
		changePasscode(password: $password, newPasscode: $newPasscode, confirmNewPasscode: $confirmNewPasscode) {
			title
			content
			status
		}
	}
`