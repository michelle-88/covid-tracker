import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';
import { Line } from 'react-chartjs-2';

export default function Chart({ casesOverTime }) {
  const theme = useTheme();
  const matches = useMediaQuery('(max-width:600px)');
  const dates = Object.keys(casesOverTime)
    .splice(0, matches ? 14 : 30)
    .reverse();
  const caseNumbers = Object.values(casesOverTime)
    .splice(0, matches ? 14 : 30)
    .reverse();
  const dateLabels = dates.map(date => moment(date).format('MMM DD'));

  const data = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Confirmed Cases',
        data: caseNumbers,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: matches ? false : true,
    scales: {
      x: {
        grid: {
          color: theme.palette.text.secondary,
          lineWidth: 0.5
        },
        ticks: {
          display: true,
          color: theme.palette.text.secondary
        }
      },
      y: {
        grid: {
          color: theme.palette.text.secondary,
          lineWidth: 0.5
        },
        ticks: {
          color: theme.palette.text.secondary
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      title: {
        display: true,
        color: theme.palette.text.primary,
        padding: 20,
        text: `Confirmed Cases (last ${matches ? 14 : 30} days)`,
        font: {
          size: matches ? 20 : 28,
          weight: 'normal',
          family: "'Poppins', 'Ubuntu', 'sans-serif'"
        }
      },
      legend: {
        display: false
      }
    }
  };

  return <Line data={data} options={options} />;
}
