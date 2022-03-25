import { useState, useEffect } from 'react'
import { Box } from '@mantine/core'
import NHLPlayoffs from '../logos/NHLPlayoffs/NHLPlayoffs'
import '../playoffs.css'

const Playoffs = ({ standings }) => {
  const [divisionWinners, setDivisionWinners] = useState([])
  const [wildCards, setWildCards] = useState([])

  useEffect(() => {
    const east = standings.filter(
      (division) => division.conference.name === 'Eastern'
    )

    const west = standings.filter(
      (division) => division.conference.name === 'Western'
    )

    const eastDivisionalWinners = east
      .map((division) =>
        division.teamRecords.filter((team) => team.wildCardRank === '0')
      )
      .sort((a, b) => a[0].conferenceRank - b[0].conferenceRank)

    const westDivisionalWinners = west
      .map((division) =>
        division.teamRecords.filter((team) => team.wildCardRank === '0')
      )
      .sort((a, b) => a[0].conferenceRank - b[0].conferenceRank)

    const eastWildCards = east
      .map((division) =>
        division.teamRecords.filter(
          (team) => team.wildCardRank > 0 && team.wildCardRank < 3
        )
      )
      .flat()
      .sort((a, b) => a.wildCardRank - b.wildCardRank)

    const westWildCards = west
      .map((division) =>
        division.teamRecords.filter(
          (team) => team.wildCardRank > 0 && team.wildCardRank < 3
        )
      )
      .flat()
      .sort((a, b) => a.wildCardRank - b.wildCardRank)

    setDivisionWinners({
      east: eastDivisionalWinners,
      west: westDivisionalWinners,
    })
    setWildCards({ east: eastWildCards, west: westWildCards })
  }, [standings])

  if (divisionWinners.length === 0) return null

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          top: '6em',
        }}
      >
        <NHLPlayoffs height={'12em'} />
      </Box>
      <Box className='playoffs' sx={{ position: 'relative', top: '-12em' }}>
        {/* Western 1st Round */}
        <ul>
          {divisionWinners.west.map((division, idx) => {
            const list = division.map((team) => (
              <li
                key={team.team.abbreviation}
                className={team.team.abbreviation.toLowerCase()}
              >
                {team.team.locationName}
              </li>
            ))
            const wildCard = wildCards.west[1 - idx].team
            list.splice(
              1,
              0,
              <li
                key={wildCard.abbreviation}
                className={wildCard.abbreviation.toLowerCase()}
              >
                {wildCard.locationName}
              </li>
            )
            return list
          })}
        </ul>

        {/* Western 2nd Round */}
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        {/* Western Conference Final */}
        <ul>
          <li></li>
          <li></li>
        </ul>
        {/* Stanley Cup Final */}
        <ul>
          <li></li>
          <li></li>
        </ul>
        {/* Eastern Conference Final */}
        <ul>
          <li></li>
          <li></li>
        </ul>
        {/* Eastern 2nd Round */}
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <ul>
          {/* Eastern 1st Round */}
          {divisionWinners.east.map((division, idx) => {
            const list = division.map((team) => (
              <li
                key={team.team.abbreviation}
                className={team.team.abbreviation.toLowerCase()}
              >
                {team.team.locationName}
              </li>
            ))
            const wildCard = wildCards.east[1 - idx].team
            list.splice(
              1,
              0,
              <li
                key={wildCard.abbreviation}
                className={wildCard.abbreviation.toLowerCase()}
              >
                {wildCard.locationName}
              </li>
            )
            return list
          })}
        </ul>
      </Box>
    </Box>
  )
}
export default Playoffs
