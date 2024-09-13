import React, { useState } from "react";
import { useLoginMutation } from "../slices/apiSlice";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation(); // (RTK) => envoi  des info de co à l'API
  const navigate = useNavigate(); // Si connexion réussie => page accueil

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }).unwrap(); // Envoie les informations à l'API pour la connexion
      navigate("/"); // Redirige l'utilisateur vers la page d'accueil si la connexion réussit
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

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
        <button disabled={isLoading}>
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
      {error && (
        <p className="error">
          {error.data?.message ||
            "Une erreur est survenue lors de la connexion"}
        </p>
      )}
    </div>
  );
};

export default Login;
