// components/Inventory/InventoryList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = () => {
    axios.get('/api/inventory', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setInventory(response.data))
      .catch(error => console.error('Error fetching inventory', error));
  };

  const deleteItem = id => {
    axios.delete(`/api/inventory/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => fetchInventory())
      .catch(error => console.error('Error deleting item', error));
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>
      <a href="/inventory/add">Add New Item</a>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Barcode</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Low Stock Limit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.barcode}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              <td>{item.low_stock_limit}</td>
              <td>
                <a href={`/inventory/edit/${item.id}`}>Edit</a>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
