import { useState, useEffect } from 'react'
import { Box, Select } from '@mantine/core'
import Chart from './Chart'

const Conference = ({ options, standings }) => {
  const [conference, setConference] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const teamRecords = standings
      .filter((record) => record.conference.id === conference)
      .map((conference) => conference.teamRecords)
      .flat()
      .sort((a, b) => a.leagueRank - b.leagueRank)
    setData(teamRecords)
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
      {conference && (
        <Box className='chart' mx='2em'>
          <Chart
            teams={data}
            title={`${
              options.find((option) => option.value === conference).label
            } Conference`}
          />
        </Box>
      )}
    </>
  )
}

export default Conference
