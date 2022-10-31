/* eslint-disable react/prop-types */

import React, { useState, useCallback } from 'react';
import * as GovIE from 'govie-react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';

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

const DateField = ({ input: { onChange, onBlur, ...input }, children, ...props }) => {
  const [value, setValue] = useState(input.value);
  return (
    <GovIE.DateField
      {...props}
      input={{
        onChange: (newValue) => {
          setValue({ ...value, ...newValue });
          onChange({ target: { value: { ...value, ...newValue }, name: input.name } });
        },
        onBlur: (newValue) => onBlur({ target: { value, name: input.name } }),
        ...input,
      }}
    >
      {children}
    </GovIE.DateField>
  );
};

const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm({
    reValidateMode: 'onSubmit',
  });

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

  const errorsToShow = Object.keys(errors);

  return (
    <>
      {!hasSubmitted && (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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
                  text: errors[key].message,
                }))}
              />
            )}
            <GovIE.Fieldset>
              <GovIE.Fieldset.Legend size="M">About you</GovIE.Fieldset.Legend>
              <GovIE.InputField
                mb={4}
                hint="You can find this on your passport"
                meta={{ touched: submitCount > 0, error: errors?.firstName?.message }}
                input={register('firstName', {
                  validate: validateFirstName,
                })}
              >
                First name
              </GovIE.InputField>
              <GovIE.TextArea
                mb={8}
                hint="Enter as many words as you like"
                meta={{ touched: submitCount > 0, error: errors?.description?.message }}
                input={register('description', {
                  validate: validateDescription,
                })}
              >
                Description of what you saw
              </GovIE.TextArea>
              <GovIE.FormGroup error={submitCount > 0 && !!errors?.nationality?.message}>
                <GovIE.Label mb={4}>
                  <GovIE.LabelText>Nationality</GovIE.LabelText>
                  {submitCount > 0 && errors?.nationality?.message && (
                    <GovIE.ErrorText>{errors?.nationality.message}</GovIE.ErrorText>
                  )}
                  <GovIE.Checkbox
                    type="checkbox"
                    value="british"
                    hint="including English, Scottish, Welsh and Northern Irish"
                    {...register('nationality', {
                      validate: validateNationality,
                    })}
                  >
                    British
                  </GovIE.Checkbox>
                  <GovIE.Checkbox
                    type="checkbox"
                    value="irish"
                    {...register('nationality', {
                      validate: validateNationality,
                    })}
                  >
                    Irish
                  </GovIE.Checkbox>
                  <GovIE.Checkbox
                    type="checkbox"
                    value="other"
                    {...register('nationality', {
                      validate: validateNationality,
                    })}
                  >
                    Citizen of another country
                  </GovIE.Checkbox>
                </GovIE.Label>
              </GovIE.FormGroup>
              <DateField
                errorText={submitCount > 0 ? errors?.dob?.message : undefined}
                input={register('dob', {
                  validate: validateDateOfBirth,
                })}
              >
                Date of birth
              </DateField>
            </GovIE.Fieldset>
            <GovIE.Fieldset>
              <GovIE.Fieldset.Legend size="M">About your pet</GovIE.Fieldset.Legend>
              <GovIE.Select
                mb={8}
                label="What animal is your pet"
                hint="A cat for example"
                input={register('animal', {
                  validate: validateAnimal,
                })}
                meta={{ error: errors?.animal?.message, touched: submitCount > 0 }}
              >
                <option value="">Please select...</option>
                <option value="cat">Cat</option>
                <option value="other-feline">Other feline</option>
                <option value="other-non-feline">Other non feline</option>
              </GovIE.Select>
              <GovIE.FileUpload
                mb={8}
                acceptedFormats=".jpg, .png"
                hint="This can be in either JPG or PNG format"
                meta={{ error: errors?.petPhoto?.message, touched: submitCount > 0 }}
                {...register('petPhoto', { validate: validatePetPhoto })}
              >
                Please upload a recent photograph
              </GovIE.FileUpload>
              <GovIE.MultiChoice
                mb={8}
                label="Do you have more than one pet?"
                meta={{ error: errors?.hasMultiplePets?.message, touched: submitCount > 0 }}
              >
                <GovIE.Radio
                  type="radio"
                  inline
                  value="yes"
                  {...register('hasMultiplePets', { validate: validateMultiplePets })}
                >
                  Yes
                </GovIE.Radio>
                <GovIE.Radio
                  type="radio"
                  inline
                  value="no"
                  {...register('hasMultiplePets', { validate: validateMultiplePets })}
                >
                  No
                </GovIE.Radio>
              </GovIE.MultiChoice>
            </GovIE.Fieldset>
            <GovIE.Button type="submit" disabled={isSubmitting}>
              Submit
            </GovIE.Button>
          </GovIE.LoadingBox>
        </form>
      )}
      {hasSubmitted && (
        <Results backLink="/forms/react-hook-form" onBackClick={() => setHasSubmitted(false)} {...submittedData} />
      )}
    </>
  );
};

export default ReactHookForm;
