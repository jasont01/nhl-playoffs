import { useState, useEffect } from 'react'
import { Box, Select } from '@mantine/core'
import Chart from './Chart'
import { chartRange } from '../utils/chartRange'

const Conference = ({ options, standings }) => {
  const [conference, setConference] = useState(null)
  const [data, setData] = useState([])
  const [range, setRange] = useState({ min: 0, max: 180 })

  useEffect(() => {
    const teamRecords = standings
      .filter((record) => record.conference.id === conference)
      .map((conference) => conference.teamRecords)
      .flat()
      .sort((a, b) => a.leagueRank - b.leagueRank)
    setData(teamRecords)
  }, [conference, standings])

  useEffect(() => {
    if (!data.length) return
    console.log(data)
    setRange(chartRange(data))
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
      {conference && (
        <Box className='chart' mx='2em' sx={{ height: '69vh' }}>
          <Chart
            teams={data}
            range={range}
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
