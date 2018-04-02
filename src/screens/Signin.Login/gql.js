import gql from 'graphql-tag';

export default gql`
	mutation ( $username: String!, $password: String! ) {
		agentLogin ( username: $username, password: $password ){
			title
			content
			status
		} 
	}
`