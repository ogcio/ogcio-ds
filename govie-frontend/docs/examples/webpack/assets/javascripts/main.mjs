import { Button } from 'govie-frontend'

const $buttons = document.querySelectorAll('[data-module="govie-button"]')

$buttons.forEach(($button) => {
  new Button($button).init()
})
