import React, { useState } from "react";
import classes from "./Navbar.module.css";
import logo from "../../Assests/logo1.webp";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { IoHome } from "react-icons/io5";
import { FaBlogger, FaUserTie, FaImage, FaAddressBook } from "react-icons/fa";
import { BsJournalAlbum, BsBoxArrowInLeft } from "react-icons/bs";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleClass, setToggleClass] = useState(`${classes.navLinks}`);
  const [cross, setCross] = useState(false);
  const [crossClass, setCrossClass] = useState(`${classes.toggle}`);

  const toggleHandler = () => {
    // console.log("Clicked");
    if (toggleClass === `${classes.navLinks}`) {
      setToggleClass(`${classes.navLinks}  ${classes.active}`);
      setCross(true);
      setCrossClass(`${classes.toggle} ${classes.active}`);
    } else {
      setToggleClass(`${classes.navLinks}`);
      setCross(false);
      setCrossClass(`${classes.toggle}`);
    }
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.brandImg}>
        <img src={logo} alt="Excellence Foundation" />
      </div>
      <button className={crossClass} onClick={toggleHandler}>
        {!cross && <RxHamburgerMenu />}
        {cross && <RxCross2 />}
      </button>
      <div className={toggleClass}>
        <ul>
          <li>
            <a href="https://www.excellence-foundation.com/">
              <div className={classes.icon}>
                <IoHome />
              </div>{" "}
              Home
            </a>
          </li>
          <li>
            <a href="https://www.excellence-foundation.com/blog/">
              <div className={classes.icon}>
                <FaBlogger />
              </div>{" "}
              Blog
            </a>
          </li>
          <li>
            <a href="https://www.excellence-foundation.com/skill-booster-program/#">
              <div className={classes.icon}>
                <BsJournalAlbum />
              </div>{" "}
              Our Programs
            </a>
          </li>
          <li>
            <a href="https://www.excellence-foundation.com/placements/">
              <div className={classes.icon}>
                <FaUserTie />
              </div>{" "}
              Our Placements
            </a>
          </li>
          <li>
            <a href="https://www.excellence-foundation.com/gallery/">
              <div className={classes.icon}>
                <FaImage />
              </div>{" "}
              Gallery
            </a>
          </li>
          <li>
            <a href="https://www.excellence-foundation.com/contact-us/">
              <div className={classes.icon}>
                <FaAddressBook />
              </div>{" "}
              Contact Us
            </a>
          </li>
        </ul>
        <div className={classes.steps}>
          <ul>
            <li>
              <Link to="/login">
                <div className={classes.icon}>
                  <BsBoxArrowInLeft />
                </div>{" "}
                Login
              </Link>
            </li>
          </ul>
          <div className={classes.register}>
            <a href="https://www.excellence-foundation.com/form/register.php">
              <BiRightArrow />
              Register
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
