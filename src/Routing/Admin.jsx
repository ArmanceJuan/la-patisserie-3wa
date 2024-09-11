import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.scss";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isAuthenticated = () => {
    if (!Cookies.get("token")) {
      navigate("/");
      return;
    }
  };

  useEffect(() => isAuthenticated(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:3001/api/pastries");
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError("Erreur lors de la récupération des données");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/game/api/pastrie/${id}`
      );
      if (response.status === 200) {
        setData(data.filter((data) => data.id !== id));
      } else {
        setError("Échec de la suppression");
      }
    } catch (error) {
      console.error(error);
      setError("Échec de la suppression");
    }
  };

  return (
    <div className="admin-page">
      <h1>Administration</h1>
      <h2>Liste des pâtisseries</h2>
      <button className="add-btn">Ajouter une pâtisserie</button>

      {isLoading ? (
        <p>Chargement des données...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Quantités restantes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data.id}>
                <td>
                  <img src={data.image} alt={data.name} />
                </td>
                <td>{data.name}</td>
                <td>{data.quantity}</td>
                <td>
                  <button
                    className="action-btn"
                    onClick={() => handleDelete(data.id)}
                  >
                    Supprimer
                  </button>
                  <button className="action-btn">Modifier</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
