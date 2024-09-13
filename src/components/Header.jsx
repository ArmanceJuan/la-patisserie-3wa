import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCheckAuthQuery, useLogoutMutation } from "../slices/apiSlice";
import "./header.scss";

const Header = () => {
  const { data: user, isLoading, refetch } = useCheckAuthQuery();
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      refetch();
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header>
      <h1>La pâtisserie 3wa</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          {/* {user && (
            <li>
              <NavLink to="/play">Jouer</NavLink>
            </li>
          )} */}
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {user ? (
            <>
              {user.role ? (
                <li>
                  <NavLink to="/admin">Admin</NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/play">Jouer</NavLink>
                </li>
              )}
              <li>
                <button onClick={handleLogout} disabled={isLoggingOut}>
                  {isLoggingOut ? "Déconnexion..." : "Logout"}
                </button>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
