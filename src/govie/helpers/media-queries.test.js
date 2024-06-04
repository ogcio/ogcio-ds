const { compileSassString } = require('../../../lib/jest-helpers');

const sassConfig = {
  style: 'compressed',
};

const sassBootstrap = `
  $govie-breakpoints: (
    mobile:  320px,
    tablet:  740px,
    desktop: 980px,
    wide:    1300px
  );
`;

describe('@mixin govie-media-query', () => {
  it('allows you to target min-width using a numeric value', async () => {
    const sass = `
      @import "helpers/media-queries";

      .foo {
        @include govie-media-query($from: 20em) {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media(min-width: 20em){.foo{color:red}}',
    );
  });

  it('allows you to target min-width using a predefined breakpoint', async () => {
    const sass = `
      ${sassBootstrap}
      @import "helpers/media-queries";

      .foo {
        @include govie-media-query($from: mobile) {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media(min-width: 20em){.foo{color:red}}',
    );
  });

  it('allows you to target max-width using a numeric value', async () => {
    const sass = `
      @import "helpers/media-queries";

      .foo {
        @include govie-media-query($until: 20em) {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media(max-width: 20em){.foo{color:red}}',
    );
  });

  it('allows you to target max-width using a predefined breakpoint', async () => {
    const sass = `
      ${sassBootstrap}
      @import "helpers/media-queries";

      .foo {
        @include govie-media-query($until: desktop) {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media(max-width: 61.24em){.foo{color:red}}',
    );
  });

  it('allows you to target combined min-width and max-width using numeric values', async () => {
    const sass = `
      @import "helpers/media-queries";

      .foo {
        @include govie-media-query($from: 20em, $until: 40em) {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media(min-width: 20em)and (max-width: 40em){.foo{color:red}}',
    );
  });

  it('allows you to target combined min-width and max-width using predefined breakpoints', async () => {
    const sass = `
      ${sassBootstrap}
      @import "helpers/media-queries";

      .foo {
        @include govie-media-query($from: mobile, $until: tablet) {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media(min-width: 20em)and (max-width: 46.24em){.foo{color:red}}',
    );
  });

  it('allows you to target using custom directives', async () => {
    const sass = `
      @import "helpers/media-queries";

      .foo {
        @include govie-media-query($until: 40em, $and: '(orientation: landscape)') {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media(max-width: 40em)and (orientation: landscape){.foo{color:red}}',
    );
  });

  it('allows you to target particular media types', async () => {
    const sass = `
        @import "helpers/media-queries";

      .foo {
        @include govie-media-query($until: 40em, $media-type: 'aural') {
          color: red;
        }
      }`;

    const results = await compileSassString(sass, sassConfig);

    expect(results.css.toString().trim()).toBe(
      '@media aural and (max-width: 40em){.foo{color:red}}',
    );
  });

  describe('when compiling a rasterized stylesheet for IE8', () => {
    it('only outputs static breakpoint styles', async () => {
      const sass = `
        $govie-is-ie8: true;

        $govie-breakpoints: (
          mobile:  320px,
          tablet:  740px,
          desktop: 980px,
          wide:    1300px
        );

        @import "helpers/media-queries";

        .foo {
          @include govie-media-query($until: tablet) {
            color: #{lawngreen};
          }
          @include govie-media-query($from: desktop) {
            color: #{forestgreen};
          }
        }`;

      const results = await compileSassString(sass, sassConfig);

      expect(results.css.toString().trim()).toBe('.foo{color:forestgreen}');
    });

    it('does not rasterize print queries', async () => {
      const sass = `
        ${sassBootstrap}
        $govie-is-ie8: true;

        @import "helpers/media-queries";

        .foo {
          color: blue;
          @include govie-media-query($media-type: 'print') {
            color: red;
          }
        }`;

      const results = await compileSassString(sass, sassConfig);

      expect(results.css.toString().trim()).toBe('.foo{color:blue}');
    });
  });
});
