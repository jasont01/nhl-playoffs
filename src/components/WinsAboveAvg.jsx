import { useState, useEffect } from 'react'
import { Box, Select } from '@mantine/core'
import LineChart from './LineChart'

const WinsAboveAvg = ({ options, dates, teams }) => {
  const [division, setDivision] = useState(null)
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const parsed = JSON.parse(JSON.stringify(teams))
    console.log({ teams, dates })
    dates.forEach((date) =>
      date.games.forEach((game) => {
        if (game.status.statusCode !== '7') return

        Object.keys(game.teams).forEach((i) => {
          const pts =
            game.teams[i].leagueRecord.wins * 2 + game.teams[i].leagueRecord.ot

          const team = parsed.find((team) => team.id === game.teams[i].team.id)

          team.data = team.data
            ? [...team.data, pts - team.data.length * 1.1]
            : [pts - 1.1]
        })
      })
    )
    setData(parsed)
  }, [teams, dates])

  useEffect(() => {
    if (!division) return
    const selectedTeams = data.filter((entry) => entry.division.id === division)
    setSelected(selectedTeams)
  }, [division, data])

  return (
    <>
      <Box sx={{ width: '10em', margin: 'auto' }} my='2em'>
        <Select
          placeholder='Select division'
          onChange={setDivision}
          data={options}
        />
      </Box>
      {selected && (
        <Box className='chart' mx='2em'>
          <LineChart
            teams={selected}
            title={`${
              options.find((option) => option.value === division).label
            } Division`}
          />
        </Box>
      )}
    </>
  )
}

export default WinsAboveAvg
