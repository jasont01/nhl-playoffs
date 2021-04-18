import { useState, useEffect } from 'react';
import Team from './Team';
import GridLabel from './GridLabel';

const SEASON_GAMES = 56;
const PTS_PER_GAME = 2;

const Grid = ({ teams }) => {
  const [teamData, setTeamData] = useState([]);
  const [range, setRange] = useState({});

  useEffect(() => {
    const fetchTeamData = async () => {
      const res = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/`);
      const data = await res.json();
      setTeamData(data.teams);
    };
    fetchTeamData();
  }, []);

  useEffect(() => {
    if (!teams.length) return;
    let lowest = SEASON_GAMES * PTS_PER_GAME;
    let higest = 0;
    teams.forEach((team) => {
      if (team.points < lowest) lowest = team.points;
      const max =
        (SEASON_GAMES - team.gamesPlayed) * PTS_PER_GAME + team.points;
      if (max > higest) higest = max;
    });
    setRange({ start: lowest - 5, end: higest });
  }, [teams]);

  const getTeamData = (teamId) =>
    teamData.filter((team) => team.id === teamId).pop();

  return (
    <div className='grid-container'>
      {teams.map((team) => {
        const teamId = team.team.id;
        const abbr = getTeamData(teamId).abbreviation.toLowerCase();
        return (
          <Team
            key={teamId}
            team={abbr}
            data={team}
            offset={range.start}
            cutoff={teams[3].points}
          />
        );
      })}

      {range.end ? <GridLabel range={range} /> : null}
    </div>
  );
};

export default Grid;
