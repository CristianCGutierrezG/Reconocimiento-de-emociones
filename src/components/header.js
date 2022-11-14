import UDLogo from "../images/LogoUD.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faComment,
  faUser,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function Header({ handleClick }) {
  return (
    <>
      <div className="wrapper">
        <div className="content">
          <div className="left">
            <div className="navbarButton">
              <div className="icon">
                <button onClick={handleClick} className="iconButton">
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>
            </div>
            <div className="logo">
              <img src={UDLogo} alt="logo-UD" />
            </div>
          </div>
          <div className="right">
            <div className="icon">
              <button className="iconButton">
                <FontAwesomeIcon icon={faComment} />
              </button>
            </div>
            <div className="icon">
              <button className="iconButton">
                <FontAwesomeIcon icon={faBell} />
              </button>
            </div>
            <div className="User">
              <div className="name">
                <h4>User15</h4>
              </div>
              <div className="image">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
