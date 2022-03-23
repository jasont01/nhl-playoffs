import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { teamData } from '../teamData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const totalDuration = 10000
const delayBetweenPoints = totalDuration / 82
const previousY = (ctx) =>
  ctx.index === 0
    ? ctx.chart.scales.y.getPixelForValue(100)
    : ctx.chart
        .getDatasetMeta(ctx.datasetIndex)
        .data[ctx.index - 1].getProps(['y'], true).y

const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0
      }
      ctx.xStarted = true
      return ctx.index * delayBetweenPoints
    },
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0
      }
      ctx.yStarted = true
      return ctx.index * delayBetweenPoints
    },
  },
}

const options = {
  responsive: true,
  animation,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Wins above league average P%',
    },
  },
}

const LineChart = ({ title, teams, legend = true }) => {
  const data = {
    labels: [...Array(82 + 1).keys()].slice(1),
    datasets: teams.map((team) => {
      return {
        label: team.name,
        data: team.data,
        borderColor: `rgb(${
          teamData.find((entry) => entry.id === team.id).colors.rgb[0]
        })`,
        backgroundColor: `rgb(${
          teamData.find((entry) => entry.id === team.id).colors.rgb[1]
        })`,
      }
    }),
  }

  return (
    <Line
      options={{
        ...options,
        plugins: {
          ...options.plugins,
          legend: legend ? options.plugins.legend : false,
          title: {
            display: true,
            text: title,
          },
        },
      }}
      data={data}
    />
  )
}
export default LineChart
