import gql from 'graphql-tag';

export const Mutation = gql`
	mutation ( $email: String!, $passcode: String! ) {
		forgotPassword ( email: $email, passcode: $passcode ){
			title
			content
			status
		} 
	}
`