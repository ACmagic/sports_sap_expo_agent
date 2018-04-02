import gql from 'graphql-tag';

export const Query = gql`
	query ( $Player: String ) {
		agentPlayer ( Player: $Player ) {
			isActivate
			username
			lastOnlineAt
			createdAt
			wagerLimit {
				initialCredit
				straight
				parlay
				basicTeaser
				specialTeaser
				bigTeaser
				superTeaser
				actionReverse
				winReverse
				maxWin
				minRisk
				straightTeam
				parlayTeam
				basicTeaserTeam
				specialTeaserTeam
				bigTeaserTeam
				superTeaserTeam
				actionReverseTeam
				winReverseTeam
			}
		} 
	}
`

export const switchActivate = gql`
	mutation ( $Player: String!, $isActivate: Boolean! ){
		switchPlayerActivate (
			Player: $Player
			isActivate: $isActivate
		){
			title
			content
			status
		}
	}		
`

export const Mutation = gql`
	mutation ( 
		$Player: String!
		$newPassword: String 
		$newPasscode: String 
		$newInitial: String
		$newMaxWin: String
		$newMinRisk: String
		$isSetNewWagerLimit: Boolean
		$newParlay: Boolean
		$newParlayTeam: Int
		$newBasicTeaser: Boolean
		$newBasicTeaserTeam: Int
		$newSpecialTeaser: Boolean
		$newSpecialTeaserTeam: Int
		$newBigTeaser: Boolean
		$newBigTeaserTeam: Int
		$newSuperTeaser: Boolean
		$newWinReverse: Boolean
		$newWinReverseTeam: Int
		$newActionReverse: Boolean
		$newActionReverseTeam: Int
		$passcode: String!
	) {
		playerMutation ( 
			Player: $Player
			newPassword: $newPassword 
			newPasscode: $newPasscode 
			newInitial: $newInitial
			newMaxWin: $newMaxWin
			newMinRisk: $newMinRisk
			isSetNewWagerLimit: $isSetNewWagerLimit
			newParlay: $newParlay
			newParlayTeam: $newParlayTeam
			newBasicTeaser: $newBasicTeaser
			newBasicTeaserTeam: $newBasicTeaserTeam
			newSpecialTeaser: $newSpecialTeaser
			newSpecialTeaserTeam: $newSpecialTeaserTeam
			newBigTeaser: $newBigTeaser
			newBigTeaserTeam: $newBigTeaserTeam
			newSuperTeaser: $newSuperTeaser
			newWinReverse: $newWinReverse
			newWinReverseTeam: $newWinReverseTeam
			newActionReverse: $newActionReverse
			newActionReverseTeam: $newActionReverseTeam
			passcode: $passcode
		){
			title
			content
			status
		} 
	}
`




