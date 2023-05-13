import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const Searchbar = ({onSubmit}) => {
    const handleSubmit = (value, actions) => {
      if(value.searchValue.trim() === '') {
        toast.error("The search field cannot be empty. Please enter a search query.");
        return
      }
        onSubmit(value.searchValue.trim());
        actions.resetForm();
    }
  return (
    <header>
      <Formik initialValues={{searchValue: ''}} onSubmit={handleSubmit}>
       <Form>
            <Field
            name='searchValue'
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button type="submit">
              <span>Search</span>
            </button>
       </Form>
      </Formik>
    </header>
  );
};
