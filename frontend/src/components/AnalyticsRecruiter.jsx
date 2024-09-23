import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import './AnalyticsRecruiter.css'; // Import CSS for styling

const AnalyticsRecruiter = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get('/api/v1/application/employer/getall'); // Adjust the URL based on your API structure
        const applications = response.data.applications;

        // Aggregate data
        const aggregatedData = applications.reduce((acc, app) => {
          const jobTitle = app.jobInfo.jobTitle;
          const impressions = app.impressions || 0;

          if (!acc[jobTitle]) {
            acc[jobTitle] = { applications: 0, impressions: 0 };
          }
          acc[jobTitle].applications += 1;
          acc[jobTitle].impressions += impressions;

          return acc;
        }, {});

        // Convert aggregated data to array format for charts
        const chartData = Object.keys(aggregatedData).map(key => ({
          name: key,
          applications: aggregatedData[key].applications,
          impressions: aggregatedData[key].impressions,
        }));

        setAnalyticsData(chartData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="analytics-dashboard">
      <h2>Analytics Dashboard</h2>
      <div className="grid-container">
        <div className="grid-item">
          <h3>Applications by Job</h3>
          <PieChart width={300} height={300}>
            <Pie data={analyticsData} dataKey="applications" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {analyticsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6699'][index % 5]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="grid-item">
          <h3>Applications Over Time</h3>
          <LineChart width={400} height={300} data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="applications" stroke="#8884d8" />
            <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="grid-item">
          <h3>Job Applications</h3>
          <BarChart width={400} height={300} data={analyticsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="applications" fill="#8884d8" />
            <Bar dataKey="impressions" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsRecruiter;
