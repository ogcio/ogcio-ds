export default {
  title: 'Radio',
  parameters: {
    docs: {
      description: {
        component:
          'Use the radios component when users can only select one option from a list.',
      },
    },
  },
  argTypes: {
    id: { control: 'text' },
    label: { control: 'text' },
    options: { control: 'text' },
  },
  args: {
    inline: false,
  },
};

const createLegend = (label) => {
  const legend = document.createElement('legend');
  legend.className = 'govie-fieldset__legend govie-fieldset__legend--l';

  const h1 = document.createElement('h1');
  h1.className = 'govie-fieldset__heading';
  h1.innerHTML = label;

  legend.appendChild(h1);

  return legend;
};

const createRadioItem = ({ id, value, name, label }) => {
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

  return item;
};

const Template = (args) => {
  const container = document.createElement('div');
  container.className = 'govie-form-group';

  const fieldset = document.createElement('fieldset');
  fieldset.className = 'govie-fieldset';

  container.appendChild(createLegend(args.label));

  const group = document.createElement('div');
  group.className = 'govie-radios';
  group.setAttribute('data-module', 'govie-radios');

  args.options?.split(',').forEach((label, index) => {
    group.appendChild(
      createRadioItem({
        id: `${args.id}-${index}`,
        name: args.id,
        value: label.toLowerCase(),
        label,
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
