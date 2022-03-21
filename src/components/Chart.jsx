import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { teamData } from '../teamData'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || ''

          if (label) {
            label += ': '
          }
          if (context.parsed.x !== null) {
            label +=
              context.datasetIndex === 1 // Add current points to possible points tooltip
                ? context.parsed.x + context.parsed._stacks.x[0]
                : context.parsed.x
          }

          return label
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
}

const plugins = [
  {
    id: 'logo',
    afterDatasetDraw: (chart) => {
      const { ctx } = chart
      ctx.save()
      const dataset = chart._metasets[0].data

      const logos = chart._metasets[0]._dataset.logos
      const logoHeight = (chart.chartArea.height / logos.length) * 0.5
      const logoWidth = logoHeight * 1.5

      logos.forEach((logo, idx) => {
        const img = new Image()
        img.src = logo
        ctx.drawImage(
          img,
          dataset[idx].x - logoWidth,
          dataset[idx].y - logoHeight / 2,
          logoWidth,
          logoHeight
        )
      })
    },
  },
]

const Chart = ({ title, teams, legend = true }) => {
  const data = {
    labels: teams.map((entry) => entry.team.name),
    datasets: [
      {
        label: 'Current Points',
        data: teams.map((team) => team.points),
        borderColor: '#000',
        backgroundColor: teams.map(
          (entry) =>
            `rgb(${
              teamData.find((team) => team.id === entry.team.id).colors.rgb[0]
            })`
        ),
        logos: teams.map(
          (entry) => teamData.find((t) => t.id === entry.team.id).logo
        ),
      },
      {
        label: 'Possible Points',
        data: teams.map((team) => (82 - team.gamesPlayed) * 2),
        borderColor: '#000',
        backgroundColor: teams.map(
          (entry) =>
            `rgba(${
              teamData.find((team) => team.id === entry.team.id).colors.rgb[0]
            }, 0.2)`
        ),
      },
    ],
  }

  return (
    <Bar
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
      plugins={plugins}
      data={data}
    />
  )
}
export default Chart
