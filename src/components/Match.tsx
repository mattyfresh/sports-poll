import React from 'react'
import { MatchMeta } from '../typings/types'
import styled from 'styled-components'
import { flagsMap, getSportIcon, matchStateMap } from '../helpers'

import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Typography,
} from '@material-ui/core'

const Wrapper = styled.div`
  padding: 40px;
`

const StyledCard = styled(Card)`
  position: relative;
  top: 20%;
`

const SubHeader = styled.div`
  align-items: stretch;
  display: flex;
  justify-content: space-between;
`

const FlagImage = styled.img`
  height: 20px;
`

const SportIcon = styled.img`
  height: 5vh;
`

const ButtonsWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`

const CurrentTallyList = styled.ul`
  color: #fff;
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 30px 0 0;
  padding: 0;
`

interface Props {
  match: MatchMeta
  tally: any
  updateTally: (matchId: number, outcome: 'home' | 'away' | 'draw') => void
}

const Match: React.SFC<Props> = ({ match, tally, updateTally }) => {
  const formattedName = match.name.replace('-', 'vs.')
  const sportIcon = getSportIcon(match.sport)
  const matchState = matchStateMap[match.state]
  const currentMatchTally = tally[match.id]
  return (
    <Wrapper>
      <StyledCard>
        <CardHeader
          avatar={<SportIcon src={sportIcon} />}
          title={formattedName}
          subheader={
            <SubHeader>
              <span>Match {matchState}</span>
              <FlagImage src={flagsMap[match.country]} />
            </SubHeader>
          }
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Predicted Winner:
          </Typography>
          <ButtonsWrapper>
            <Button
              onClick={() => updateTally(match.id, 'home')}
              color="primary"
            >
              {match.homeName}
            </Button>
            <Button
              onClick={() => updateTally(match.id, 'draw')}
              color="inherit"
            >
              draw
            </Button>
            <Button
              onClick={() => updateTally(match.id, 'away')}
              color="secondary"
            >
              {match.awayName}
            </Button>
          </ButtonsWrapper>
        </CardContent>
        <div />
      </StyledCard>
      {currentMatchTally && (
        <CurrentTallyList>
          <li>Home {currentMatchTally.home || 0}</li>
          <li>Draw {currentMatchTally.draw || 0}</li>
          <li>Away {currentMatchTally.away || 0}</li>
        </CurrentTallyList>
      )}
    </Wrapper>
  )
}

export default Match
