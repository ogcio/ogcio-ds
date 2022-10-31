/* eslint-disable react/prop-types */
import type { FieldProps as FFFieldProps, FieldRenderProps } from 'react-final-form';

import React, { useState, useCallback } from 'react';
import * as GovIE from 'govie-react';
import { Link } from 'react-router-dom';
import { Form, Field as FFField } from 'react-final-form';

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

interface FieldProps<T, I> extends Omit<FFFieldProps<T, FieldRenderProps<T, HTMLElement>>, 'component'> {
  component: React.ComponentType<{
    name?: string;
    input?: I;
    meta?: { touched?: boolean };
  }>;
}

function Field<T, I>({ component: Component, name, ...props }: FieldProps<T, I>) {
  return (
    <FFField name={name} {...props}>
      {({ input, meta }: { input: I; meta: { touched?: boolean; submitFailed?: boolean } }) => (
        <Component
          name={name}
          {...props}
          input={input}
          meta={{ ...meta, touched: meta.touched && meta.submitFailed }}
        />
      )}
    </FFField>
  );
}

const Checkbox = ({ input, ...props }) => <GovIE.Checkbox {...input} {...props} />;
const DateField: React.FC<
  React.ComponentProps<typeof GovIE.DateField> & { meta: { touched: boolean; error: string } }
> = ({ meta, ...props }) => (
  <GovIE.DateField errorText={meta.touched && meta.error ? meta.error : undefined} {...props} />
);
const Radio = ({ input, ...props }) => <GovIE.Radio {...input} {...props} />;
const FileUpload: React.FC<
  React.ComponentProps<typeof GovIE.FileUpload> & { input: { value: string; onChange: (any: FileList) => void } }
> = ({ input: { value, onChange, ...input }, ...props }) => (
  <GovIE.FileUpload {...input} {...props} onChange={({ target }) => onChange(target.files)} />
);

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
        <Form
          onSubmit={handleFormSubmit}
          initialValues={{ dob: { day: '', month: '', year: '' } }}
          render={({ handleSubmit: handleSubmitInner, errors, touched, form }) => {
            const errorsToShow = Object.keys(errors).filter((key) => touched[key]);
            form.pauseValidation();
            const handleSubmit = (e) => {
              form.resumeValidation();
              const res = handleSubmitInner(e);
              form.pauseValidation();
              return res;
            };
            return (
              <form onSubmit={handleSubmit}>
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
                        text: errors[key],
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
                          <GovIE.ErrorText>{errors?.nationality}</GovIE.ErrorText>
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
                        <Field type="checkbox" name="nationality" value="irish" component={Checkbox}>
                          Irish
                        </Field>
                        <Field type="checkbox" name="nationality" value="other" component={Checkbox}>
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
                    <Field
                      component={FileUpload}
                      mb={8}
                      acceptedFormats=".jpg, .png"
                      hint="This can be in either JPG or PNG format"
                      name="petPhoto"
                      validate={validatePetPhoto}
                    >
                      Please upload a recent photograph
                    </Field>
                    <GovIE.MultiChoice
                      mb={8}
                      label="Do you have more than one pet?"
                      meta={{ error: errors?.hasMultiplePets, touched: !!touched?.hasMultiplePets }}
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
                      <Field component={Radio} type="radio" name="hasMultiplePets" inline value="no">
                        No
                      </Field>
                    </GovIE.MultiChoice>
                  </GovIE.Fieldset>
                  <GovIE.Button onClick={handleSubmit} disabled={isSubmitting}>
                    Submit
                  </GovIE.Button>
                </GovIE.LoadingBox>
              </form>
            );
          }}
        />
      )}
      {hasSubmitted && (
        <Results backLink="/forms/final-form" onBackClick={() => setHasSubmitted(false)} {...submittedData} />
      )}
    </>
  );
};

export default FinalForm;
