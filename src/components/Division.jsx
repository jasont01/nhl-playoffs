import { useState, useEffect } from 'react'
import { Box, Select } from '@mantine/core'
import Chart from './Chart'

const Division = ({ options, standings }) => {
  const [division, setDivision] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const teamRecords = standings
      .filter((record) => record.division.id === division)
      .map((division) => division.teamRecords)
      .flat()
      .sort((a, b) => a.leagueRank - b.leagueRank)
    setData(teamRecords)
  }, [division, standings])

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
        <Box className='chart' mx='2em'>
          <Chart
            teams={data}
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
