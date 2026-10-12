import React from 'react';
import { Line } from 'react-chartjs-2';

const WeeklyForecast = ({ weeklyForecastData, convertTemperature, tempUnit }) => {
  if (!weeklyForecastData?.list) return null;

  // Prepare data for the chart
  const dailyTemperatures = new Map();
  weeklyForecastData.list.forEach((forecast) => {
    const localDate = new Date(
      (forecast.dt + weeklyForecastData.city.timezone) * 1000
    ).toISOString().slice(0, 10);
    const dailyTemperature = dailyTemperatures.get(localDate);
    if (dailyTemperature) {
      dailyTemperature.min = Math.min(dailyTemperature.min, forecast.main.temp_min);
      dailyTemperature.max = Math.max(dailyTemperature.max, forecast.main.temp_max);
    } else {
      dailyTemperatures.set(localDate, {
        min: forecast.main.temp_min,
        max: forecast.main.temp_max,
      });
    }
  });

  const forecastDays = Array.from(dailyTemperatures.entries());
  const labels = forecastDays.map(([date]) =>
    new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
    })
  );
  const dailyLows = forecastDays.map(([, temperatures]) =>
    Math.round(convertTemperature(temperatures.min - 273.15))
  );
  const dailyHighs = forecastDays.map(([, temperatures]) =>
    Math.round(convertTemperature(temperatures.max - 273.15))
  );

  const data = {
    labels,
    datasets: [
      {
        label: `Low (°${tempUnit})`,
        data: dailyLows,
        borderColor: 'rgb(75, 124, 155)',
        backgroundColor: 'rgb(75, 124, 155)',
        tension: 0.4,
      },
      {
        label: `High (°${tempUnit})`,
        data: dailyHighs,
        borderColor: 'rgb(39, 77, 116)',
        backgroundColor: 'rgb(39, 77, 116)',
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
      <h4>5-Day Temperature Forecast</h4>
      <div className="box">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default WeeklyForecast;
