import { useState, useEffect } from 'react'
import { Box, Select, Switch } from '@mantine/core'
import Chart from './Chart'

const Wildcard = ({ options, standings }) => {
  const [conference, setConference] = useState(null)
  const [data, setData] = useState([])
  const [max, setMax] = useState(140)
  const [showEliminated, setShowEliminated] = useState(false)
  const [eliminatedSwitchVisiable, setEliminatedSwitchVisiable] =
    useState(false)

  useEffect(() => {
    if (!conference) return

    const divisions = standings.filter(
      (record) => record.conference.id === conference
    )

    const divisionLeaders = divisions.map((division) => {
      return {
        label: division.division.name,
        teams: division.teamRecords.filter((team) => team.divisionRank <= 3),
      }
    })

    const wildCardTeams = divisions
      .map((division) =>
        division.teamRecords.filter((team) => team.wildCardRank > 0)
      )
      .flat()
      .sort((a, b) => a.wildCardRank - b.wildCardRank)

    if (wildCardTeams.some((team) => team.eliminated)) {
      setEliminatedSwitchVisiable(true)
    }

    const wildCardFiltered = wildCardTeams.filter((team) => {
      return !team.eliminated || showEliminated
    })

    const wildCardSeparator = {
      team: {
        id: 999,
        name: '----------------------------',
      },
      points: 0,
      gamesPlayed: 82,
    }

    if (wildCardFiltered.length > 2) {
      wildCardFiltered.splice(2, 0, wildCardSeparator)
    }

    setData([
      ...divisionLeaders,
      { label: 'Wild Card', teams: wildCardFiltered },
    ])

    return () => {
      setEliminatedSwitchVisiable(false)
    }
  }, [conference, standings, showEliminated])

  return (
    <>
      <Box sx={{ width: '10em', margin: 'auto' }} my='2em'>
        <Select
          placeholder='Select conference'
          onChange={setConference}
          data={options}
        />
      </Box>
      {data.map((chart, idx) => (
        <Box
          key={idx}
          className='chart'
          my='0'
          mx='2em'
          mb={idx === 2 ? '2em' : '0'}
          sx={{ height: idx === 2 ? '36vh!important' : '16vh!important' }}
        >
          <Chart
            title={chart.label}
            teams={chart.teams}
            legend={idx === 2}
            max={max}
            setMax={setMax}
          />
        </Box>
      ))}
      {eliminatedSwitchVisiable && (
        <Box mx='2em'>
          <Switch
            label='eliminated teams'
            checked={showEliminated}
            onChange={(e) => setShowEliminated(e.currentTarget.checked)}
          />
        </Box>
      )}
    </>
  )
}
export default Wildcard
