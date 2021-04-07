import ReactTooltip from 'react-tooltip';
import Logo from './Logo';

const SEASON_GAMES = 56;
const PTS_PER_GAME = 2;

const Team = ({
  team,
  data: {
    team: { id, name },
    points,
    gamesPlayed,
  },
  offset,
}) => {
  const start = points - offset;
  const span = (SEASON_GAMES - gamesPlayed) * PTS_PER_GAME;

  const tooltip = `${name}<br/>
  Game Played: ${gamesPlayed}<br/>
  Current Points: ${points}<br/>
  Possible Points: ${span + points}`;

  return (
    <div
      className={`row ${team}`}
      data-tip={tooltip}
      data-for={id}
      style={{
        gridColumn: `${start} / span ${span}`,
      }}
    >
      <Logo id={id} team={team} />
      <ReactTooltip id={`${id}`} html={true} />
    </div>
  );
};

export default Team;
