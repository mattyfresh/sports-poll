import React, { Component } from 'react'
import Match from './components/Match'
import { MatchMeta } from './typings/types'
import { getRandomMatch } from './helpers'
import styled from 'styled-components'
import Noty from 'noty'

const AppWrapper = styled.div`
  align-items: center;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const Header = styled.h1`
  color: white;
`

interface Tally {
  [x: number]: { [y: string]: number }
}

interface State {
  tally: Tally
}

class App extends Component<any, State> {
  private match: MatchMeta

  constructor(props: any) {
    super(props)
    this.match = getRandomMatch()
    const localStorageScores = localStorage.getItem('SCORES')
    this.state = {
      tally: localStorageScores
        ? (JSON.parse(localStorageScores) as Tally)
        : {},
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('SCORES', JSON.stringify(this.state.tally))
  }

  private triggerNotification(teamName: string) {
    const text =
      teamName === 'draw' ? 'You voted for a draw' : `You voted for ${teamName}`
    const notification = new Noty({
      theme: 'mint',
      text,
    })
    notification.show()
  }

  updateTally = (
    matchId: number,
    winningTeamName: string,
    outcome: 'home' | 'away' | 'draw'
  ) => {
    const currentMatch = this.state.tally[matchId]
    this.setState(
      {
        tally: {
          ...this.state.tally,
          [matchId]: {
            ...currentMatch,
            [outcome]:
            // if match already exists increment the correct tally, otherwise initialize tally to 1
              currentMatch && currentMatch[outcome]
                ? currentMatch[outcome] + 1
                : 1,
          },
        },
      },
      () => {
        this.updateLocalStorage()
        this.triggerNotification(winningTeamName)
      }
    )
  }

  render() {
    return (
      <AppWrapper>
        <Header>Today's Matchup</Header>
        <Match
          match={this.match}
          tally={this.state.tally}
          updateTally={this.updateTally}
        />
      </AppWrapper>
    )
  }
}

export default App
