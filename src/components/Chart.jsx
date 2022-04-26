import { useMemo } from 'react'
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
      borderWidth: 2,
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
        afterTitle: (context) => {
          if (context[0].datasetIndex === 0) {
            return context[0].dataset.eliminated[context[0].dataIndex]
              ? '*Eliminated from Playoff Contention*'
              : null
          }
        },
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

const Chart = ({ title, teams, legend = true, range }) => {
  const teamColors = useMemo(
    () =>
      teams.map((entry) =>
        entry.eliminated
          ? teamData
              .find((t) => t.id === entry.team.id)
              .colors.map((c) => `${c.h}, 15%, ${c.l}%`)
          : teamData
              .find((t) => t.id === entry.team.id)
              .colors.map((c) => `${c.h}, ${c.s}%, ${c.l}%`)
      ),
    [teams]
  )

  const data = {
    labels: teams.map((entry) =>
      entry.clinchIndicator
        ? `${entry.clinchIndicator} - ${entry.team.shortName}`
        : entry.team.shortName
    ),
    datasets: [
      {
        label: 'Current Points',
        data: teams.map((team) => team.points),
        borderColor: teamColors.map((color) => `hsl(${color[1]})`),
        backgroundColor: teamColors.map((color) => `hsl(${color[0]})`),
        logos: teams.map((entry) => {
          const dataEntry = teamData.find((t) => t.id === entry.team.id)
          return entry.eliminated ? dataEntry.logoFaded : dataEntry.logo
        }),
        eliminated: teams.map((entry) => entry.eliminated),
      },
      {
        label: 'Possible Points',
        data: teams.map((team) => (82 - team.gamesPlayed) * 2),
        borderColor: teamColors.map((color) => `hsla(${color[1]}, 0.2)`),
        backgroundColor: teamColors.map((color) => `hsla(${color[0]}, 0.2)`),
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
        scales: {
          ...options.scales,
          x: {
            ...options.scales.x,
            min: range.min,
            max: range.max,
          },
        },
      }}
      plugins={plugins}
      data={data}
    />
  )
}
export default Chart
