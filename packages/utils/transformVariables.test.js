import { transformVariables } from './transformVariables';

describe('utils/transformVariables', () => {
  it('transforms camelCase keyed object to the predefined variables format', () => {
    expect(
      transformVariables('button', {
        default: {
          backgroundColor: 'red',
          textColor: 'white',
        },
      })
    ).toMatchObject({
      '--ogcio-button--default__background-color': 'red',
      '--ogcio-button--default__text-color': 'white',
    });
  });
});
