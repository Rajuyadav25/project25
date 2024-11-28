// components/Reports/Reports.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [reports, setReports] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/reports', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setReports(response.data))
      .catch(error => console.error('Error fetching reports', error));
  }, [token]);

  const viewReport = id => {
    axios.get(`/api/reports/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: 'blob',
    })
      .then(response => {
        const file = new Blob([response.data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch(error => console.error('Error viewing report', error));
  };

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            Report generated on: {new Date(report.generatedAt).toLocaleDateString()}
            <button onClick={() => viewReport(report.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reports;
