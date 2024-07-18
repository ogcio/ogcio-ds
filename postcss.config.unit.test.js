const Vinyl = require('vinyl');
const configFn = require('./postcss.config.js');

describe('PostCSS config', () => {
  let env;

  function getPluginNames({ plugins }) {
    return plugins.map(({ postcssPlugin }) => postcssPlugin);
  }

  beforeAll(() => {
    env = 'production';
  });

  describe('Browserslist', () => {
    describe('Default environment', () => {
      it('Uses default environment', () => {
        const config = configFn({ env });

        expect(config.plugins).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              postcssPlugin: 'autoprefixer',
              options: { env },
            }),
          ]),
        );
      });

      it.each([{ path: 'example.css' }, { path: 'example.scss' }])(
        'Uses default environment for $path',
        ({ path }) => {
          const input = new Vinyl({ path });
          const config = configFn({ env, file: input.basename });

          expect(config.plugins).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                postcssPlugin: 'autoprefixer',
                options: { env },
              }),
            ]),
          );
        },
      );
    });
  });

  describe('Plugins', () => {
    describe('Default', () => {
      it.each([{ path: 'example.css' }, { path: 'example.scss' }])(
        'Adds plugins for $path',
        ({ path }) => {
          const input = new Vinyl({ path });

          // Confirm plugins for both file object and path
          for (const file of [input, input.path]) {
            const config = configFn({ env, file: file.basename });

            expect(getPluginNames(config)).toEqual(['autoprefixer', 'cssnano']);
          }
        },
      );
    });

    describe('Default + Minification', () => {
      it.each([{ path: 'example.min.css' }, { path: 'example.min.scss' }])(
        'Adds plugins for $path',
        ({ path }) => {
          const input = new Vinyl({ path });

          // Confirm plugins for both file object and path
          for (const file of [input, input.path]) {
            const config = configFn({
              env,
              file: file.basename ? file.basename : file,
            });

            expect(getPluginNames(config)).toEqual(['autoprefixer', 'cssnano']);
          }
        },
      );
    });

    describe('Review app only', () => {
      it.each([
        { path: 'app/assets/scss/app.scss' },
        { path: 'app/assets/scss/app-legacy.scss' },
      ])('Adds plugins for $path', ({ path }) => {
        const input = new Vinyl({ path });

        // Confirm plugins for both file object and path
        for (const file of [input, input.path]) {
          const config = configFn({
            env,
            file: file.basename ? file.basename : file,
          });

          expect(getPluginNames(config)).toEqual(['autoprefixer', 'cssnano']);
        }
      });
    });
  });
});
