import { useFormik } from "formik";

import { Search, Clear } from "@mui/icons-material";
import { Tooltip, Button } from "@mui/material";

import {
  SearchIconWrapper,
  StyledTextField,
} from "../../../styles/SearchBarStyles";
import "../../../shared/variables.css";

interface SearchBarProps {
  onSearchSubmit: (searchTerm: string) => void;
  onReset: () => void;
}

const SearchBar = ({ onSearchSubmit, onReset }: SearchBarProps) => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSearchSubmit(values.search);
      resetForm();
    },
  });

  const handleSearch = () => {
    formik.handleSubmit();
  };

  const handleReset = () => {
    formik.resetForm();
    onReset();
  };

  return (
    <form onSubmit={formik.handleSubmit} className="search">
      <SearchIconWrapper>
        <Search sx={{ color: "var(--gray)" }} onClick={handleSearch} />
        <StyledTextField
          placeholder="Search…"
          autoComplete="off"
          focused
          id="search"
          name="search"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.search}
        />
        <Tooltip title="Reset" arrow>
          <Button onClick={handleReset}>
            <Clear sx={{ color: "var(--gray)" }} />
          </Button>
        </Tooltip>
      </SearchIconWrapper>
    </form>
  );
};

export default SearchBar;
