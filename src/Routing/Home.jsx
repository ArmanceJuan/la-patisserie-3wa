import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./home.scss";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  console.log("Cookies :", Cookies.get("token"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/game/pastries");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError("Erreur lors de la récupération des données");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Jouez à notre jeu de yams pour tenter de remporter des lots !</h1>
      <Link to="/play">
        <button className="play-btn">Jouer</button>
      </Link>
      <h1>Lots restants :</h1>
      <div className="pastry-container">
        {data.map((item) => (
          <div key={item.id} className="pastry-item">
            <img src={item.image} alt={item.name} />
            <h2>
              {item.name} : {item.quantity}
            </h2>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Home;
