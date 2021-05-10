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
  cutoff,
  row,
}) => {
  const start = points - offset;
  const span = (SEASON_GAMES - gamesPlayed) * PTS_PER_GAME || 1;
  const isFaded = points + span < cutoff;
  const gamesRemaining = SEASON_GAMES - gamesPlayed

  const tooltip = `${name}<br/>
  Games Remaining: ${gamesRemaining}<br/>
  Current Points: ${points}<br/>
  Possible Points: ${gamesRemaining ? span + points : points}`;

  return (
    <div
      className={`row ${team} ${isFaded ? 'faded' : undefined}`}
      data-tip={tooltip}
      data-for={id}
      style={{
        gridColumn: `${start} / span ${span}`,
        gridRow: `${row}`,
      }}
    >
      <Logo id={id} team={team} />
      <ReactTooltip id={`${id}`} html={true} />
    </div>
  );
};

export default Team;
