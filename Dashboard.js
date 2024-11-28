// components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [inventoryCount, setInventoryCount] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [recentSales, setRecentSales] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/api/inventory', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => {
        setInventoryCount(response.data.length);
        setLowStockItems(response.data.filter(item => item.quantity <= item.low_stock_limit));
      })
      .catch(error => console.error('Error fetching inventory', error));

    axios.get('/api/sales/recent', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setRecentSales(response.data))
      .catch(error => console.error('Error fetching sales', error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div>
        <h3>Total Inventory Items: {inventoryCount}</h3>
        <h3>Low Stock Alerts</h3>
        <ul>
          {lowStockItems.map(item => (
            <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
        <h3>Recent Sales</h3>
        <ul>
          {recentSales.map(sale => (
            <li key={sale.id}>
              {sale.inventory.name} - Quantity Sold: {sale.quantity_sold} on {new Date(sale.sale_date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
