const convertHexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : null
}

const convert = (teams) => {
  return teams.map((team) => {
    const { colors } = team
    const { hex } = colors
    const rgb = hex.map(convertHexToRgb)
    return { ...team, colors: { ...colors, rgb } }
  })
}

console.log(convert())
