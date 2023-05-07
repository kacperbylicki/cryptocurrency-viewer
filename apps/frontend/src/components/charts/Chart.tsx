import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type ChartProps = {
  prices: string[];
  timestamps: string[];
};

export const Chart = (props: ChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#60687c',
        },
      },

      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },

    scales: {
      y: {
        ticks: {
          color: '#60687c',
        },
      },

      x: {
        ticks: {
          color: '#60687c',
        },
      },
    },
  };

  const data = {
    labels: props.timestamps,
    color: '#fff',
    datasets: [
      {
        label: 'USD',
        data: props.prices,
        fill: false,
        backgroundColor: '#FA47CE',
        borderColor: '#FA47CE',
      },
    ],
  };

  return (
    <Line
      data={data}
      options={options}
      style={{ width: '100%', maxHeight: '85%' }}
    />
  );
};
