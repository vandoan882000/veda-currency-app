import type { AxiosResponse } from 'axios';

/** Convert axios headers to headers instance */
export function axiosHeadersToFetchHeaders(axiosHeaders: AxiosResponse['headers']) {
  const headers = new Headers();
  for (const header in axiosHeaders) {
    headers.append(header, axiosHeaders[header]);
  }
  return headers;
}
