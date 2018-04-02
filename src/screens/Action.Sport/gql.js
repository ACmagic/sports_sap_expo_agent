import gql from 'graphql-tag';

export const Query = gql`
	query ( $action: String ) {
		table ( action: $action ){
			_id
			name
			sports {
				_id
				name
				leagues {
					_id
					name
					region
					periods {
						_id
						name
					}
				}
			}
		} 
	}
`