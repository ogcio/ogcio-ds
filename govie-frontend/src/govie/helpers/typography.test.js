
const sass = require('node-sass')
const outdent = require('outdent')
const { renderSass } = require('../../../lib/jest-helpers')

// Create a mock warn function that we can use to override the native @warn
// function, that we can make assertions about post-render.
const mockWarnFunction = jest.fn()
  .mockReturnValue(sass.NULL)

const sassConfig = {
  outputStyle: 'nested',
  functions: {
    '@warn': mockWarnFunction
  }
}

let sassBootstrap = `
  $govie-breakpoints: (
    desktop: 30em
  );

  $govie-typography-scale: (
    12: (
      null: (
        font-size: 12px,
        line-height: 15px
      ),
      print: (
        font-size: 14pt,
        line-height: 1.5
      )
    ),
    14: (
      null: (
        font-size: 12px,
        line-height: 15px
      ),
      desktop: (
        font-size: 14px,
        line-height: 20px
      )
    )
  );

  @import "base";`

describe('@mixin govie-typography-common', () => {
  it('should output a @font-face declaration by default', async () => {
    const sass = `
    @import "settings/all";
    @import "helpers/all";
    @import "tools/ie8";

    :root {
      @include govie-typography-common;
    }
    `

    const results = await renderSass({ data: sass, ...sassConfig })
    const resultsString = results.css.toString()

    expect(resultsString).toContain('@font-face')
    expect(resultsString).toContain('font-family: "Lato"')
    expect(resultsString).toContain('font-family: "Lato"')
  })

  it('should not output a @font-face declaration when the user has changed their font', async () => {
    const sass = `
    $govie-font-family: Helvetica, Arial, sans-serif;
    @import "settings/all";
    @import "helpers/all";

    :root {
      @include govie-typography-common;
    }
    `

    const results = await renderSass({ data: sass, ...sassConfig })
    const resultsString = results.css.toString()

    expect(resultsString).not.toContain('@font-face')
    expect(resultsString).not.toContain('font-family: "Lato"')
  })

  it('should not output a @font-face declaration when the user has turned off this feature', async () => {
    const sass = `
    $govie-include-default-font-face: false;
    @import "settings/all";
    @import "helpers/all";

    :root {
      @include govie-typography-common;
    }
    `

    const results = await renderSass({ data: sass, ...sassConfig })
    const resultsString = results.css.toString()

    expect(resultsString).not.toContain('@font-face')
    expect(resultsString).toContain('font-family: "Lato"')
    expect(resultsString).toContain('font-family: "Lato"')
  })

  it('should not output a @font-face declaration when the browser is IE8', async () => {
    const sass = `
    $govie-is-ie8: true;

    @import "settings/all";
    @import "helpers/all";
    @import "tools/ie8";

    :root {
      @include govie-typography-common;
    }
    `

    const results = await renderSass({ data: sass, ...sassConfig })
    const resultsString = results.css.toString()

    expect(resultsString).not.toContain('@font-face')
    expect(resultsString).toContain('font-family: "Lato"')
  })
})

