import { useLocation, useNavigate } from "react-router-dom";

import { AutoStories } from "@mui/icons-material";

import SearchBar from "../../Forms/SearchBar/SearchBar";
import { StyledAppBar, StyledLink } from "../../../styles/HeaderStyles";
import "./Header.css";
import "../../../shared/variables.css";

interface HeaderProps {
  onSearchSubmit: (searchTerm: string) => void;
  onReset: () => void;
}

const Header = ({ onSearchSubmit, onReset }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isFavoritesPage = location.pathname === "/favorit";
  const isBookManagerPage = location.pathname === "/manager";
  const isBookListPage = !isFavoritesPage && !isBookManagerPage;

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <StyledAppBar color="transparent">
      <SearchBar onSearchSubmit={onSearchSubmit} onReset={onReset} />
      <div className="logo" onClick={handleLogoClick}>
        <AutoStories sx={{ color: "var(--gray)", fontSize: 40 }} />
        <p className="logo__name">My Library</p>
      </div>
      <div className="menu__items">
        {isFavoritesPage && (
          <>
            <StyledLink to="/manager" className="item">
              Book Manager
            </StyledLink>
            <StyledLink to="/" className="item">
              Book List
            </StyledLink>
          </>
        )}
        {isBookManagerPage && (
          <>
            <StyledLink to="/favorit" className="item">
              Favorites
            </StyledLink>
            <StyledLink to="/" className="item">
              Book List
            </StyledLink>
          </>
        )}
        {isBookListPage && (
          <>
            <StyledLink to="/favorit" className="item">
              Favorites
            </StyledLink>
            <StyledLink to="/manager" className="item">
              Book Manager
            </StyledLink>
          </>
        )}
      </div>
    </StyledAppBar>
  );
};

export default Header;
