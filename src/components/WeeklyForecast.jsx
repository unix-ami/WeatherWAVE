import React from 'react';
import { Line } from 'react-chartjs-2';

const WeeklyForecast = ({ weeklyForecastData, convertTemperature, tempUnit }) => {
  if (!weeklyForecastData) return null;

  // Prepare data for the chart
  const labels = weeklyForecastData.list.slice(1, 15).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index + 1);
    return date.toLocaleDateString('en-UK', { weekday: 'short' });
  });

  const temperatures = weeklyForecastData.list.slice(1, 15).map(day => 
    Math.round(convertTemperature(day.main.temp - 273.15))
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Temp (°${tempUnit})`,
        data: temperatures,
        borderColor: 'rgb(39, 77, 116)',
        backgroundColor: 'rgb(75, 124, 155)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#282828', // Change the legend label color
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}°${tempUnit}`, // Format tooltip text
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#282828', // Change x-axis label text color
        },
      },
      y: {
        ticks: {
          color: '#282828', // Change y-axis label text color
        },
      },
    },
  };

  return (
    <div className="tempForecast">
      <h4>14-Day Temperature Forecast</h4>
      <div className="box">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyForecast;
