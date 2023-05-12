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

type SmallChartProps = {
  prices: number[];
};

export const SmallChart = (props: SmallChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: '#60687c',
        },
      },
    },

    scales: {
      y: {
        display: false,
        ticks: {
          color: '#60687c',
        },
      },

      x: {
        display: false,
        ticks: {
          color: '#60687c',
        },
      },
    },
  };

  const data = {
    labels: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
    ],
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

  return <Line data={data} options={options} style={{ width: 700 }} />;
};
