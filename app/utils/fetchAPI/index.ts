import qs from 'qs';
import { CANCEL } from 'redux-saga';
import { ConfigureAxios } from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: "https://multicurrency.myshopkit.app/vge/mskmc/v1/",
    timeout: 30000,
    paramsSerializer: qs.stringify,
  },
});

export const fetchAPI = axiosConfig.create(CANCEL);
