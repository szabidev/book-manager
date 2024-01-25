import { useFormik } from "formik";
// import * as yup from "yup";

import { Search } from "@mui/icons-material";
import {
  SearchIconWrapper,
  StyledTextField,
} from "../../../styles/SearchBarStyles";
import "../../../shared/variables.css";

interface SearchBarProps {
  onSearchSubmit: (searchTerm: string) => void;
}

const SearchBar = ({ onSearchSubmit }: SearchBarProps) => {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values, { resetForm }) => {
      onSearchSubmit(values.search);
      console.log("Submitted:", values.search);

      resetForm();
    },
  });

  const handleSearch = () => {
    formik.handleSubmit();
  };

  console.log(formik);

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
      </SearchIconWrapper>
      {/* {formik.touched.search && formik.errors.search && (
        <div style={{ color: "var(--error)" }}>{formik.errors.search}</div>
      )} */}
    </form>
  );
};

export default SearchBar;
