import {
  transformComponentVariables,
  transformGlobalVariables,
} from './transformVariables';

describe('utils/transformGlobalVariables', () => {
  it('transforms camelCase keyed object to the predefined variables format', () => {
    expect(
      transformGlobalVariables({
        color: {
          blue: '#07418b',
          white: '#ffffff',
        },

        spacing: {
          md: '10px',
          lg: '16px',
        },

        fontSize: {
          md: '16px',
        },
      })
    ).toMatchInlineSnapshot(
      {
        '--ogcio-color--blue': '#07418b',
        '--ogcio-color--white': '#ffffff',
        '--ogcio-font-size--md': '16px',
        '--ogcio-spacing--lg': '16px',
        '--ogcio-spacing--md': '10px',
      },
      `
      {
        "--ogcio-color--blue": "#07418b",
        "--ogcio-color--white": "#ffffff",
        "--ogcio-font-size--md": "16px",
        "--ogcio-spacing--lg": "16px",
        "--ogcio-spacing--md": "10px",
      }
    `
    );
  });
});

describe('utils/transformComponentVariables', () => {
  it('transforms camelCase keyed object to the predefined variables format', () => {
    expect(
      transformComponentVariables('button', {
        default: {
          backgroundColor: 'red',
          textColor: 'white',
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "--ogcio-button--default__background-color": "red",
        "--ogcio-button--default__text-color": "white",
      }
    `);
  });
});
