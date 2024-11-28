// components/Sales/LogSale.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LogSale({ history }) {
  const [inventory, setInventory] = useState([]);
  const [sale, setSale] = useState({
    inventory_id: '',
    quantity_sold: 0,
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/inventory', { headers: { Authorization: `Bearer ${token}` } })
      .then(response => setInventory(response.data))
      .catch(error => console.error('Error fetching inventory', error));
  }, [token]);

  const handleChange = e => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/sales', sale, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => history.push('/sales'))
      .catch(error => console.error('Error logging sale', error));
  };

  return (
    <div className="log-sale-container">
      <h2>Log Sale</h2>
      <form onSubmit={handleSubmit}>
        <select name="inventory_id" value={sale.inventory_id} onChange={handleChange} required>
          <option value="">Select Item</option>
          {inventory.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select><br/>
        <input name="quantity_sold" type="number" placeholder="Quantity Sold" value={sale.quantity_sold} onChange={handleChange} required /><br/>
        <button type="submit">Record Sale</button>
      </form>
    </div>
  );
}

export default LogSale;
