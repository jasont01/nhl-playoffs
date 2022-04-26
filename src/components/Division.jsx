import { useState, useEffect } from 'react'
import { Box, Select } from '@mantine/core'
import Chart from './Chart'
import { chartRange } from '../utils/chartRange'

const Division = ({ options, standings }) => {
  const [division, setDivision] = useState(null)
  const [data, setData] = useState([])
  const [range, setRange] = useState({ min: 0, max: 180 })

  useEffect(() => {
    const teamRecords = standings
      .filter((record) => record.division.id === division)
      .map((division) => division.teamRecords)
      .flat()
      .sort((a, b) => a.leagueRank - b.leagueRank)
    setData(teamRecords)
  }, [division, standings])

  useEffect(() => {
    if (!data.length) return

    setRange(chartRange(data))
  }, [data])

  return (
    <>
      <Box sx={{ width: '10em', margin: 'auto' }} my='2em'>
        <Select
          placeholder='Select division'
          onChange={setDivision}
          data={options}
        />
      </Box>
      {division && (
        <Box className='chart' mx='2em' sx={{ height: '69vh' }}>
          <Chart
            teams={data}
            range={range}
            title={`${
              options.find((option) => option.value === division).label
            } Division`}
          />
        </Box>
      )}
    </>
  )
}
export default Division
