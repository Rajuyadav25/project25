// components/Sales/SalesList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SalesList() {
  const [sales, setSales] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/sales', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setSales(response.data))
      .catch(error => console.error('Error fetching sales', error));
  }, [token]);

  return (
    <div className="sales-container">
      <h2>Sales</h2>
      <a href="/sales/log">Log New Sale</a>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity Sold</th>
            <th>Sale Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.inventory.name}</td>
              <td>{sale.quantity_sold}</td>
              <td>{new Date(sale.sale_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SalesList;
