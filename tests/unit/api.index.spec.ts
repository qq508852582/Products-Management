import { jsonRequest, paramsUrl } from '@/api/index';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

describe('api.index.ts', () => {
  it('paramsUrl key:value', () => {
    expect(paramsUrl(
      'PATH',
      {
        string: 'string',
        number: 1,
        boolean: true,
        un: undefined,
      },
    ))
      .toBe('PATH?string=string&number=1&boolean=true');
  });
  it('paramsUrl  undefined', () => {
    expect(paramsUrl('PATH', undefined))
      .toBe('PATH');
  });
  it('paramsUrl  null', () => {
    expect(paramsUrl('PATH', undefined))
      .toBe('PATH');
  });
  it('paramsUrl  empty', () => {
    expect(paramsUrl('PATH', {}))
      .toBe('PATH');
  });

  it('jsonRequest fulfill', () => {
    const apiMock = new MockAdapter(axios);
    apiMock.onGet('/api/fulfill-api')
      .reply((config) => {
      // eslint-disable-next-line no-param-reassign
        config.transformResponse = [(data) => JSON.stringify(data)];
        return [200, {
          data: 'test',
          success: true,
        }];
      });
    return jsonRequest('fulfill-api')
      .then((data) => {
        expect(data)
          .toBe('test');
      });
  });

  it('jsonRequest http error code', () => {
    const apiMock = new MockAdapter(axios);
    apiMock.onGet('/api/http-error-code-api')
      .reply(404);
    return jsonRequest('/http-error-code-api')
      .catch((data) => {
        expect(data.response.status)
          .toBe(404);
      });
  });

  it('jsonRequest business error code', () => {
    const apiMock = new MockAdapter(axios);
    apiMock.onGet('/api/business-error-api')
      .reply((config) => {
        // eslint-disable-next-line no-param-reassign
        config.transformResponse = [(data) => JSON.stringify(data)];
        return [200, {
          data: 'test',
          success: false,
          errorCode: 10001,
        }];
      });

    return jsonRequest('/business-error-api')
      .catch((data) => {
        expect(data.errorCode)
          .toBe(10001);
      });
  });
});
