import { useEffect, useState } from 'react';
import Select from 'react-select';
import Grid from './components/Grid';

const API_BASE_URL = 'https://statsapi.web.nhl.com/api/v1';

// https://statsapi.web.nhl.com/api/v1/divisions
// https://statsapi.web.nhl.com/api/v1/teams/
// https://statsapi.web.nhl.com/api/v1/standings/byDivision

const App = () => {
  const [options, setOptions] = useState([]);
  const [divisionId, setDivisionId] = useState(0);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchDivisionData = async () => {
      const res = await fetch(`${API_BASE_URL}/divisions`);
      const data = await res.json();

      const divisions = data.divisions.map((division) => {
        const name = division.name.split(' ').pop();
        return { value: division.id, label: name };
      });
      setOptions([...divisions, { value: 99, label: 'All' }]);
    };
    fetchDivisionData();
  }, []);

  useEffect(() => {
    const fetchStandings = async () => {
      const res = await fetch(`${API_BASE_URL}/standings/byDivision`);
      const data = await res.json();
      const standings =
        divisionId === 99
          ? data.records.map((record) => record)
          : data.records.filter((record) => record.division.id === divisionId);
      setTeams(
        standings
          .map((division) => division.teamRecords)
          .flat()
          .sort((a, b) => a.leagueRank - b.leagueRank)
      );
    };
    divisionId && fetchStandings();
  }, [divisionId]);

  const onChange = (e) => {
    setDivisionId(e.value);
  };

  return (
    <div className='App'>
      <h1>Race to the Playoffs</h1>
      <div className='division'>
        <h4>Division</h4>
        <Select
          className='division-select'
          classNamePrefix='select'
          name='division'
          options={options}
          onChange={onChange}
        />
      </div>
      <Grid teams={teams} />
    </div>
  );
};

export default App;
