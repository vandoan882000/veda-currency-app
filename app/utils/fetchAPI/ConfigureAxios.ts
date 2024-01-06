import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

interface Configure {
  configure: AxiosRequestConfig;
}

const { CancelToken } = axios;

export class ConfigureAxios {
  private axiosInstance: AxiosInstance;

  public constructor({ configure }: Configure) {
    this.axiosInstance = axios.create(configure);
    this.axiosInstance.interceptors.request.use(async config => {
      return config;
    });
  }

  public create = (cancel = '') => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const request = this.axiosInstance({
          ...requestConfig,
          cancelToken: source.token,
          headers: { ...requestConfig.headers },
        });
        if (cancel) {
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };
}
