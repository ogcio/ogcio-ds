import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode';

export default {
  title: 'Form/File Upload',
  parameters: {
    docs: {
      description: {
        component:
          'Help users select and upload a file. You should only ask users to upload something if it’s critical to the delivery of your service.',
      },
    },
  },
  argTypes: {
    fieldId: {
      type: { name: 'string', required: true },
      control: 'text',
    },
    label: {
      control: 'text',
    },
    hint: {
      control: 'text',
      description:
        'Use hint text for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
    },
    errorMessage: {
      control: 'text',
    },
  },
  args: {
    fieldId: 'example-file-upload',
    label: 'Upload a file',
  },
};

const createHint = (args) => {
  const hint = document.createElement('div');
  hint.id = `${args.fieldId}-hint`;
  hint.className = 'govie-hint';
  hint.innerText = args.hint;

  return hint;
};

const createErrorMessage = (args) => {
  const errorSpan = document.createElement('span');
  errorSpan.className = 'govie-visually-hidden';
  errorSpan.innerText = 'Error:';

  const errorMessage = document.createElement('p');
  errorMessage.id = `${args.fieldId}-error`;
  errorMessage.className = 'govie-error-message';
  errorMessage.innerHTML = `${errorSpan.outerHTML} ${args.errorMessage}`;

  return errorMessage;
};

const createLabel = (args) => {
  const label = document.createElement('label');
  label.className = 'govie-label govie-label--s';
  label.setAttribute('for', `${args.fieldId}`);
  label.innerText = args.label;

  return label;
};

const createInput = (args) => {
  const classNames = ['govie-file-upload'];
  const describedby = [];

  if (args.hint) {
    describedby.push(`${args.fieldId}-hint`);
  }

  if (args.errorMessage) {
    classNames.push('govie-input--error');
    describedby.push(`${args.fieldId}-error`);
  }

  const input = document.createElement('input');
  input.className = classNames.join(' ');
  input.id = `${args.fieldId}`;
  input.name = `${args.fieldId}`;
  input.type = 'file';
  input.setAttribute('aria-describedby', describedby.join(' '));

  return input;
};

const Template = (args) => {
  const formGroup = document.createElement('div');
  const classNames = ['govie-form-group'];

  if (args.errorMessage) {
    classNames.push('govie-form-group--error');
  }

  formGroup.className = classNames.join(' ');

  formGroup.appendChild(createLabel(args));

  if (args.hint) {
    formGroup.appendChild(createHint(args));
  }

  if (args.errorMessage) {
    formGroup.appendChild(createErrorMessage(args));
  }

  formGroup.appendChild(createInput(args));

  return beautifyHtmlNode(formGroup);
};

export const Default = Template.bind({});
Default.args = {};

export const WithHint = Template.bind({});
WithHint.args = {
  hint: 'File formats accepted: pdf, doc, docx',
};

export const InError = Template.bind({});
InError.args = {
  errorMessage: 'The file must be smaller than 2MB',
};
