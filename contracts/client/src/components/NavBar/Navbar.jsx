import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar(props) {
  const {verify,addCandidate,voting,funds,result,registers,home}= useSelector(state => state.checkSlice);
  const [active, setactive] = useState(false);
  const [login, setLogin] = useState(false);
  const toggleTheme = () => {
    let html = document.getElementsByTagName("html")[0];
    //save the theme in local storage

    html.classList.toggle("dark");
  };

  const closeMenu = () => {
    setactive(false);
  };
  return (
    <Container className="header-fixed bg-[#23598f] dark:bg-[#fff]">
      <Link to={login ? "/dashboard" : "/"} className="font-extrabold text-6xl hover:px-1 duration-700">
        <span className="hover:text-[#efefef] text-[#fff]">Voting </span>
        <span className="hover:text-[#d7b550] text-[#ffc107]"
        >
          Dapp{" "}
        </span>
      </Link>

      <input
        onChange={toggleTheme}
        className=""
        type="checkbox"
        id="switch"
        name="mode"
      />
      <label htmlFor="switch">night</label>

      <nav className={active ? "active" : ""}>
        <Link
        className={`py-2 px-4 rounded-lg hover:text-[#353C41]  bg-[#fff] text-[#000000] ${home && "border-b-4 border-[#ffc107]"}`}
          to="/"
          onClick={closeMenu}
          style={{
            fontWeight: "bold",
          }}
        >
          Home
        </Link>

        <NavHashLink
       className={`py-2 px-4 rounded-lg hover:text-[#353C41]  bg-[#fff] text-[#000000] ${voting && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/Voting"
          onClick={closeMenu}
          style={{
            fontWeight: "bold",
          }}
        >
          Voting
        </NavHashLink>
        <NavHashLink
        className={`py-2 px-4 rounded-lg hover:text-[#353C41]  bg-[#fff] text-[#000000] ${funds && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/Funds"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
        >
          Funds
        </NavHashLink>
        <NavHashLink
       className={`py-2 px-4 rounded-lg hover:text-[#353C41]  bg-[#fff] text-[#000000] ${result && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/Result"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
        >
          Result
        </NavHashLink>
        

        <Link
          className={`py-2 px-4 rounded-lg hover:text-[#353C41]  bg-[#fff] text-[#000000] ${registers && "border-b-4 border-[#ffc107]"}`}
          to="/Registration"
          style={{
            fontWeight: "bold",
          }}
          onClick={closeMenu}
        >
          Register
        </Link>
      </nav>

      <div
        aria-expanded={active ? "true" : "false"}
        aria-haspopup="true"
        className={active ? "menu active" : "menu"}
        onClick={() => {
          setactive(!active);
        }}
      ></div>
    </Container>
  );
}

export default NavBar;
