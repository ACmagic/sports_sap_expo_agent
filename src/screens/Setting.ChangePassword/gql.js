import gql from 'graphql-tag';

export const Mutation = gql`
	mutation ($password: String!, $newPassword: String!, $confirmNewPassword: String!) {
		changePassword(password: $password, newPassword: $newPassword, confirmNewPassword: $confirmNewPassword) {
			title
			content
			status
		}
	}
`