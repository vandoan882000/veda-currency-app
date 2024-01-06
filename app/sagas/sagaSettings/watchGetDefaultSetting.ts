import { notification } from 'antd';
import type { AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { defaultPlan, defaultSetting, getDefaultSettingFailure, getDefaultSettingRequest, getDefaultSettingSuccess } from '~/reducers/reducerSettings';
import { store } from '~/store/configureStore';
import type { CurrencySettings, DeviceDisplay, Plan } from '~/type';
import { fetchAPI } from '~/utils/fetchAPI';
import { toSettings } from '~/utils/toSettings';


interface GetPlanResponse {
  message: string;
  status: 'success' | 'error';
  data: {
    status: 'activate' | 'deactivate';
    plan: Plan;
    currencySettings?: Record<DeviceDisplay, CurrencySettings>;
  };
}

function* handleGetDefaultSetting(_: ReturnType<typeof getDefaultSettingRequest>) {
  const { setting } = store.getState();
  const { token } = setting;
  try {
    // const res: AxiosResponse<GetSettingsResponse> = yield retry(3, 500, fetchAPI.request, {
    //   url: `api/v1/me/currencies`,
    //   method: 'get',
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    const res: AxiosResponse<GetPlanResponse> = yield retry(3, 500, fetchAPI.request, {
      url: `api/v1/me/info`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const _settings = res.data.data.currencySettings;
    const plan = res.data.data.plan;
    if (_settings && plan) {
      yield put(
        getDefaultSettingSuccess({
          settings: toSettings(_settings),
          plan
        }),
      );
    } else {
      yield put(
        getDefaultSettingSuccess({
          settings: {
            desktop: defaultSetting,
            mobile: defaultSetting,
          },
          plan: defaultPlan
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
