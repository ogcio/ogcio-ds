import { transformVariables } from './transformVariables';

describe('utils/transformVariables', () => {
  it('transforms camelCase keyed object to the predefined variables format', () => {
    expect(
      transformVariables('button', {
        backgroundColor: 'red',
        textColor: 'white',
      })
    ).toMatchObject({
      'ogcio-button__background-color': 'red',
      'ogcio-button__text-color': 'white',
    });
  });
});
