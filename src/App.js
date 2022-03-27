import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Title, Tabs } from '@mantine/core'
import Division from './components/Division'
import Wildcard from './components/Wildcard'
import Conference from './components/Conference'
import League from './components/League'
import WinsAboveAvg from './components/WinsAboveAvg'
import Playoffs from './components/Playoffs'
import NHL from './logos/NHL'

const API_URL = 'https://statsapi.web.nhl.com/api/v1'
const SEASON = '20212022'

/**
 * https://statsapi.web.nhl.com/api/v1/divisions
 * https://statsapi.web.nhl.com/api/v1/standings/byDivision
 * https://statsapi.web.nhl.com/api/v1/teams/
 */

const backgroundStyles = {
  position: 'absolute',
  top: '3em',
  left: 0,
  width: '100%',
  padding: '15rem 0 0 0',
  zIndex: -1,
  display: 'flex',
  justifyContent: 'center',
}

const App = () => {
  const [divisions, setDivsions] = useState([])
  const [conferences, setConferences] = useState([])
  const [standings, setStandings] = useState([])
  const [wildCard, setWildCard] = useState([])
  const [teams, setTeams] = useState([])
  const [games, setGames] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/divisions`).then((res) => {
      const divisions = res.data.divisions.map((division) => ({
        value: division.id,
        label: division.name,
      }))
      setDivsions(divisions)
    })

    axios.get(`${API_URL}/conferences`).then((res) => {
      const conferences = res.data.conferences.map((conference) => ({
        value: conference.id,
        label: conference.name,
      }))
      setConferences(conferences)
    })

    axios('https://statsapi.web.nhl.com/api/v1/teams').then((res) => {
      setTeams(res.data.teams)
    })

    axios(`${API_URL}/schedule?season=${SEASON}&gameType=R`).then((res) => {
      setGames(res.data.dates)
    })

    axios(`${API_URL}/standings/wildCard`).then((res) => {
      setWildCard(res.data.records)
    })
  }, [])

  useEffect(() => {
    if (teams.length === 0 || wildCard.length === 0) return
    const isEliminated = (team, division) => {
      const possiblePts = team.points + (82 - team.gamesPlayed) * 2
      const wc2 = wildCard.find(
        (d) => d.conference.id === division.conference.id
      ).teamRecords[1]

      return (
        possiblePts < division.teamRecords[2].points && possiblePts < wc2.points
      )
    }

    axios.get(`${API_URL}/standings/byDivision`).then((res) => {
      const data = res.data.records.map((division) => ({
        ...division,
        teamRecords: division.teamRecords.map((record) => ({
          ...record,
          team: teams.find((t) => t.id === record.team.id), // merge additional team data
          eliminated: isEliminated(record, division),
        })),
      }))
      setStandings(data)
    })
  }, [teams, wildCard])

  return (
    <>
      <Box sx={backgroundStyles}>
        <NHL />
      </Box>
      <Box sx={{ height: '8vh' }}>
        <Title order={1}>NHL Standings</Title>
      </Box>
      <Tabs>
        <Tabs.Tab label='Division'>
          <Division options={divisions} standings={standings} />
        </Tabs.Tab>
        <Tabs.Tab label='Wildcard'>
          <Wildcard options={conferences} standings={standings} />
        </Tabs.Tab>
        <Tabs.Tab label='Conference'>
          <Conference options={conferences} standings={standings} />
        </Tabs.Tab>
        <Tabs.Tab label='League'>
          <League standings={standings} />
        </Tabs.Tab>
        <Tabs.Tab label='Wins above avg'>
          <WinsAboveAvg
            options={divisions}
            dates={games}
            teams={teams}
            standings={standings}
          />
        </Tabs.Tab>
        <Tabs.Tab label='Playoff Picture'>
          <Playoffs standings={standings} />
        </Tabs.Tab>
      </Tabs>
    </>
  )
}

export default App
