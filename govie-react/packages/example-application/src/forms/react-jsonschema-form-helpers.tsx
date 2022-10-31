/* eslint-disable react/prop-types */

import type { FormProps, FieldTemplateProps, AjvError, ObjectFieldTemplateProps, FieldProps } from '@rjsf/core';

// TODO: extract these reusable parts in to a published module e.g. @govie-react/json-schema-form

import React, { useCallback, useState } from 'react';
import * as GovIE from 'govie-react';
import BaseForm from '@rjsf/core';

const dobObjToString = ({ year, month, day }: { year?: string; month?: string; day?: string }) =>
  `${year || ''}-${month ? month.padStart(2, '0') : ''}-${day ? day.padStart(2, '0') : ''}`;

export const dobStringToObj: (dob: string) => { year?: number; month?: number; day?: number } = (dob) => {
  if (!dob) return {};
  const [year, month, day] = dob.split('-').map((s) => s.trim());
  return { year: parseInt(year, 10), month: parseInt(month, 10), day: parseInt(day, 10) };
};

const DateField = ({ schema, onChange, children, rawErrors }) => {
  const [value, setValue] = useState({ day: '', month: '', year: '' });
  const handleChange = useCallback(
    ({ year, month, day }) => {
      setValue({ year, month, day });
      return onChange(dobObjToString({ year, month, day }));
    },
    [onChange]
  );

  return (
    <GovIE.DateField
      errorText={rawErrors?.[0]}
      input={{
        value,
        onChange: handleChange,
      }}
    >
      {schema.title}
    </GovIE.DateField>
  );
};

// interface AnyOfProps {
//   name: string;
//   schema: JSONSchema7;
//   formData: { const: string }[];
//   onChange: (value: string) => void;
//   rawErrors?: string[];
// }
const AnyOf: React.FC<FieldProps> = ({ name, schema, formData = [], onChange, rawErrors }) => (
  <GovIE.FormGroup error={!!rawErrors?.length}>
    <GovIE.Label mb={4}>
      <GovIE.LabelText>{schema.title}</GovIE.LabelText>
      {rawErrors?.length && <GovIE.ErrorText>{rawErrors[0]}</GovIE.ErrorText>}
      {(Array.isArray(schema?.items) ? schema.items : [schema?.items]).map(
        (items) =>
          typeof items !== 'boolean' &&
          items?.anyOf?.map(
            (item) =>
              typeof item !== 'boolean' && (
                <GovIE.Checkbox
                  key={String(item.const)}
                  name={name}
                  value={String(item.const)}
                  hint={item.description}
                  onChange={(e) =>
                    onChange(e.target.checked ? formData.concat(item.const) : formData.filter((i) => i !== item.const))
                  }
                >
                  {item.title}
                </GovIE.Checkbox>
              )
          )
      )}
    </GovIE.Label>
  </GovIE.FormGroup>
);

const OneOf = ({ schema, uiSchema, name, onChange, rawErrors }) => {
  if (uiSchema?.['ui:widget'] === 'radio') {
    return (
      <GovIE.MultiChoice mb={4} label={schema.title} meta={{ error: rawErrors?.[0], touched: !!rawErrors?.length }}>
        {schema?.oneOf?.map((item) => (
          <GovIE.Radio key={item.const} value={item.const} name={name} onChange={(e) => onChange(e.target.value)}>
            {item.title}
          </GovIE.Radio>
        ))}
      </GovIE.MultiChoice>
    );
  }
  return (
    <GovIE.Select
      label={schema.title}
      mb={4}
      input={{ name, onChange: (e) => onChange(e.target.value) }}
      meta={{ error: rawErrors?.[0], touched: !!rawErrors?.length }}
    >
      <option>Please select...</option>
      {schema?.oneOf?.map((item) => (
        <option key={item.const} value={item.const}>
          {item.title}
        </option>
      ))}
    </GovIE.Select>
  );
};

const handleFilesChanged =
  (onChange) =>
  ({ target }) => {
    onChange();
    const { files } = target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = ({ target: innerTarget }) => onChange(innerTarget.result);
      reader.readAsDataURL(files[0]);
    }
  };

const FileUpload = ({ rawErrors, schema, onChange, name }) => (
  <GovIE.FileUpload
    meta={{ error: rawErrors?.[0], touched: !!rawErrors?.[0] }}
    onChange={handleFilesChanged(onChange)}
    name={name}
  >
    {schema.title}
  </GovIE.FileUpload>
);

const TextArea = ({ schema, rawErrors, onChange, name }) => (
  <GovIE.TextArea
    input={{
      onChange: (e) => onChange(e.target.value),
      name,
    }}
    mb={4}
    hint={schema.description}
    meta={{ error: rawErrors?.[0], touched: !!rawErrors?.[0] }}
  >
    {schema.title}
  </GovIE.TextArea>
);

const InputField = ({ schema, rawErrors, onChange, name }) => (
  <GovIE.InputField
    input={{
      onChange: (e) => onChange(e.target.value),
      name,
    }}
    mb={4}
    hint={schema.description}
    meta={{ error: rawErrors?.[0], touched: !!rawErrors?.[0] }}
  >
    {schema.title}
  </GovIE.InputField>
);

// interface StringFieldProps {
//   uiSchema: any;
//   schema: any;
//   onChange: (value: any) => void;
//   rawErrors?: string[];
//   name: string;
// }
const StringField: React.FC<FieldProps> = ({ uiSchema, schema, onChange, rawErrors, name }) => {
  let Component;
  if (uiSchema?.['ui:widget'] === 'textarea') {
    Component = TextArea;
  } else if (schema?.format === 'data-url') {
    Component = FileUpload;
  } else if (schema?.format === 'date') {
    Component = DateField;
  } else if (schema?.oneOf) {
    Component = OneOf;
  } else {
    Component = InputField;
  }

  return <Component uiSchema={uiSchema} schema={schema} onChange={onChange} rawErrors={rawErrors} name={name} />;
};

const BooleanField: React.FC<FieldProps> = ({ schema, onChange }) => (
  <GovIE.Checkbox onChange={onChange} hint={schema.description}>
    {schema.title}
  </GovIE.Checkbox>
);

export const customFields = {
  ArrayField: AnyOf,
  StringField,
  BooleanField,
};

export const ErrorListTemplate: React.FC<{ errors: AjvError[] }> = ({ errors }) => (
  <GovIE.ErrorSummary
    heading="Error summary"
    description="Please address the following issues"
    errors={errors.map((error, n) => ({
      targetName: error.name || String(n),
      text: error.stack.substring(error.stack.indexOf(' ') + 1),
    }))}
  />
);

export const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({ title, properties }) => {
  return (
    <GovIE.Fieldset>
      {title && <GovIE.Fieldset.Legend size="M">{title}</GovIE.Fieldset.Legend>}
      {properties.map((element) => element.content)}
    </GovIE.Fieldset>
  );
};

export const CustomFieldTemplate: React.FC<FieldTemplateProps> = ({ children }) => <>{children}</>;

export const Form: React.FC<FormProps<void>> = (props) => (
  <BaseForm
    fields={customFields}
    FieldTemplate={CustomFieldTemplate}
    ObjectFieldTemplate={ObjectFieldTemplate}
    ErrorList={ErrorListTemplate}
    {...props}
  />
);
