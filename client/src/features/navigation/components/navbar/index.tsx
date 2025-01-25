import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../../store";
import { Link, useNavigate } from "react-router-dom";
import { setDisplayLogin } from "../../../../store/slices/modal.slice";
import { CATALOG, ROOT } from "../../../../router";
import "./index.css";

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loggedInUser } = useSelector(
    (state: RootState) => state.authentication
  );
  const searchRef = useRef<HTMLInputElement>(null);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (
      e.key === "Enter" &&
      searchRef &&
      searchRef.current &&
      searchRef.current.value.length > 0
    ) {
      navigate(
        `/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`
      );
      searchRef.current.value = "";
    }
  };

  const handleSearchIconClick = () => {
    if (searchRef && searchRef.current && searchRef.current.value.length > 0) {
      navigate(
        `/catalog?barcode=${searchRef.current.value}&title=${searchRef.current.value}&description=${searchRef.current.value}`
      );
      searchRef.current.value = "";
    }
  };

  const navigateToProfile = () => {
    if (loggedInUser) navigate(`/profile/${loggedInUser._id}`);
  };

  const toggleLogin = () => dispatch(setDisplayLogin(true));

  return (
    <div className="navbar">
      <Link to={ROOT} className="navbar-logo-section">
        <i
          className="ri-book-fill"
          style={{ fontSize: "3rem", color: "black" }}
        />
        <h3>My Library</h3>
      </Link>
      <div className="navbar-option-section">
        <Link to={CATALOG} className="navbar-option navbar-link">
          <h4>View Catalog</h4>
        </Link>
        <div className="navbar-search-box">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search Catalog"
            onClick={handleSearchIconClick}
            onKeyDown={handleEnterKey}
            ref={searchRef}
          />
          <i
            className="ri-search-line"
            style={{ fontSize: "2rem", cursor: "pointer" }}
            onClick={handleSearchIconClick}
          />
        </div>
        {loggedInUser ? (
          <div className="navbar-option" onClick={navigateToProfile}>
            <h2>{`${loggedInUser.firstName}'s Account`}</h2>
          </div>
        ) : (
          <div className="navbar-option" onClick={toggleLogin}>
            <h2>Login</h2>
          </div>
        )}
      </div>
    </div>
  );
};
