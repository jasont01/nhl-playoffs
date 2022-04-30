import { useState, useEffect } from 'react'
import { Table, Paper, Box } from '@mantine/core'

const Stats = ({ standings }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const teamRecords = standings
      .map((conference) => conference.teamRecords)
      .flat()
      .sort((a, b) => a.leagueRank - b.leagueRank)

    const rows = teamRecords.map((entry) => (
      <tr key={entry.team.id}>
        <td>{entry.team.name}</td>
        <td>{entry.gamesPlayed}</td>
        <td>{`${entry.leagueRecord.wins}-${entry.leagueRecord.losses}-${entry.leagueRecord.ot}`}</td>
        <td>{entry.points}</td>
        <td>{entry.regulationWins}</td>
        <td>{entry.row}</td>
        <td>{entry.goalsScored}</td>
        <td>{entry.goalsAgainst}</td>
        <td>{entry.goalsScored - entry.goalsAgainst}</td>
        <td>SO W-L</td>
        <td>last 10</td>
        <td>{entry.streak.streakCode}</td>
      </tr>
    ))

    setData(rows)
  }, [standings])

  return (
    <Box p='1em'>
      <Paper>
        <Table>
          <thead>
            <tr>
              <th>Team</th>
              <th>GP</th>
              <th>W-L-OTL</th>
              <th>Pts</th>
              <th>RW</th>
              <th>ROW</th>
              <th>GF</th>
              <th>GA</th>
              <th>Diff</th>
              <th>SO W-L</th>
              <th>L10</th>
              <th>STRK</th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </Table>
      </Paper>
    </Box>
  )
}

export default Stats
