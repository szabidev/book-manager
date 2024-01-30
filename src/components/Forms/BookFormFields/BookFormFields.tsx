import { Field } from "formik";

import {
  StyledBox,
  StyledTextField,
} from "../../../styles/BookFormFieldsStyle";

import "./BookFormFields.css";
import "../../../shared/variables.css";

interface BookFormFieldsProps {
  isSubmitting: boolean;
}

const BookFormFields = ({ isSubmitting }: BookFormFieldsProps) => {
  return (
    <StyledBox>
      <Field
        component={StyledTextField}
        required
        name="title"
        label="Title"
        id="title"
        type="text"
      />
      <Field
        component={StyledTextField}
        required
        name="author"
        id="author"
        label="Author"
        type="text"
      />
      <Field
        component={StyledTextField}
        required
        name="genre"
        id="genre"
        label="Genre"
        type="text"
      />
      <Field
        multiline
        fullWidth
        component={StyledTextField}
        required
        name="description"
        id="description"
        label="Description"
        type="text"
      />
    </StyledBox>
  );
};

export default BookFormFields;
