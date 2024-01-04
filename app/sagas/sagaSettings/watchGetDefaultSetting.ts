import { notification } from 'antd';
import type { AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { defaultSetting, getDefaultSettingFailure, getDefaultSettingRequest, getDefaultSettingSuccess } from '~/reducers/reducerSettings';
import type { CurrencySettings, DeviceDisplay } from '~/type';
import { fetchAPI } from '~/utils/fetchAPI';
import { toSettings } from '~/utils/toSettings';

interface GetSettingsResponse {
  message: string;
  status: 'success' | 'error';
  data: {
    status: 'activate' | 'deactivate';
    settings?: Record<DeviceDisplay, CurrencySettings>;
    defaultCurrencyFormat?: {
      [x: string]: {
        money_format: string;
        money_with_currency_format: string;
      };
    };
  };
}

function* handleGetDefaultSetting(_: ReturnType<typeof getDefaultSettingRequest>) {
  try {
    const res: AxiosResponse<GetSettingsResponse> = yield retry(3, 500, fetchAPI.request, {
      url: `me/settings`,
      method: 'get',
    });
    if (res.data.status !== 'success') {
      throw new Error(res.data.message);
    }
    const _successResponse = res.data.data;
    const _settings = _successResponse.settings;
    const _defaultCurrencyFormat = _successResponse.defaultCurrencyFormat;

    if (_settings) {
      yield put(
        getDefaultSettingSuccess({
          version: _defaultCurrencyFormat ? 'v2' : 'v1',
          settings: toSettings(_settings),
        }),
      );
    } else {
      yield put(
        getDefaultSettingSuccess({
          settings: {
            desktop: defaultSetting,
            mobile: defaultSetting,
          },
          version: 'v0',
        }),
      );
    }
  } catch (err) {
    const _err = err as Error;
    notification.error({ message: 'Get Default Fail', description: _err.message });
    yield put(getDefaultSettingFailure(undefined));
  }
}

export function* watchGetDefaultSetting() {
  yield takeLatest(getDefaultSettingRequest.type, handleGetDefaultSetting);
}
