export interface JsonServiceEditorOptionType {
  baseUrl: string;
  fileName: string;
};

export type AnyHandle = (...arg: any[] | any) => any;

export enum Methods {
  POST = 'POST',
  GET = 'GET',
};

// { url, method, body, callback, error }
export type FetchOptionType = {
  url: string;
  method: Methods;
  body?: any;
  callback?: AnyHandle;
  error?: AnyHandle;
};