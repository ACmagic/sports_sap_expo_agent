import gql from 'graphql-tag';

export const Mutation = gql`
	mutation ( $username: String!, $email: String!, $password: String!, $passcode: String!, $deviceToken: String ) {
		agentRegister ( username: $username, email: $email, password: $password, passcode: $passcode, deviceToken: $deviceToken ){
			title
			content
			status
		} 
	}
`