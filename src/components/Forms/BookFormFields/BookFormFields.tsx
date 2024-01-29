import { Field, useFormikContext } from "formik";

import {
  StyledBox,
  StyledTextField,
} from "../../../styles/BookFormFieldsStyle";

import "./BookFormFields.css";
import "../../../shared/variables.css";
import { Book } from "../../BookList/BookList";

interface BookFormFieldsProps {
  isSubmitting: boolean;
  // editBook: (book: Book) => void;
  // removeBook: (id: number) => void;
}

const BookFormFields = ({ isSubmitting }: BookFormFieldsProps) => {
  const { errors, touched } = useFormikContext();

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
    </StyledBox>
  );
};

export default BookFormFields;
