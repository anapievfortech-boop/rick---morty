import headerLogo from "../assets/logo-black 1.jpg";
import { Link } from "react-router-dom";
import HeaderMobile from "./mobile-components/header-mobile";
import { useMobile } from "./contexts/mobile-context";

export default function Header() {
  const isMobile = useMobile();

  return (
    <header className="header">
      <div className="wrapper">
        <img className="header-logo" src={headerLogo} alt="header-logo" />
        {!isMobile ? (
          <nav>
            <ul className="header-list">
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
        ) : (
          <HeaderMobile />
        )}
      </div>
    </header>
  );
}
