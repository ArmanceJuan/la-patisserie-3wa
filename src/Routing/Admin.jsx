import React from "react";
import {
  useCheckAuthQuery,
  useAddPastryMutation,
  useUpdatePastryMutation,
  useDeletePastryMutation,
  useGetPastriesQuery,
} from "../slices/apiSlice";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./admin.scss";

const Admin = () => {
  const { data: user, isLoading } = useCheckAuthQuery();
  const { data: pastries, isLoading: pastriesLoading } = useGetPastriesQuery();
  const [createPastrie] = useAddPastryMutation();
  const [updatePastrie] = useUpdatePastryMutation();
  const [deletePastrie] = useDeletePastryMutation();

  const [newPastry, setNewPastry] = useState({
    name: "",
    quantity: 0,
  });
  const [editingPastry, setEditingPastry] = useState(null);

  const handleAddPastry = async (e) => {
    e.preventDefault();
    const { name, quantity } = newPastry;
    await createPastrie({ name, quantity });
    setNewPastry({ name: "", quantity: 0 });
  };

  const handleUpdatePastry = async (e) => {
    e.preventDefault();
    const { id, name, quantity } = editingPastry;
    await updatePastrie({ id, name, quantity });
    setEditingPastry(null);
  };

  const handleDeletePastry = async (id) => {
    await deletePastrie(id);
  };

  if (isLoading || pastriesLoading) return <div>Loading...</div>;

  if (!user || !user.role) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-page">
      <h1>Administration</h1>
      <h3>Ajouter une nouvelle pâtisserie</h3>
      <form onSubmit={handleAddPastry} className="add-form">
        <input
          type="text"
          value={newPastry.name}
          onChange={(e) => setNewPastry({ ...newPastry, name: e.target.value })}
          placeholder="Nom"
          required
        />
        <input
          type="number"
          value={newPastry.quantity}
          onChange={(e) =>
            setNewPastry({ ...newPastry, quantity: parseInt(e.target.value) })
          }
          placeholder="Quantité"
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setNewPastry({ ...newPastry, image: e.target.files[0] })
          }
          placeholder="Image"
          required
        />
        <button type="submit" className="add-btn">
          Ajouter Pâtisserie
        </button>
      </form>

      <h3>Liste des pâtisseries</h3>
      <table className="pastries-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pastries &&
            pastries.map((pastry) => (
              <tr key={pastry.id}>
                <td>
                  <img src={pastry.image} alt={pastry.name} />
                </td>
                <td>{pastry.name}</td>
                <td>{pastry.quantity}</td>
                <td>
                  {editingPastry && editingPastry.id === pastry.id ? (
                    <form onSubmit={handleUpdatePastry} className="edit-form">
                      <input
                        type="text"
                        value={editingPastry.name}
                        onChange={(e) =>
                          setEditingPastry({
                            ...editingPastry,
                            name: e.target.value,
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
                      <button type="submit" className="save-btn">
                        Enregistrer
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPastry(null)}
                        className="cancel-btn"
                      >
                        Annuler
                      </button>
                    </form>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => setEditingPastry(pastry)}
                      >
                        Modifier
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeletePastry(pastry.id)}
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
