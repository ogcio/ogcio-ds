/* eslint-disable react/prop-types */

import React, { useState, useCallback } from 'react';
import * as GovIE from 'govie-react';
import { Link } from 'react-router-dom';

import { Formik, Form, Field as FormikField } from 'formik';

import {
  validateNationality,
  validateMultiplePets,
  validateFirstName,
  validateDescription,
  validateDateOfBirth,
  validateAnimal,
  validatePetPhoto,
} from './validators/validators';
import Results from './components/results';

const Field = ({ component: Component, ...props }) => (
  <FormikField {...props}>{({ field, meta }) => <Component {...props} input={field} meta={meta} />}</FormikField>
);

const FileField = ({ name, validate, children, ...props }) => (
  <FormikField name={name} validate={validate}>
    {({ field: { value, onChange, ...input } }) => (
      <GovIE.FileUpload
        {...input}
        onChange={({ target }) => onChange(target.files)} // instead of the default target.value
        {...props}
      >
        {children}
      </GovIE.FileUpload>
    )}
  </FormikField>
);

const Checkbox = ({ input, ...props }) => <GovIE.Checkbox {...input} {...props} />;
const DateField = ({ meta, input: { onChange, onBlur, ...input }, children, ...props }) => (
  <GovIE.DateField
    errorText={meta.touched && meta.error ? meta.error : undefined}
    {...props}
    input={{
      onChange: (value) => onChange({ target: { value, name: props.name } }),
      onBlur: (value) => onBlur({ target: { value, name: props.name } }),
      ...input,
    }}
  >
    {children}
  </GovIE.DateField>
);
const Radio = ({ input, ...props }) => <GovIE.Radio {...input} {...props} />;

const FinalForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState();
  const handleFormSubmit = useCallback(
    (values) => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      setTimeout(() => {
        // simulate async submission
        setSubmittedData(values);
        setHasSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    },
    [isSubmitting]
  );

  return (
    <>
      {!hasSubmitted && (
        <Formik
          initialValues={{
            firstName: '',
            description: '',
            nationality: [],
            dob: { day: '', month: '', year: '' },
            animal: '',
            petPhoto: null,
            hasMultiplePets: null,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleFormSubmit}
          render={({ errors, touched, setFieldValue }) => {
            const errorsToShow = Object.keys(errors).filter((key) => touched[key]);
            return (
              <Form>
                <GovIE.LoadingBox loading={isSubmitting}>
                  <GovIE.BackLink as={Link} to="/forms">
                    Home
                  </GovIE.BackLink>
                  {!!errorsToShow?.length && (
                    <GovIE.ErrorSummary
                      heading="Error summary"
                      description="Please address the following issues"
                      errors={errorsToShow.map((key) => ({
                        targetName: key,
                        text: Array.isArray(errors[key]) ? errors[key][0] : errors[key],
                      }))}
                    />
                  )}
                  <GovIE.Fieldset>
                    <GovIE.Fieldset.Legend size="M">About you</GovIE.Fieldset.Legend>
                    <Field
                      name="firstName"
                      mb={4}
                      hint="You can find this on your passport"
                      validate={validateFirstName}
                      component={GovIE.InputField}
                    >
                      First name
                    </Field>
                    <Field
                      mb={8}
                      name="description"
                      hint="Enter as many words as you like"
                      validate={validateDescription}
                      component={GovIE.TextArea}
                    >
                      Description of what you saw
                    </Field>

                    <GovIE.FormGroup error={touched?.nationality && !!errors?.nationality}>
                      <GovIE.Label mb={4}>
                        <GovIE.LabelText>Nationality</GovIE.LabelText>
                        {touched?.nationality && errors?.nationality && (
                          <GovIE.ErrorText>
                            {Array.isArray(errors?.nationality)
                              ? String(errors?.nationality[0])
                              : String(errors?.nationality)}
                          </GovIE.ErrorText>
                        )}
                        <Field
                          type="checkbox"
                          name="nationality"
                          value="british"
                          validate={validateNationality}
                          component={Checkbox}
                          hint="including English, Scottish, Welsh and Northern Irish"
                        >
                          British
                        </Field>
                        <Field
                          type="checkbox"
                          name="nationality"
                          value="irish"
                          validate={validateNationality}
                          component={Checkbox}
                        >
                          Irish
                        </Field>
                        <Field
                          type="checkbox"
                          name="nationality"
                          value="other"
                          validate={validateNationality}
                          component={Checkbox}
                        >
                          Citizen of another country
                        </Field>
                      </GovIE.Label>
                    </GovIE.FormGroup>
                    <Field name="dob" component={DateField} validate={validateDateOfBirth}>
                      Date of birth
                    </Field>
                  </GovIE.Fieldset>
                  <GovIE.Fieldset>
                    <GovIE.Fieldset.Legend size="M">About your pet</GovIE.Fieldset.Legend>
                    <Field
                      component={GovIE.Select}
                      mb={8}
                      name="animal"
                      label="What animal is your pet"
                      hint="A cat for example"
                      validate={validateAnimal}
                    >
                      <option value="">Please select...</option>
                      <option value="cat">Cat</option>
                      <option value="other-feline">Other feline</option>
                      <option value="other-non-feline">Other non feline</option>
                    </Field>
                    {/*
                    TODO: need to be able to pass props to file input
                    https://github.com/final-form/react-final-form/issues/663
                    */}
                    <FileField
                      mb={8}
                      acceptedFormats=".jpg, .png"
                      hint="This can be in either JPG or PNG format"
                      name="petPhoto"
                      validate={validatePetPhoto}
                      onChange={(event) => {
                        setFieldValue('petPhoto', event.target.files);
                      }}
                      meta={{ error: errors?.petPhoto, touched: !!touched?.petPhoto }}
                    >
                      Please upload a recent photograph
                    </FileField>
                    <GovIE.MultiChoice
                      mb={8}
                      label="Do you have more than one pet?"
                      meta={{
                        error:
                          errors?.hasMultiplePets &&
                          (Array.isArray(errors?.hasMultiplePets)
                            ? String(errors?.hasMultiplePets[0])
                            : String(errors?.hasMultiplePets)),
                        touched: !!touched?.hasMultiplePets,
                      }}
                    >
                      <Field
                        component={Radio}
                        type="radio"
                        name="hasMultiplePets"
                        inline
                        value="yes"
                        validate={validateMultiplePets}
                      >
                        Yes
                      </Field>
                      <Field
                        component={Radio}
                        type="radio"
                        name="hasMultiplePets"
                        inline
                        value="no"
                        validate={validateMultiplePets}
                      >
                        No
                      </Field>
                    </GovIE.MultiChoice>
                  </GovIE.Fieldset>
                  <GovIE.Button type="submit" disabled={isSubmitting}>
                    Submit
                  </GovIE.Button>
                </GovIE.LoadingBox>
              </Form>
            );
          }}
        />
      )}
      {hasSubmitted && (
        <>
          <pre>{JSON.stringify(submittedData)}</pre>
          <Results backLink="/forms/formik" onBackClick={() => setHasSubmitted(false)} {...submittedData} />
        </>
      )}
    </>
  );
};

export default FinalForm;
