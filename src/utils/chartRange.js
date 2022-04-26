export const chartRange = (data) => {
  const minPts = Math.min(...data.map((team) => team.points))

  const maxPts = Math.max(...data.map((team) => team.possiblePts))

  const min = Math.max(Math.floor(minPts / 10) * 10 - 20, 0)
  const max = Math.ceil(maxPts / 10) * 10

  return { min, max }
}
