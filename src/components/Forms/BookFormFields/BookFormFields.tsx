import { ErrorMessage, Field, useFormikContext } from "formik";

import {
  StyledBox,
  StyledTextField,
} from "../../../styles/BookFormFieldsStyle";

import "./BookFormFields.css";
import "../../../shared/variables.css";

const BookFormFields = () => {
  const { errors, touched, isSubmitting } = useFormikContext();

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
        className="bookform__field"
        required
        name="description"
        id="description"
        label="Description"
        placeholder="Book description..."
        as="textarea"
        rows={6}
      />
      <Field
        component={StyledTextField}
        name="url"
        id="url"
        label="URL"
        type="text"
        // multiline
      />
    </StyledBox>
  );
};

export default BookFormFields;
