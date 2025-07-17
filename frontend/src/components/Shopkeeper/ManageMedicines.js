import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ManageMedicines.css';

function ManageMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({ name: '', quantity: '' });

  const fetchMedicines = async () => {
    try {
      const res = await api.get('/medicine/list');
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching medicines');
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/medicine/add', {
        name: newMedicine.name,
        quantity: Number(newMedicine.quantity),
      });
      alert(res.data.msg);
      setNewMedicine({ name: '', quantity: '' });
      fetchMedicines();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error adding medicine');
    }
  };

  const handleRemoveMedicine = async (id) => {
    if (!window.confirm('Are you sure you want to remove this medicine?')) return;
    try {
      const res = await api.delete(`/medicine/remove/${id}`);
      alert(res.data.msg);
      fetchMedicines();
    } catch (err) {
      alert(err.response?.data?.msg || 'Error removing medicine');
    }
  };

  return (
    <div className="container">
      <h2>Manage Medicines</h2>

      <form onSubmit={handleAddMedicine}>
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          required
          value={newMedicine.name}
          onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          required
          value={newMedicine.quantity}
          onChange={(e) => setNewMedicine({ ...newMedicine, quantity: e.target.value })}
        />
        <button type="submit">Add Medicine</button>
      </form>

      <h3>Added Medicines</h3>
      {medicines.length === 0 ? (
        <p>No medicines added yet.</p>
      ) : (
        <ul>
          {medicines.map((med) => (
            <li key={med._id}>
              {med.name} - Quantity: {med.quantity}
              <button onClick={() => handleRemoveMedicine(med._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ManageMedicines;
