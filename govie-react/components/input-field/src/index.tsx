/**
 * ### References:
 *
 * - https://github.com/alphagov/govuk-frontend/blob/main/src/govuk/components/input/_input.scss
 * - https://github.com/alphagov/govuk_elements/blob/master/assets/sass/elements/_forms.scss
 */
import type { LabelProps } from '@govie-react/label';
import type { InputProps } from '@govie-react/input';

import * as React from 'react';
import Label from '@govie-react/label';
import LabelText from '@govie-react/label-text';
import ErrorText from '@govie-react/error-text';
import HintText from '@govie-react/hint-text';
import Input from '@govie-react/input';

/**
 * Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number.
 *
 * - https://govuk-react.github.io/govuk-react/?path=/docs/input-field
 * - https://design-system.service.gov.uk/components/text-input/
 *
 */
export const InputField: React.FC<InputFieldProps> = ({ meta, children, hint, input, ...props }: InputFieldProps) => (
  <Label {...props} error={meta.touched && !!meta.error}>
    <LabelText>{children}</LabelText>
    {hint && <HintText>{hint}</HintText>}
    {meta.touched && meta.error && <ErrorText>{meta.error}</ErrorText>}
    <Input error={meta.touched && !!meta.error} {...input} />
  </Label>
);

InputField.defaultProps = {
  hint: undefined,
  input: {},
  meta: {},
};

InputField.displayName = 'InputField';

export interface InputFieldProps extends LabelProps {
  hint?: React.ReactNode;
  input?: InputProps;
  meta?: {
    error?: string | string[];
    touched?: boolean;
  };
  children: React.ReactNode;
}

/** Component is not exported withWhitespace because Label
 *  is also exported withWhitespace and therefore takes precedence.
 */
export default InputField;
