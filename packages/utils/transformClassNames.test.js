import { transformClassNames } from './transformClassNames';

describe('utils/transformClassNames', () => {
  it('transforms BEM classNames keyed object to camel case keyed object', () => {
    expect(
      transformClassNames({
        'ogcio-button--default': '123456789',
        'ogcio-button--secondary': '012345678',
      })
    ).toMatchInlineSnapshot(`
      {
        "ogcioButtonDefault": "123456789",
        "ogcioButtonSecondary": "012345678",
      }
    `);
  });
});
