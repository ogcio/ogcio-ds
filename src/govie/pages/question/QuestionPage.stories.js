import beautifyHtmlNode from '../../../../.storybook/helpers/beautifyHtmlNode'
import parseHtmlString from '../../../../.storybook/helpers/parseHtmlString'
import { createBody } from '../../../../.storybook/helpers/commonPageComponents'

import { Default as button } from '../../components/button/PrimaryButton.stories'
import { Default as dateInput } from '../../components/date-input/DateInput.stories'
import { Default as textInput } from '../../components/input/TextInput.stories'
import { Default as radios } from '../../components/radios/Radio.stories'
import { Default as heading } from '../../components/typography/Heading.stories'
import { Default as paragraph } from '../../components/typography/Paragraph.stories'

export default {
  title: 'Pages/Question',
  parameters: {
    docs: {
      description: {
        component:
          'This pattern is currently experimental because more research is needed to validate it.\n\n' +
          'Tell users about the cookies you’re setting on their device and let them accept or reject different types of non-essential cookies.',
      },
    },
  },
  argTypes: {
    mode: {
      options: ['one question', 'multiple questions', 'complex question'],
      control: { type: 'radio' },
      type: { required: true },
    },
  },
  args: {
    mode: 'one question',
  },
}

const createOneQuestionNodes = () => {
  return [
    parseHtmlString(
      dateInput({
        fieldId: 'date-of-birth',
        legend: 'What is your date of birth?',
        legendAsHeading: true,
        hint: 'For example, 31 3 1980',
      })
    ),
  ]
}

const createMultipleQuestionsNodes = () => {
  const htmlNodes = []

  const questionsHeading = parseHtmlString(
    heading({
      text: 'Passport details',
      size: 'l',
      captionSize: 'l',
    })
  )
  htmlNodes.push(questionsHeading)

  const passportNumberInput = parseHtmlString(
    textInput({
      fieldId: 'passport-number',
      label: 'Passport number',
      labelAsHeading: false,
      hint: 'For example, 502135326',
    })
  )
  htmlNodes.push(passportNumberInput)

  const expiryDateInput = parseHtmlString(
    dateInput({
      fieldId: 'expiry-date',
      legend: 'Expiry date',
      legendAsHeading: false,
      hint: 'For example, 31 3 1980',
    })
  )
  htmlNodes.push(expiryDateInput)

  return htmlNodes
}

const createComplexQuestionNodes = () => {
  let htmlNodes = []

  const questionHeading = parseHtmlString(
    heading({
      text: 'Interview needs',
      size: 'l',
      captionSize: 'l',
    })
  )
  htmlNodes.push(questionHeading)

  const needsFirstParagraph = parseHtmlString(
    paragraph({
      text: 'Providers do not usually have much flexibility when setting a date and time for interview unless you need adjustments due to a <a href="#" class="govie-link">health condition or disability</a>.',
    })
  )
  htmlNodes.push(needsFirstParagraph)

  const needsSecondParagraph = parseHtmlString(
    paragraph({
      text: 'However, if you need flexibility for other reasons you can tell us about it here.',
    })
  )
  htmlNodes.push(needsSecondParagraph)

  const needsThirdParagraph = parseHtmlString(
    paragraph({
      text: 'For example, you have commitments like caring responsibilites or employment.',
    })
  )
  htmlNodes.push(needsThirdParagraph)

  const needsForthParagraph = parseHtmlString(
    paragraph({
      text: 'Contact your provider if you’re concerned about the interview process.',
    })
  )
  htmlNodes.push(needsForthParagraph)

  const needsRadioButtons = parseHtmlString(
    radios({
      options: 'Yes,No',
      label: 'Do you have any interview needs?',
      size: 'medium',
      inline: false,
    })
  )
  htmlNodes.push(needsRadioButtons)

  return htmlNodes
}

const createColumn = (args) => {
  const column = document.createElement('div')
  column.className = 'govie-grid-column-two-thirds'

  const form = document.createElement('form')

  let formNodes = []

  if (args.mode) {
    switch (args.mode) {
      case 'one question':
        formNodes = createOneQuestionNodes()
        break
      case 'multiple questions':
        formNodes = createMultipleQuestionsNodes()
        break
      case 'complex question':
        formNodes = createComplexQuestionNodes()
        break
    }

    formNodes.forEach((node) => {
      form.appendChild(node)
    })
  }

  const continueButton = parseHtmlString(
    button({ label: 'Continue' })
  )
  form.appendChild(continueButton)

  column.appendChild(form)

  return column
}

const Template = (args) => {
  const row = document.createElement('div')
  row.className = 'govie-grid-row'
  row.appendChild(createColumn(args))

  const body = createBody({ mainContent: row })

  return beautifyHtmlNode(body)
}

export const OneQuestion = Template.bind({})
OneQuestion.args = { mode: 'one question' }

export const MultipleQuestions = Template.bind({})
MultipleQuestions.args = { mode: 'multiple questions' }

export const ComplexQuestion = Template.bind({})
ComplexQuestion.args = { mode: 'complex question' }
