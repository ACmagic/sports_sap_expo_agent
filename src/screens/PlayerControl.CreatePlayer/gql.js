import gql from 'graphql-tag';

export const Mutation = gql`
	mutation ( 
		$playerUsername: String!
		$playerPassword: String!
		$playerPasscode: String!
		$initial: String!
		$minRisk: String!
		$maxWin: String!
		$parlay: Boolean!
		$basicTeaser: Boolean!
		$specialTeaser: Boolean!
		$bigTeaser: Boolean!
		$superTeaser: Boolean!
		$winReverse: Boolean!
		$actionReverse: Boolean!
		$parlayTeam: Int!
		$basicTeaserTeam: Int!
		$specialTeaserTeam: Int!
		$bigTeaserTeam: Int!
		$winReverseTeam: Int!
		$actionReverseTeam: Int!
		$passcode: String!
	) {
		playerRegister ( 
			playerUsername: $playerUsername
			playerPassword: $playerPassword
			playerPasscode: $playerPasscode
			initial: $initial
			minRisk: $minRisk
			maxWin: $maxWin
			parlay: $parlay
			basicTeaser: $basicTeaser
			specialTeaser: $specialTeaser
			bigTeaser: $bigTeaser
			superTeaser: $superTeaser
			winReverse: $winReverse
			actionReverse: $actionReverse
			parlayTeam: $parlayTeam
			basicTeaserTeam: $basicTeaserTeam
			specialTeaserTeam: $specialTeaserTeam
			bigTeaserTeam: $bigTeaserTeam
			winReverseTeam: $winReverseTeam
			actionReverseTeam: $actionReverseTeam
			passcode: $passcode
		){
			title
			content
			status
		} 
	}
`