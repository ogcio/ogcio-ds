import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'

export default {
  title: 'Application/Progress Stepper',
  parameters: {
    docs: {
      description: {
        component:
          'Steppers display progress through a sequence of logical and numbered steps. They may also be used for navigation. Steppers may display a transient feedback message after a step is saved.'
      }
    }
  },
  argTypes: {
    steps: {
      control: 'array',
      type: { name: 'array', required: true }
    }
  },
  args: {
    steps: [
      {
        iconText: '1',
        labelText: 'Step 1',
        isCompleted: true
      },
      {
        iconText: '2',
        labelText: 'Step 2',
        isCompleted: true
      },
      {
        iconText: '3',
        labelText: 'Step 3',
        isActive: true
      },
      {
        iconText: '4',
        labelText: 'Step 4'
      },
      {
        iconText: '5',
        labelText: 'Step 5'
      },
      {
        iconText: '6',
        labelText: 'Step 6'
      },
      {
        iconText: '7',
        labelText: 'Step 7'
      }
    ]
  }
}

const createStepLabelText = (stepData) => {
  const stepLabelText = document.createElement('span')
  stepLabelText.className = 'govie-progress-stepper__label-text'
  stepLabelText.innerText = stepData.labelText

  return stepLabelText
}

const createStepLabel = (stepData) => {
  const stepLabel = document.createElement('div')
  stepLabel.className = 'govie-progress-stepper__step-label'
  stepLabel.appendChild(createStepLabelText(stepData))

  return stepLabel
}

const createStep = (stepData) => {
  const classNames = ['govie-progress-stepper__step']

  if (stepData.isCompleted) {
    classNames.push('govie-progress-stepper__step--completed')
  }

  if (stepData.isActive) {
    classNames.push('govie-progress-stepper__step--active')
  }

  const step = document.createElement('div')
  step.className = classNames.join(' ')
  step.setAttribute('data-icon-text', stepData.iconText)

  step.appendChild(createStepLabel(stepData))

  return step
}

const Template = (args) => {
  const progressStepper = document.createElement('div')
  progressStepper.className = 'govie-progress-stepper'
  progressStepper.setAttribute('data-module', 'govie-progress-stepper')

  args.steps.forEach((step) => {
    progressStepper.appendChild(createStep(step))
  })

  return beautifyHtmlNode(progressStepper)
}

export const Default = Template.bind({})
Default.args = {}
