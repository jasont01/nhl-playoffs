import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Title, Tabs } from '@mantine/core'
import Playoffs from './logos/Playoffs/Playoffs'
import Division from './components/Division'
import Wildcard from './components/Wildcard'
import Conference from './components/Conference'
import League from './components/League'
import WinsAboveAvg from './components/WinsAboveAvg'

const API_URL = 'https://statsapi.web.nhl.com/api/v1'
const SEASON = '20212022'

/**
 * https://statsapi.web.nhl.com/api/v1/divisions
 * https://statsapi.web.nhl.com/api/v1/standings/byDivision
 * https://statsapi.web.nhl.com/api/v1/teams/
 */

const backgroundStyles = {
  position: 'absolute',
  top: 0,
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

    axios.get(`${API_URL}/standings/byDivision`).then((res) => {
      setStandings(res.data.records)
    })

    axios('https://statsapi.web.nhl.com/api/v1/teams').then((res) => {
      setTeams(res.data.teams)
    })

    axios(`${API_URL}/schedule?season=${SEASON}&gameType=R`).then((res) => {
      setGames(res.data.dates)
    })
  }, [])

  return (
    <>
      <Box sx={backgroundStyles}>
        <Playoffs />
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
      </Tabs>
    </>
  )
}

export default App
