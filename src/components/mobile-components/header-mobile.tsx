import { useState } from "react";
import NavMenuMobile from "./nav-menu-mobile";
import navigationMenu from "../../assets/menu_24px.jpg";
import closeNav from "../../assets/close_24px.jpg";

export default function HeaderMobile() {
  const [showNavigation, setShowNavigation] = useState(false);

  const handleOnClick = () => setShowNavigation(!showNavigation);
  return (
    <>
      <button className="menu-button" onClick={handleOnClick}>
        {!showNavigation ? (
          <img src={navigationMenu} alt="" />
        ) : (
          <img
            src={closeNav}
            alt=""
            style={{ width: 15, height: 15, marginRight: 5 }}
          />
        )}
      </button>
      {showNavigation && <NavMenuMobile onClick={handleOnClick} />}
    </>
  );
}
