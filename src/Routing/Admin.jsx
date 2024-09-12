import React, { useState } from "react";
import {
  useGetPastriesQuery,
  useAddPastryMutation,
  useUpdatePastryMutation,
  useDeletePastryMutation,
} from "../slices/apiSlice";

const Admin = () => {
  const { data: pastries, isLoading } = useGetPastriesQuery();
  const [addPastry] = useAddPastryMutation();
  const [updatePastry] = useUpdatePastryMutation();
  const [deletePastry] = useDeletePastryMutation();

  const [newPastry, setNewPastry] = useState({
    name: "",
    description: "",
    quantity: 0,
  });
  const [editingPastry, setEditingPastry] = useState(null);

  const handleAddPastry = async (e) => {
    e.preventDefault();
    try {
      await addPastry(newPastry).unwrap();
      setNewPastry({ name: "", description: "", quantity: 0 });
    } catch (err) {
      console.error("Failed to add the pastry:", err);
    }
  };

  const handleUpdatePastry = async (e) => {
    e.preventDefault();
    try {
      await updatePastry(editingPastry).unwrap();
      setEditingPastry(null);
    } catch (err) {
      console.error("Failed to update the pastry:", err);
    }
  };

  const handleDeletePastry = async (id) => {
    try {
      await deletePastry(id).unwrap();
    } catch (err) {
      console.error("Failed to delete the pastry:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Add New Pastry</h3>
      <form onSubmit={handleAddPastry}>
        <input
          type="text"
          value={newPastry.name}
          onChange={(e) => setNewPastry({ ...newPastry, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={newPastry.description}
          onChange={(e) =>
            setNewPastry({ ...newPastry, description: e.target.value })
          }
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={newPastry.quantity}
          onChange={(e) =>
            setNewPastry({ ...newPastry, quantity: parseInt(e.target.value) })
          }
          placeholder="Quantity"
          required
        />
        <button type="submit">Add Pastry</button>
      </form>

      <h3>Pastries List</h3>
      {pastries &&
        pastries.map((pastry) => (
          <div key={pastry.id}>
            {editingPastry && editingPastry.id === pastry.id ? (
              <form onSubmit={handleUpdatePastry}>
                <input
                  type="text"
                  value={editingPastry.name}
                  onChange={(e) =>
                    setEditingPastry({ ...editingPastry, name: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  value={editingPastry.description}
                  onChange={(e) =>
                    setEditingPastry({
                      ...editingPastry,
                      description: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="number"
                  value={editingPastry.quantity}
                  onChange={(e) =>
                    setEditingPastry({
                      ...editingPastry,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  required
                />
                <button type="submit">Save</button>
                <button onClick={() => setEditingPastry(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h4>{pastry.name}</h4>
                <p>{pastry.description}</p>
                <p>Quantity: {pastry.quantity}</p>
                <button onClick={() => setEditingPastry(pastry)}>Edit</button>
                <button onClick={() => handleDeletePastry(pastry.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default Admin;
