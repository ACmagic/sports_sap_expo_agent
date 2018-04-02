import gql from 'graphql-tag';

export const PlayerQuery = gql`
	query ( $action: String, $tablePicks: [TablePickType]! ) {
		actionEvents ( action: $action, tablePicks: $tablePicks ){
		    _id
		    ID
		    sport
		    period
		    league
		    region
		    matchTime
		    cutOffAt
		    isFinished
		    title
		    isActionOddActivate
		    teamLogo {
		    	away
		    	home
		    	default
		    }
		    team {
		    	home
		    	homeROT
		    	homePitcher
		    	away
		    	awayROT
		    	awayPitcher
		    }
		    actionOdd {
		    	awayMoneyLine
		    	homeMoneyLine
		    	awaySpreadPoint
		    	awaySpreadLine
		    	homeSpreadPoint
		    	homeSpreadLine
		    	totalOverPoint
		    	totalOverLine
		    	totalUnderPoint
		    	totalUnderLine
		    	drawLine
		    }
		}
		player {
			wagerLimit {
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

export const AgentQuery = gql`
	query ( $action: String, $tablePicks: [TablePickType]! ) {
		actionEvents ( action: $action, tablePicks: $tablePicks ){
		    _id
		    ID
		    sport
		    period
		    league
		    region
		    matchTime
		    cutOffAt
		    isFinished
		    title
		    isActionOddActivate
		    teamLogo {
		    	away
		    	home
		    	default
		    }
		    team {
		    	home
		    	homeROT
		    	homePitcher
		    	away
		    	awayROT
		    	awayPitcher
		    }
		    actionOdd {
		    	awayMoneyLine
		    	homeMoneyLine
		    	awaySpreadPoint
		    	awaySpreadLine
		    	homeSpreadPoint
		    	homeSpreadLine
		    	totalOverPoint
		    	totalOverLine
		    	totalUnderPoint
		    	totalUnderLine
		    	drawLine
		    }
		}
	}
`