import { JsonServiceEditorOptionType, FetchOptionType, AnyHandle, Methods } from './types';

export const defaultOptions = {
  baseUrl: 'http://localhost:3000',
  fileName: ''
};

class JsonServiceEditorCore {
  options: JsonServiceEditorOptionType = defaultOptions;

  constructor(options: JsonServiceEditorOptionType | string) {
    this.options = this.initOptions(options);
  };

  initOptions = (options) => {
    if (typeof options === 'string') {
      return {
        ...defaultOptions,
        fileName: options
      }
    };
    return {
      ...defaultOptions,
      ...options
    };
  };

  fetch = ({ url, method, body, callback, error }: FetchOptionType) => {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body
    })
      .then((res) => callback(res))
      .catch((errorMessage) => error(errorMessage))
  };

  get getFetchOption() {
    const { options } = this;
    const { baseUrl, fileName } = options;
    return {
      url: `${baseUrl}/get/${fileName}`,
      method: Methods['GET']
    };
  };

  get setFetchOption() {
    const { options } = this;
    const { baseUrl, fileName } = options;
    return {
      url: `${baseUrl}/set/${fileName}`,
      method: Methods['POST']
    };
  };
};

class JsonServiceEditor extends JsonServiceEditorCore {
  constructor(options) {
    super(options);
  };

  getValue = ({ callback = () => null, error = () => null } : { callback: AnyHandle, error: AnyHandle }) => {
    const { getFetchOption } = this;
    return this.fetch({ ...getFetchOption, callback, error })
  };

  setValue = ({ body, callback, error } : { callback: AnyHandle, error: AnyHandle, body: any }) => {
    const { setFetchOption } = this;
    return this.fetch({ ...setFetchOption, body, callback, error })
  };
};

export default JsonServiceEditor;