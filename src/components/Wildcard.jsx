import { useState, useEffect } from 'react'
import { Box, Select, Switch } from '@mantine/core'
import Chart from './Chart'
import { chartRange } from '../utils/chartRange'

const Wildcard = ({ options, standings }) => {
  const [conference, setConference] = useState(null)
  const [data, setData] = useState([])
  const [range, setRange] = useState({ min: 0, max: 180 })
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
        division.teamRecords.filter(
          (team) => team.wildCardRank === '1' || team.wildCardRank === '2'
        )
      )
      .flat()
      .sort((a, b) => a.wildCardRank - b.wildCardRank)

    const noPlayoffTeams = divisions
      .map((division) =>
        division.teamRecords.filter((team) => team.wildCardRank > 2)
      )
      .flat()
      .sort((a, b) => a.wildCardRank - b.wildCardRank)

    if (noPlayoffTeams.some((team) => team.eliminated)) {
      setEliminatedSwitchVisiable(true)
    }

    const noPlayoffsFiltered = noPlayoffTeams.filter((team) => {
      return !team.eliminated || showEliminated
    })

    if (noPlayoffsFiltered.length > 0) {
      setData([
        ...divisionLeaders,
        { label: 'Wild Card', teams: wildCardTeams },
        { label: 'No Playoffs', teams: noPlayoffsFiltered },
      ])
    } else {
      setData([
        ...divisionLeaders,
        { label: 'Wild Card', teams: wildCardTeams },
      ])
    }

    return () => {
      setEliminatedSwitchVisiable(false)
    }
  }, [conference, standings, showEliminated])

  useEffect(() => {
    if (!data.length) return

    setRange(chartRange(data.flatMap((entry) => entry.teams)))
  }, [data])

  return (
    <>
      <Box sx={{ width: '10em', margin: 'auto' }} my='2em'>
        <Select
          placeholder='Select conference'
          onChange={setConference}
          data={options}
        />
      </Box>
      <Box mb='1em' mx='1em'>
        {data.map((chart, idx) => (
          <Box
            key={idx}
            className='chart'
            my='0'
            sx={
              idx === data.length - 1
                ? {
                    height: `${
                      chart.teams.length * 7 +
                      (3 - chart.teams.length) * 2 +
                      3.5
                    }vh`,
                  }
                : {
                    height: `${
                      chart.teams.length * 7 + (3 - chart.teams.length) * 2
                    }vh`,
                  }
            }
          >
            <Chart
              title={chart.label}
              teams={chart.teams}
              legend={idx === data.length - 1}
              //legend={false}
              range={range}
            />
          </Box>
        ))}
      </Box>
      {eliminatedSwitchVisiable && (
        <Box mx='2em' mb='1em'>
          <Switch
            label='show eliminated teams'
            checked={showEliminated}
            onChange={(e) => setShowEliminated(e.currentTarget.checked)}
          />
        </Box>
      )}
    </>
  )
}
export default Wildcard
