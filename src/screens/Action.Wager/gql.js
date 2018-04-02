import gql from 'graphql-tag';

export default gql`
	query ( $action: String!, $eventOddPicks: [EventOddPicksType]! ) {
		wagerPicks ( action: $action, eventOddPicks: $eventOddPicks ) {
			ID
			Event {
			    _id
			    ID
			    sport
			    period
			    league
			    region
			    matchTime
			    cutOffAt
			    isActionOddActivate
			    isOddExpired
			    title
			    teamLogo {
			    	away
			    	home
			    }
			    team {
			    	home
			    	homeROT
			    	homePitcher
			    	away
			    	awayROT
			    	awayPitcher
			    }
			}
			marked {
				oddLine
				oddPoint
				oddTarget
				oddType
				oddLineTarget
				oddPointTarget
			}
		}
	}
`