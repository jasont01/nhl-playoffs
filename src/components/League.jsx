import { useState, useEffect } from 'react'
import { Box } from '@mantine/core'
import Chart from './Chart'

const League = ({ standings }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const teamRecords = standings
      .map((conference) => conference.teamRecords)
      .flat()
      .sort((a, b) => a.leagueRank - b.leagueRank)
    setData(teamRecords)
  }, [standings])

  return (
    <Box className='chart' sx={{ marginTop: '6.3em!important' }} mx='2em'>
      <Chart title='Current League Standings' teams={data} />
    </Box>
  )
}

export default League
