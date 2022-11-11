export default {
  title: 'Radio',
  parameters: {
    docs: {
      description: {
        component:
          'Use the radios component when users can only select one option from a list.',
      },
    },
    controls: { sort: 'requiredFirst' }
  },
  argTypes: {
    id: { 
      type: { required: true },
      control: 'text' 
    },
    label: { 
      type: { required: true },
      control: 'text' 
    },
    options: { 
      type: { required: true },
      control: 'text' 
    },
    generalHint: { control: 'text' },
    optionsHint: { control: 'array' },
    inline: { control: 'boolean' },
    title: { control: 'boolean' }
  },
  args: {
    inline: false,
    title: true
  },
};

const createLegend = ({ label, title}) => {
  const legend = document.createElement('legend');
  const large = title ? 'govie-fieldset__legend--l' : '';
  legend.className = ['govie-fieldset__legend', large].join(' ');

  const h1 = document.createElement('h1');
  h1.className = 'govie-fieldset__heading';
  h1.innerHTML = label;

  legend.appendChild(h1);

  return legend;
};

const createRadioItem = ({ id, value, name, label, optionHint }) => {
  const item = document.createElement('div');
  item.className = 'govie-radios__item';

  const input = document.createElement('input');
  input.id = id;
  input.name = name;
  input.type = 'radio';
  input.value = value;
  input.className = 'govie-radios__input';

  const labelComponent = document.createElement('label');
  labelComponent.className = 'govie-labal govie-radios__label';
  labelComponent.for = id;
  labelComponent.innerText = label;

  item.appendChild(input);
  item.appendChild(labelComponent);

  if (optionHint) {
    const hint = document.createElement('div');
    hint.className = 'govie-hint govie-radios__hint';
    hint.id = `${id}-hint`;
    hint.innerText = optionHint;

    item.appendChild(hint);
  }

  return item;
};

const Template = (args) => {
  const container = document.createElement('div');
  container.className = 'govie-form-group';

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'govie-fieldset';

  container.appendChild(createLegend({
    label: args.label, 
    title: args.title
  }));

  if (args.generalHint) {
    const hint = document.createElement('div');
    hint.id = args.id;
    hint.className = 'govie-hint';
    hint.innerText = args.generalHint;

    container.appendChild(hint);
  }

  const group = document.createElement('div');

  const inline = args.inline ? 'govie-radios--inline' : '';
  group.className = ['govie-radios', inline].join(' ');
  group.setAttribute('data-module', 'govie-radios');

  args.options?.split(',').forEach((label, index) => {
    group.appendChild(
      createRadioItem({
        id: `${args.id}-${index}`,
        name: args.id,
        value: label.toLowerCase(),
        label,
        optionHint: args.optionsHint ? args.optionsHint[index] : null
      })
    );
  });

  container.appendChild(group);

  return container;
};

export const Radio = Template.bind({});
Radio.args = {
  id: 'where-do-you-live',
  label: 'Where do you live?',
  options: 'England,Scottland,Ireland'
};

export const SubheadingRadio = Template.bind({});
SubheadingRadio.args = {
  id: 'where-do-you-live',
  label: 'Where do you live?',
  options: 'England,Scottland,Ireland',
  title: false
};

export const InlineRadio = Template.bind({});
InlineRadio.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  inline: true
};

export const RadioWithHints = Template.bind({});
RadioWithHints.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  generalHint: 'This includes changing your last name or spelling your name differently.'
};

export const RadioWithOptionsHints = Template.bind({});
RadioWithOptionsHints.args = {
  id: 'changed-name',
  label: 'Have you changed your name?',
  options: 'Yes,No',
  generalHint: 'This includes changing your last name or spelling your name differently.',
  optionsHint: ['Yes, I have changed my name', 'No, I didn\'t change my name']
};


