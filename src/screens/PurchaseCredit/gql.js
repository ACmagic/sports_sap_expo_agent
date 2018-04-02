import gql from 'graphql-tag';

export const Query = gql`
	query {
		user {
			credit {
				balance
				pending
				available
			}
		} 
	}
`

export const Mutation = gql`
	mutation ( $item: String!, $platform: String!, $receipt: String! ) {
		purchaseCredit ( item: $item, platform: $platform, receipt: $receipt ){
			title
			content
			status
		} 
	}
`