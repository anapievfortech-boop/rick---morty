import headerLogo from "../assets/logo-black 1.jpg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="wrapper">
        <img className="header-logo" src={headerLogo} alt="header-logo" />
        <nav>
          <ul className="header-list hide-on-mobile">
            <Link className="nav-list" to="/">
              <li>Characters</li>
            </Link>
            <Link className="nav-list" to="/locations">
              <li>Locations</li>
            </Link>
            <Link className="nav-list" to="/episodes">
              <li>Episodes</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}
