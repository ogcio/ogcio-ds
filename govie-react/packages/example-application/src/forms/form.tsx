import React, { useState, useCallback } from 'react';
import * as GovIE from 'govie-react';
import { Link } from 'react-router-dom';

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

function isNotEmpty(obj) {
  return Object.keys(obj).some((key) => obj[key]?.length > 0);
}

const toggle = (array, newItem) =>
  array.includes(newItem) ? array.filter((existingItem) => existingItem !== newItem) : [...array, newItem];

const Form: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [nationality, setNationality] = useState<string[]>([]);
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [animal, setAnimal] = useState<string>();
  const [hasMultiplePets, setHasMultiplePets] = useState<string>();
  const [petPhoto, setPetPhoto] = useState<FileList>();
  const [errors, setErrors] = useState<{
    firstName?: string;
    description?: string;
    nationality?: string;
    dob?: string;
    animal?: string;
    petPhoto?: string;
    hasMultiplePets?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const handleSubmit = useCallback(() => {
    if (isSubmitting) return;
    const newErrors = {
      firstName: validateFirstName(firstName),
      description: validateDescription(description),
      nationality: validateNationality(nationality),
      dob: validateDateOfBirth(dob),
      animal: validateAnimal(animal),
      petPhoto: validatePetPhoto(petPhoto),
      hasMultiplePets: validateMultiplePets(hasMultiplePets),
    };

    if (isNotEmpty(newErrors)) {
      setErrors(newErrors);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        // simulate async submission
        setErrors(null);
        setHasSubmitted(true);
        setIsSubmitting(false);
      }, 1000);
    }
  }, [isSubmitting, firstName, animal, description, nationality, dob, hasMultiplePets, petPhoto]);

  return (
    <>
      {!hasSubmitted && (
        <GovIE.LoadingBox loading={isSubmitting}>
          <GovIE.BackLink as={Link} to="/forms">
            Home
          </GovIE.BackLink>
          {errors && !!Object.keys(errors).length && (
            <GovIE.ErrorSummary
              heading="Error summary"
              description="Please address the following issues"
              errors={Object.keys(errors).map((key) => ({
                targetName: key,
                text: errors[key],
              }))}
            />
          )}
          <GovIE.Fieldset>
            <GovIE.Fieldset.Legend size="M">About you</GovIE.Fieldset.Legend>
            <GovIE.Label mb={4} error={!!errors?.firstName}>
              <GovIE.LabelText>First name</GovIE.LabelText>
              <GovIE.HintText>You can find this on your passport</GovIE.HintText>
              {errors?.firstName && <GovIE.ErrorText>{errors.firstName}</GovIE.ErrorText>}
              <GovIE.Input
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                error={!!errors?.firstName}
              />
            </GovIE.Label>
            <GovIE.TextArea
              mb={8}
              hint="Enter as many words as you like"
              meta={{ error: errors?.description, touched: !!errors?.description }}
              input={{
                value: description,
                name: 'description',
                onChange: (e) => {
                  setDescription(e.target.value);
                },
              }}
            >
              Description of what you saw
            </GovIE.TextArea>

            <GovIE.FormGroup error={!!errors?.nationality}>
              <GovIE.Label mb={4}>
                <GovIE.LabelText>Nationality</GovIE.LabelText>
                {errors?.nationality && <GovIE.ErrorText>{errors?.nationality}</GovIE.ErrorText>}
                <GovIE.Checkbox
                  name="nationality"
                  hint="including English, Scottish, Welsh and Northern Irish"
                  checked={nationality.includes('british')}
                  onChange={() => setNationality((prev) => toggle(prev, 'british'))}
                >
                  British
                </GovIE.Checkbox>
                <GovIE.Checkbox
                  name="nationality"
                  checked={nationality.includes('irish')}
                  onChange={() => setNationality((prev) => toggle(prev, 'irish'))}
                >
                  Irish
                </GovIE.Checkbox>
                <GovIE.Checkbox
                  name="nationality"
                  checked={nationality.includes('other')}
                  onChange={() => setNationality((prev) => toggle(prev, 'other'))}
                >
                  Citizen of another country
                </GovIE.Checkbox>
              </GovIE.Label>
            </GovIE.FormGroup>

            <GovIE.DateField.Container errorText={errors?.dob}>
              <GovIE.LabelText>Date of birth</GovIE.LabelText>
              {errors?.dob && <GovIE.ErrorText>{errors?.dob}</GovIE.ErrorText>}
              <GovIE.DateField.Input name="dob" value={dob} onChange={setDob} />
            </GovIE.DateField.Container>
          </GovIE.Fieldset>
          <GovIE.Fieldset>
            <GovIE.Fieldset.Legend size="M">About your pet</GovIE.Fieldset.Legend>
            <GovIE.Select
              mb={8}
              label="What animal is your pet"
              hint="A cat for example"
              input={{ onChange: (e) => setAnimal(e.target.value), value: animal, name: 'animal' }}
              meta={{ error: errors?.animal, touched: !!errors?.animal }}
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
              name="petPhoto"
              meta={{ error: errors?.petPhoto, touched: !!errors?.petPhoto }}
              onChange={(event) => {
                setPetPhoto(event.target.files);
              }}
            >
              Please upload a recent photograph
            </GovIE.FileUpload>
            <GovIE.MultiChoice
              mb={8}
              label="Do you have more than one pet?"
              meta={{ error: errors?.hasMultiplePets, touched: !!errors?.hasMultiplePets }}
            >
              <GovIE.Radio
                name="hasMultiplePets"
                inline
                checked={hasMultiplePets === 'yes'}
                onChange={() => setHasMultiplePets('yes')}
              >
                Yes
              </GovIE.Radio>
              <GovIE.Radio
                name="hasMultiplePets"
                inline
                checked={hasMultiplePets === 'no'}
                onChange={() => setHasMultiplePets('no')}
              >
                No
              </GovIE.Radio>
            </GovIE.MultiChoice>
          </GovIE.Fieldset>
          <GovIE.Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </GovIE.Button>
        </GovIE.LoadingBox>
      )}
      {hasSubmitted && (
        <Results
          backLink="/forms/form"
          onBackClick={() => setHasSubmitted(false)}
          firstName={firstName}
          description={description}
          nationality={nationality}
          dob={dob}
          animal={animal}
          hasMultiplePets={hasMultiplePets}
          petPhoto={petPhoto}
        />
      )}
    </>
  );
};

export default Form;
