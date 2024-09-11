import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(history);

  console.log("Cookies :", Cookies.get("token"));

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      console.log(response.data);
      if (response.data) {
        localStorage.setItem("userId", response.data.id);
        navigate("/");
        console.log("connexion réussi pour :", response.data.id);
      } else {
        setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error(error);
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1>Connexion en cours...</h1>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <h2>Connexion</h2>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button>Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
