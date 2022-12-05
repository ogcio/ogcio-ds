const sass = require('node-sass')
const { renderSass } = require('../../../lib/jest-helpers')

// Create a mock warn function that we can use to override the native @warn
// function, that we can make assertions about post-render.
const mockWarnFunction = jest.fn()
  .mockReturnValue(sass.NULL)

const sassConfig = {
  outputStyle: 'compact',
  functions: {
    '@warn': mockWarnFunction
  }
}

describe('@function govie-colour', () => {
  let sassBootstrap = ''

  beforeEach(() => {
    sassBootstrap = `
      $govie-colours: (
        "red": #ff0000,
        "green": #00ff00,
        "blue": #0000ff
      );

      @import "helpers/colour";
    `
  })

  it('returns a colour from the colour palette', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-colour('red');
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe('.foo { color: #ff0000; }')
  })

  it('works with unquoted strings', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-colour(red);
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe('.foo { color: #ff0000; }')
  })

  it('throws an error if a non-existent colour is requested', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-colour('hooloovoo');
      }`

    await expect(renderSass({ data: sass, ...sassConfig }))
      .rejects
      .toThrow(
        'Unknown colour `hooloovoo`'
      )
  })

describe('@function govie-organisation-colour', () => {
  const sassBootstrap = `
    $govie-colours-organisations: (
      'floo-network-authority': (
        colour: #EC22FF,
        colour-websafe: #9A00A8
      ),
      'broom-regulatory-control': (
        colour: #A81223
      )
    );

    @import "helpers/colour";
  `

  it('returns the websafe colour for a given organisation by default', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-organisation-colour('floo-network-authority');
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe('.foo { color: #9A00A8; }')
  })

  it('falls back to the default colour if a websafe colour is not explicitly defined', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-organisation-colour('broom-regulatory-control');
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe('.foo { color: #A81223; }')
  })

  it('can be overridden to return the non-websafe colour', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        border-color: govie-organisation-colour('floo-network-authority', $websafe: false);
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe('.foo { border-color: #EC22FF; }')
  })

  it('throws an error if a non-existent organisation is requested', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        color: govie-organisation-colour('muggle-born-registration-commission');
      }`

    await expect(renderSass({ data: sass, ...sassConfig }))
      .rejects
      .toThrow(
        'Unknown organisation `muggle-born-registration-commission`'
      )
  })
})
