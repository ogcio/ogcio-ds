const { renderSass } = require('../../../lib/jest-helpers')

const sassConfig = {
  outputStyle: 'compact'
}

describe('@mixin govie-link-decoration', () => {
  describe('by default', () => {
    it('does not set text-decoration-thickness', async () => {
      const sass = `
        @import "base";

        .foo {
          @include govie-link-decoration;
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).not.toContain('text-decoration-thickness')
    })

    it('does not set text-underline-offset', async () => {
      const sass = `
        @import "base";

        .foo {
          @include govie-link-decoration;
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).not.toContain('text-underline-offset')
    })
  })

  describe('when $govie-new-link-styles are enabled', () => {
    it('sets text-decoration-thickness', async () => {
      const sass = `
        $govie-new-link-styles: true;
        $govie-link-underline-thickness: 1px;
        @import "base";

        .foo {
          @include govie-link-decoration;
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).toContain('text-decoration-thickness: 1px;')
    })

    it('sets text-underline-offset', async () => {
      const sass = `
        $govie-new-link-styles: true;
        $govie-link-underline-offset: .1em;
        @import "base";

        .foo {
          @include govie-link-decoration;
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).toContain('text-underline-offset: 0.1em;')
    })

    describe('when $govie-link-underline-thickness is falsey', () => {
      it('does not set text-decoration-thickness', async () => {
        const sass = `
          $govie-new-link-styles: true;
          $govie-link-underline-thickness: false;
          @import "base";

          .foo {
            @include govie-link-decoration;
          }`

        const results = await renderSass({ data: sass, ...sassConfig })

        expect(results.css.toString()).not.toContain('text-decoration-thickness')
      })
    })

    describe('when $govie-link-underline-offset is falsey', () => {
      it('does not set text-decoration-offset ', async () => {
        const sass = `
        $govie-new-link-styles: true;
        $govie-link-underline-offset: false;
        @import "base";

        .foo {
            @include govie-link-decoration;
        }`

        const results = await renderSass({ data: sass, ...sassConfig })

        expect(results.css.toString()).not.toContain('text-underline-offset')
      })
    })
  })
})

describe('@mixin govie-link-hover-decoration', () => {
  describe('by default', () => {
    it('does not set a hover state', async () => {
      const sass = `
      @import "base";

      // The mixin shouldn't return anything, so this selector ends up empty and
      // is omitted from the CSS
      .foo:hover {
          @include govie-link-hover-decoration;
      }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).not.toContain('.foo:hover')
    })
  })

  describe('when $govie-new-link-styles are enabled', () => {
    it('sets a hover state', async () => {
      const sass = `
        $govie-new-link-styles: true;
        $govie-link-hover-underline-thickness: 10px;
        @import "base";

        .foo:hover {
          @include govie-link-hover-decoration;
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).toContain('.foo:hover')
    })

    describe('when $govie-link-hover-underline-thickness is falsey', () => {
      it('does not set a hover state', async () => {
        const sass = `
        $govie-new-link-styles: true;
        $govie-link-hover-underline-thickness: false;
        @import "base";

        // The mixin shouldn't return anything, so this selector ends up empty and
        // is omitted from the CSS
        .foo:hover {
            @include govie-link-hover-decoration;
        }`

        const results = await renderSass({ data: sass, ...sassConfig })

        expect(results.css.toString()).not.toContain('.foo:hover')
      })
    })
  })
})

describe('@mixin govie-link-style-text', () => {
  describe('when $govie-text-colour is a colour', () => {
    it('applies the rgba function', async () => {
      const sass = `
        $govie-text-colour: black;
        @import "base";

        a {
            @include govie-link-style-text;
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).toContain(':hover')
      expect(results.css.toString()).toContain('color:')
      expect(results.css.toString()).toContain('rgba(')
    })
  })

  describe('when $govie-text-colour is inherit', () => {
    it('does NOT apply the rgba function', async () => {
      const sass = `
        $govie-text-colour: inherit;
        @import "base";

        a {
            @include govie-link-style-text;
        }`

      const results = await renderSass({ data: sass, ...sassConfig })

      expect(results.css.toString()).not.toContain('rgba(')
    })
  })
})
