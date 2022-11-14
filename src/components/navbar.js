import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendar,
  faFaceSmile,
  faGears,
} from "@fortawesome/free-solid-svg-icons";
export default function Navbar({ clickedNav }) {
  return (
    <div className={`navContainer ${clickedNav ? "active" : ""}`}>
      <div className="navBar">
        <a href="/" className="linkNav">
          <div className="iconNav">
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <span className="textNav">Inicio</span>
        </a>
        <a href="/" className="linkNav">
          <div className="iconNav">
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          <span className="textNav">Calendario</span>
        </a>
        <a href="/" className="linkNav">
          <div className="iconNav">
            <FontAwesomeIcon icon={faFaceSmile} />
          </div>
          <span className="textNav">Estado</span>
        </a>
        <a href="/" className="linkNav">
          <div className="iconNav">
            <FontAwesomeIcon icon={faGears} />
          </div>
          <span className="textNav">Personalización</span>
        </a>
      </div>
    </div>
  );
}
