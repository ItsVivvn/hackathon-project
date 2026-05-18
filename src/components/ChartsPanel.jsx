import { Bar, Doughnut } from 'react-chartjs-2';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartsPanel({ statusRows, typeRows }) {
  const statusData = {
    labels: statusRows.map((row) => row.status),
    datasets: [
      {
        label: 'Complaints',
        data: statusRows.map((row) => row.count),
        backgroundColor: ['#2f8f57', '#f0a43a', '#a6b5b0'],
        borderRadius: 12,
      },
    ],
  };

  const typeData = {
    labels: typeRows.map((row) => row.type),
    datasets: [
      {
        data: typeRows.map((row) => row.count),
        backgroundColor: ['#1f7343', '#2f8f57', '#69b384', '#aacbb9', '#d9e6de'],
      },
    ],
  };

  return (
    <div className="charts-grid">
      <section className="chart-card">
        <h3>Complaints by status</h3>
        <div className="chart-wrap">
          <Bar data={statusData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
        </div>
      </section>
      <section className="chart-card">
        <h3>Complaints by type</h3>
        <div className="chart-wrap">
          <Doughnut data={typeData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </section>
    </div>
  );
}
