import { Link } from "react-router-dom";

interface NavMenuMobileProps {
  onClick: () => void;
}

export default function NavMenuMobile({ onClick }: NavMenuMobileProps) {
  return (
    <nav className="navigation-menu-mobile">
      <ul className="header-list-mobile">
        <Link className="nav-list" to="/" onClick={onClick}>
          <li>Characters</li>
        </Link>
        <Link className="nav-list" to="/locations" onClick={onClick}>
          <li>Locations</li>
        </Link>
        <Link className="nav-list" to="/episodes" onClick={onClick}>
          <li>Episodes</li>
        </Link>
      </ul>
    </nav>
  );
}
