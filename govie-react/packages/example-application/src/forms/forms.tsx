import * as React from 'react';
import * as GovIE from 'govie-react';
import { Routes, Route } from 'react-router';
import { Link } from 'react-router-dom';

import Form from './form';
import FinalForm from './final-form';
import Formik from './formik';
import ReactHookForm from './react-hook-form';
import ReactJSONSchemaForm from './react-jsonschema-form';

const Forms: React.FC = () => (
  <Routes>
    <Route path="form" element={<Form />} />
    <Route path="final-form" element={<FinalForm />} />
    <Route path="formik" element={<Formik />} />
    <Route path="react-hook-form" element={<ReactHookForm />} />
    <Route path="react-jsonschema-form" element={<ReactJSONSchemaForm />} />
    <Route
      path="/"
      element={
        <>
          <GovIE.H2>Forms</GovIE.H2>
          <GovIE.Paragraph>Which form example would you like to run?</GovIE.Paragraph>
          <GovIE.UnorderedList>
            <GovIE.ListItem>
              <GovIE.Link as={Link} to="/forms/form">
                Basic
              </GovIE.Link>
            </GovIE.ListItem>
            <GovIE.ListItem>
              <GovIE.Link as={Link} to="/forms/final-form">
                Final Form
              </GovIE.Link>
            </GovIE.ListItem>
            <GovIE.ListItem>
              <GovIE.Link as={Link} to="/forms/formik">
                Formik
              </GovIE.Link>
            </GovIE.ListItem>
            <GovIE.ListItem>
              <GovIE.Link as={Link} to="/forms/react-hook-form">
                React Hook Form
              </GovIE.Link>
            </GovIE.ListItem>
            <GovIE.ListItem>
              <GovIE.Link as={Link} to="/forms/react-jsonschema-form">
                React JSON Schema Form
              </GovIE.Link>
            </GovIE.ListItem>
          </GovIE.UnorderedList>
        </>
      }
    />
  </Routes>
);

export default Forms;
