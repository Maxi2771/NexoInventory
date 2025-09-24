import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieChart = () => {
  const data = {
    labels: ['Ene', 'Feb', 'Mar','Abr', 'May', 'Jun','Jul', 'Ago', 'Sep','Oct', 'Nov', 'Dic'], 
    datasets: [
      {
        data: [100,100,100,100,100,100,100,100,100,100,100,100 ],
        backgroundColor: [
            '#FF6384', 
            '#FF5733', 
            '#33FF57', 
            '#3357FF',
            '#FF33A8',
            '#33FFF6',
            '#8D33FF',
            '#FFC733',
            '#FF8333',
            '#33FFBD',
            '#FF3380',
            '#335FFF',
            '#33FF83',
        ], 
        hoverBackgroundColor: [
            '#FF6384',
            '#FF5733',
            '#33FF57',
            '#3357FF',
            '#FF33A8',
            '#33FFF6',
            '#8D33FF',
            '#FFC733',
            '#FF8333',
            '#33FFBD',
            '#FF3380',
            '#335FFF',
            '#33FF83', 
        ],
      },
    ],
  };
  const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.raw}`;
        },
      },
    },
  },
};


  return (
    <div className='rounded-lg border bg-gray-800 border-gray-700 flex flex-col justify-center items-center h-30 w-62 p-4'>
        <p>Monto de venta mensual</p>
        <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
