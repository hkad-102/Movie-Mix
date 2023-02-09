import React, { useState, useEffect } from "react";
import "./headerstyle.scss";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //when ever we change the page or our location is change scroll the page up to top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const controlNavbar = () => {
    if(window.scrollY > 200){
      //when we are going down then we use this
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow('hide')
      }else{
        //when we are going up use this
        setShow('show')
      }
    }else{
      setShow('top')
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar)
    return () => {
      window.removeEventListener("scroll", controlNavbar )
    }
  }, [lastScrollY])

  const navigationHandler = (type) => {
    if(type === 'movie'){
      navigate('/explore/movie')
    }else{
      navigate('/explore/tv')
    }
    setMobileMenu(false)
  }
  const openSearchMenu = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };
  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper className="contentWrapper">
        <div className="logo" onClick={() => navigate('/')}>
          {/* <img src={logo} alt="" /> */}
          <h2>MovieMix</h2>
          <h3 className="by">-hkad</h3>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler('movies')}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler('TV')}>TV Show</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearchMenu}/>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearchMenu} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
