import { useState, useEffect } from 'react'
import { Box } from '@mantine/core'
import Chart from './Chart'
import { chartRange } from '../utils/chartRange'

const League = ({ standings }) => {
  const [data, setData] = useState([])
  const [range, setRange] = useState({ min: 0, max: 180 })

  useEffect(() => {
    const teamRecords = standings
      .map((conference) => conference.teamRecords)
      .flat()
      .sort((a, b) => a.leagueRank - b.leagueRank)
    setData(teamRecords)
  }, [standings])

  useEffect(() => {
    if (!data.length) return

    setRange(chartRange(data))
  }, [data])

  return (
    <Box
      className='chart'
      mt='6.3em!important'
      mx='2em'
      sx={{ height: '160vh' }}
    >
      <Chart title='Current League Standings' teams={data} range={range} />
    </Box>
  )
}

export default League
