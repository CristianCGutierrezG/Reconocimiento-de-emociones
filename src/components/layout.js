import Header from "./header";
import "./styles.css";
import { useState } from "react";
import Navbar from "./navbar";

export default function Layout({ children }) {
  const [clickedNav, setClickedNav] = useState(false);

  const handleClick = () => {
    setClickedNav(!clickedNav);
  };

  return (
    <>
      <Header clickedNav={clickedNav} handleClick={handleClick} />
      <Navbar clickedNav={clickedNav}></Navbar>
      <div className={`container ${clickedNav ? "activeNave" : ""}`}>
        {children}
      </div>
    </>
  );
}