describe('@function _govie-line-height', () => {
  it('preserves line-height if already unitless', async () => {
    const sass = `
      @import "helpers/typography";

      .foo {
        line-height: _govie-line-height($line-height: 3.141, $font-size: 20px);
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe(outdent`
      .foo {
        line-height: 3.141; }`)
  })

  it('preserves line-height if using different units', async () => {
    const sass = `
      @import "helpers/typography";

      .foo {
        line-height: _govie-line-height($line-height: 2em, $font-size: 20px);
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe(outdent`
      .foo {
        line-height: 2em; }`)
  })

  it('converts line-height to a relative number', async () => {
    const sass = `
      @import "helpers/typography";

      .foo {
        line-height: _govie-line-height($line-height: 30px, $font-size: 20px);
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe(outdent`
      .foo {
        line-height: 1.5; }`)
  })
})

describe('@mixin govie-typography-responsive', () => {
  it('outputs CSS with suitable media queries', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include govie-typography-responsive($size: 14)
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe(outdent`
      .foo {
        font-size: 12px;
        font-size: 0.75rem;
        line-height: 1.25; }
        @media (min-width: 30em) {
          .foo {
            font-size: 14px;
            font-size: 0.875rem;
            line-height: 1.42857; } }`)
  })

  it('outputs CSS with suitable media queries for print', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include govie-typography-responsive($size: 12)
      }`

    const results = await renderSass({ data: sass, ...sassConfig })

    expect(results.css.toString().trim()).toBe(outdent`
      .foo {
        font-size: 12px;
        font-size: 0.75rem;
        line-height: 1.25; }
        @media print {
          .foo {
            font-size: 14pt;
            line-height: 1.5; } }`)
  })

  it('throws an exception when passed a size that is not in the scale', async () => {
    const sass = `
      ${sassBootstrap}

      .foo {
        @include govie-typography-responsive(3.14159265359)
      }`

    await expect(renderSass({ data: sass, ...sassConfig }))
      .rejects
      .toThrow(
        'Unknown font size `3.14159` - expected a point from the typography scale.'
      )
  })

  describe('when $important is set to true', () => {
    it('marks font size and line height as important', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include govie-typography-responsive($size: 14, $important: true);
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString().trim()).toBe(outdent`
        .foo {
          font-size: 12px !important;
          font-size: 0.75rem !important;
          line-height: 1.25 !important; }
          @media (min-width: 30em) {
            .foo {
              font-size: 14px !important;
              font-size: 0.875rem !important;
              line-height: 1.42857 !important; } }`)
    })

    it('marks font-size and line-height as important for print media', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include govie-typography-responsive($size: 12, $important: true);
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString().trim()).toBe(outdent`
        .foo {
          font-size: 12px !important;
          font-size: 0.75rem !important;
          line-height: 1.25 !important; }
          @media print {
            .foo {
              font-size: 14pt !important;
              line-height: 1.5 !important; } }`)
    })
  })

  describe('when $override-line-height is set', () => {
    it('overrides the line height', async () => {
      const sass = `
        ${sassBootstrap}

        .foo {
          @include govie-typography-responsive($size: 14, $override-line-height: 21px);
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString().trim()).toBe(outdent`
        .foo {
          font-size: 12px;
          font-size: 0.75rem;
          line-height: 1.75; }
          @media (min-width: 30em) {
            .foo {
              font-size: 14px;
              font-size: 0.875rem;
              line-height: 1.5; } }`)
    })
  })

  describe('when $govie-typography-use-rem is disabled', () => {
    beforeEach(() => {
      sassBootstrap = `
        @import "settings/warnings";
        ${sassBootstrap}
      `
    })

    it('outputs CSS with suitable media queries', async () => {
      const sass = `
        $govie-typography-use-rem: false;
        ${sassBootstrap}

        .foo {
          @include govie-typography-responsive($size: 14)
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString().trim()).toBe(outdent`
        .foo {
          font-size: 12px;
          line-height: 1.25; }
          @media (min-width: 30em) {
            .foo {
              font-size: 14px;
              line-height: 1.42857; } }`)
    })

    it('adjusts rem values based on root font size', async () => {
      const sass = `
        $govie-typography-use-rem: false;
        $govie-root-font-size: 10px;
        ${sassBootstrap}

        .foo {
          @include govie-typography-responsive($size: 14)
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString().trim()).toBe(outdent`
        .foo {
          font-size: 12px;
          line-height: 1.25; }
          @media (min-width: 30em) {
            .foo {
              font-size: 14px;
              line-height: 1.42857; } }`)
    })

    describe('and $important is set to true', () => {
      it('marks font size and line height as important', async () => {
        const sass = `
          $govie-typography-use-rem: false;
          ${sassBootstrap}

          .foo {
            @include govie-typography-responsive($size: 14, $important: true);
          }`

        const results = await renderSass({ data: sass, ...sassConfig })

        expect(results.css.toString().trim()).toBe(outdent`
          .foo {
            font-size: 12px !important;
            line-height: 1.25 !important; }
            @media (min-width: 30em) {
              .foo {
                font-size: 14px !important;
                line-height: 1.42857 !important; } }`)
      })
    })

    it('outputs a deprecation warning when set to false', async () => {
      const sass = `
        $govie-typography-use-rem: false;
        ${sassBootstrap}`

      await renderSass({ data: sass, ...sassConfig }).then(() => {
        // Get the argument of the last @warn call, which we expect to be the
        // deprecation notice
        return expect(mockWarnFunction.mock.calls.at(-1)[0].getValue())
          .toEqual(
            '$govie-typography-use-rem is deprecated. From version 5.0, ' +
            'GOV.IE Frontend will not support disabling rem font sizes. To ' +
            'silence this warning, update $govie-suppressed-warnings with ' +
            'key: "allow-not-using-rem"'
          )
      })
    })
  })

  describe('@mixin govie-font', () => {
    it('outputs all required typographic CSS properties', async () => {
      const sass = `
      // Avoid font face being output in tests
      $govie-include-default-font-face: false;
      ${sassBootstrap}

      .foo {
        @include govie-font($size: 14)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString().trim()).toBe(outdent`
        .foo {
          font-family: "Lato", arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-weight: 400;
          font-size: 12px;
          font-size: 0.75rem;
          line-height: 1.25; }
          @media print {
            .foo {
              font-family: sans-serif; } }
          @media (min-width: 30em) {
            .foo {
              font-size: 14px;
              font-size: 0.875rem;
              line-height: 1.42857; } }`)
    })

    it('enables tabular numbers opentype feature flags if $tabular: true', async () => {
      const sass = `
      ${sassBootstrap}

      .foo {
        @include govie-font($size: 14, $tabular: true)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })
      const css = results.css.toString()

      expect(css).toContain('font-feature-settings: "tnum" 1;')
      expect(css).toContain(outdent`
      ${outdent}
        @supports (font-variant-numeric: tabular-nums) {
          .foo {
            font-feature-settings: normal;
            font-variant-numeric: tabular-nums; } }`)
    })

    it('sets font-size based on $size', async () => {
      const sass = `
      ${sassBootstrap}

      .foo {
        @include govie-font($size: 12)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).toContain('font-size: 12px')
      expect(results.css.toString()).not.toContain('font-size: 14px')
    })

    it('does not output font-size if $size: false', async () => {
      const sass = `
      ${sassBootstrap}

      .foo {
        @include govie-font($size: false)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).not.toContain('font-size')
    })

    it('sets font-weight based on $weight', async () => {
      const sass = `
      // Avoid font face being output in tests
      $govie-include-default-font-face: false;
      ${sassBootstrap}

      .foo {
        @include govie-font($size: 14, $weight: bold)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).toContain('font-weight: 700')
    })

    it('does not output font-weight if $weight: false', async () => {
      const sass = `
      // Avoid font face being output in tests
      $govie-include-default-font-face: false;
      ${sassBootstrap}

      .foo {
        @include govie-font($size: 14, $weight: false)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).not.toContain('font-weight')
    })

    it('ignores undefined font-weights', async () => {
      const sass = `
      // Avoid font face being output in tests
      $govie-include-default-font-face: false;
      ${sassBootstrap}

      .foo {
        @include govie-font($size: 14, $weight: superdupermegabold)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).not.toContain('font-weight')
    })

    it('sets line-height based on $line-height', async () => {
      const sass = `
      // Avoid font face being output in tests
      $govie-include-default-font-face: false;
      ${sassBootstrap}

      .foo {
        @include govie-font($size: 14, $line-height: 1.337)
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).toContain('line-height: 1.337;')
    })
  })
})
