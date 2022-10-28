import React, { useState, useEffect } from 'react';
import * as GovIE from 'govie-react';
import { Link } from 'react-router-dom';

const Results: React.FC<ResultsProps> = ({
  backLink,
  onBackClick,
  firstName,
  description,
  nationality,
  dob,
  animal,
  hasMultiplePets,
  petPhoto,
  petPhotoString,
}: ResultsProps) => {
  const [photoString, setPhotoString] = useState<string>(petPhotoString);
  useEffect(() => {
    if (petPhoto && petPhoto[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPhotoString(reader.result as string);
      });
      reader.readAsDataURL(petPhoto[0]);
    }
  }, [petPhoto]);

  return (
    <>
      <GovIE.BackLink as={Link} to={backLink} onClick={onBackClick}>
        Back
      </GovIE.BackLink>
      <GovIE.Panel title="Application complete">Reference: XBR1N21R3</GovIE.Panel>
      <GovIE.LeadParagraph>
        Enim pariatur pariatur commodo incididunt ad nulla ex eu sunt ut ex id veniam veniam.
      </GovIE.LeadParagraph>
      <GovIE.Paragraph>
        Consequat adipisicing aliquip eiusmod nostrud et proident non id consequat aliquip eiusmod aliquip.
      </GovIE.Paragraph>
      <GovIE.UnorderedList>
        <GovIE.ListItem>Name: {firstName}</GovIE.ListItem>
        <GovIE.ListItem>Description: {description}</GovIE.ListItem>
        <GovIE.ListItem>Nationality: {nationality?.join(', ')}</GovIE.ListItem>
        <GovIE.ListItem>
          Date of birth: {dob?.day}/{dob?.month}/{dob?.year}
        </GovIE.ListItem>
        <GovIE.ListItem>Animal: {animal}</GovIE.ListItem>
        <GovIE.ListItem>Multiple pets: {hasMultiplePets}</GovIE.ListItem>
        <GovIE.ListItem>Pet photo: {photoString && <img alt="Your pet" src={photoString} />}</GovIE.ListItem>
      </GovIE.UnorderedList>
    </>
  );
};

interface ResultsProps {
  backLink: string;
  onBackClick(): void;
  firstName: string;
  description: string;
  nationality: string[];
  dob: {
    year?: string | number;
    month?: string | number;
    day?: string | number;
  };
  animal: string;
  hasMultiplePets: string;
  petPhoto?: FileList;
  petPhotoString?: string;
}

Results.defaultProps = {
  petPhoto: undefined,
  petPhotoString: undefined,
};

export default Results;
