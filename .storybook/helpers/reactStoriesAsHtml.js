import ReactDOMServer from 'react-dom/server'

import { Default as actionsReact } from '../../src/govie/components/actions/Actions.stories'
import { Default as backLinkReact } from '../../src/govie/components/back-link/BackLink.stories'
import { Default as breadcrumbsReact } from '../../src/govie/components/breadcrumbs/Breadcrumbs.stories'
import { Default as buttonReact } from '../../src/govie/components/button/PrimaryButton.stories'
import { Default as checkboxReact } from '../../src/govie/components/checkboxes/Checkboxes.stories'
import { Default as dateInputReact } from '../../src/govie/components/date-input/DateInput.stories'
import { Default as detailsReact } from '../../src/govie/components/details/Details.stories'
import { Default as headingReact } from '../../src/govie/components/typography/Heading.stories'
import { Default as iconButtonReact } from '../../src/govie/components/icon-button/IconButton.stories'
import { Default as insetTextReact } from '../../src/govie/components/inset-text/InsetText.stories'
import { Default as linkReact } from '../../src/govie/components/typography/Link.stories'
import { Default as listReact } from '../../src/govie/components/typography/Lists.stories'
import { Default as panelReact } from '../../src/govie/components/panel/Panel.stories'
import { Default as paragraphReact } from '../../src/govie/components/typography/Paragraph.stories'
import { Default as radiosReact } from '../../src/govie/components/radios/Radio.stories'
import { Default as stepByStepNavigationReact } from '../../src/govie/components/step-by-step-navigation/StepByStepNavigation.stories'
import { Default as summaryListReact } from '../../src/govie/components/summary-list/SummaryList.stories'
import { Default as tableReact } from '../../src/govie/components/table/Table.stories'
import { Default as tagReact } from '../../src/govie/components/tag/Tag.stories'
import { Default as textInputReact } from '../../src/govie/components/input/TextInput.stories'
import { Default as tickReact } from '../../src/govie/components/tick/Tick.stories'

export const actions = (args) =>
  ReactDOMServer.renderToStaticMarkup(actionsReact(args))

export const backLink = (args) =>
  ReactDOMServer.renderToStaticMarkup(backLinkReact(args))

export const breadcrumbs = (args) =>
  ReactDOMServer.renderToStaticMarkup(breadcrumbsReact(args))

export const button = (args) =>
  ReactDOMServer.renderToStaticMarkup(buttonReact(args))

export const checkbox = (args) =>
  ReactDOMServer.renderToStaticMarkup(checkboxReact(args))

export const dateInput = (args) =>
  ReactDOMServer.renderToStaticMarkup(dateInputReact(args))

export const details = (args) =>
  ReactDOMServer.renderToStaticMarkup(detailsReact(args))

export const heading = (args) =>
  ReactDOMServer.renderToStaticMarkup(headingReact(args))

export const iconButton = (args) =>
  ReactDOMServer.renderToStaticMarkup(iconButtonReact(args))

export const insetText = (args) =>
  ReactDOMServer.renderToStaticMarkup(insetTextReact(args))

export const link = (args) =>
  ReactDOMServer.renderToStaticMarkup(linkReact(args))

export const list = (args) =>
  ReactDOMServer.renderToStaticMarkup(listReact(args))

export const panel = (args) =>
  ReactDOMServer.renderToStaticMarkup(panelReact(args))

export const paragraph = (args) =>
  ReactDOMServer.renderToStaticMarkup(paragraphReact(args))

export const radios = (args) =>
  ReactDOMServer.renderToStaticMarkup(radiosReact(args))

export const stepByStepNavigation = (args) =>
  ReactDOMServer.renderToStaticMarkup(stepByStepNavigationReact(args))

export const summaryList = (args) =>
  ReactDOMServer.renderToStaticMarkup(summaryListReact(args))

export const table = (args) =>
  ReactDOMServer.renderToStaticMarkup(tableReact(args))

export const tag = (args) => ReactDOMServer.renderToStaticMarkup(tagReact(args))

export const textInput = (args) =>
  ReactDOMServer.renderToStaticMarkup(textInputReact(args))

export const tick = (args) =>
  ReactDOMServer.renderToStaticMarkup(tickReact(args))
