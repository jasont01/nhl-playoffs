import { useState, useEffect } from 'react'
import { Box, Select } from '@mantine/core'
import Chart from './Chart'

const Wildcard = ({ options, standings }) => {
  const [conference, setConference] = useState(null)
  const [data, setData] = useState([])
  const [max, setMax] = useState(140)

  useEffect(() => {
    if (!conference) return

    const divisions = standings.filter(
      (record) => record.conference.id === conference
    )

    const divisionLeaders = divisions.map((division) => {
      return {
        label: division.division.name,
        data: division.teamRecords.filter((team) => team.divisionRank <= 3),
      }
    })

    const wildCardTeams = divisions
      .map((division) =>
        division.teamRecords.filter(
          (team) => team.wildCardRank > 0 && !team.eliminated
        )
      )
      .flat()
      .sort((a, b) => a.wildCardRank - b.wildCardRank)

    const wildCardSeparator = {
      team: {
        id: 999,
        name: '----------------------------',
      },
      points: 0,
      gamesPlayed: 82,
    }

    wildCardTeams.splice(2, 0, wildCardSeparator)
    setData([...divisionLeaders, { label: 'Wild Card', data: wildCardTeams }])
  }, [conference, standings])

  return (
    <>
      <Box sx={{ width: '10em', margin: 'auto' }} my='2em'>
        <Select
          placeholder='Select conference'
          onChange={setConference}
          data={options}
        />
      </Box>
      {data &&
        data.map((chart, idx) => (
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
              teams={chart.data}
              legend={idx === 2}
              max={max}
              setMax={setMax}
            />
          </Box>
        ))}
    </>
  )
}
export default Wildcard
