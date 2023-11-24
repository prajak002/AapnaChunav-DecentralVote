import React, { useState, useEffect } from "react";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useSelector } from "react-redux";

function NavbarAdmin() {
  const {verify,addCandidate,voting,funds,result,registers,home}= useSelector(state => state.checkSlice);
  const [active, setactive] = useState(false);
  const [login, setLogin] = useState(false);

  const toggleTheme = () => {
    let html = document.getElementsByTagName("html")[0];
    html.classList.toggle("dark");
    //save the theme in local storage
    // const theme = localStorage.getItem("theme");
    // if (theme === "dark") {
    //   localStorage.setItem("theme", "light");
    //   window.location.reload();
    // }
    // if (theme === "light") {
    //   localStorage.setItem("theme", "dark");
    //   window.location.reload();
    // }

    //reload the page
  };

  const closeMenu = () => {
    setactive(false);
  };
  return (
    <Container className="header-fixed border-b-2 flex justify-between bg-[#23598f] dark:bg-[#fff] px-4">
      <Link to="/" className="text-[#ffc107] font-extrabold text-5xl hover:text-[#f2cf66]">
        <span className="text-6xl font-serif font-extrabold ">Admin </span>
      </Link>

      <input
        onChange={toggleTheme}
        className="container_toggle"
        type="checkbox"
        id="switch"
        name="mode"
      />
      <label htmlFor="switch">Toggle</label>

      <div className=" flex justify-between items-center">
        <Link
        className={`py-2 px-4 rounded-lg   bg-[#fff] text-[#000000] hover:text-[#65aded] hover:underline font-bold mx-2 ${verify && "border-b-4 border-[#ffc107]"}`}
          to="/Verification"
          onClick={closeMenu}
          
        >
          Verify
        </Link>

        <Link
        className={`py-2 px-4 rounded-lg   bg-[#fff] text-[#000000] hover:text-[#65aded] hover:underline font-bold mx-2 ${addCandidate && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/AddCandidate"
          
          onClick={closeMenu}
        >
          Add Candidates
        </Link>
        
        <Link
        className={`py-2 px-4 rounded-lg   bg-[#fff] text-[#000000] hover:text-[#65aded] hover:underline font-bold mx-2 ${voting && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/Voting"
          
          onClick={closeMenu}
        >
          Voting
        </Link>
        <Link
        className={`py-2 px-4 rounded-lg   bg-[#fff] text-[#000000] hover:text-[#65aded] hover:underline font-bold mx-2 ${funds && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/Funds"
          
          onClick={closeMenu}
        >
          Funds
        </Link>
        <Link
        className={`py-2 px-4 rounded-lg   bg-[#fff] text-[#000000] hover:text-[#65aded] hover:underline font-bold mx-2 ${result && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/Result"
          
          onClick={closeMenu}
        >
          Results
        </Link>
        <Link
        className={`py-2 px-4 rounded-lg   bg-[#fff] text-[#000000] hover:text-[#65aded] hover:underline font-bold mx-2 ${registers && "border-b-4 border-[#ffc107]"}`}
          smooth
          to="/Registration"
          
          onClick={closeMenu}
        >
          Register
        </Link>

        {/* <Link className="button" onClick={logoutUser}>
          Disconnect
        </Link> */}
      </div>

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

export default NavbarAdmin;
