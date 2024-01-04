import { notification } from 'antd';
import type { AxiosError } from 'axios';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { saveSettingFailure, saveSettingRequest } from '~/reducers/reducerSettings';
import { initializationSelector } from '~/store/selectors';
import { fetchAPI } from '~/utils/fetchAPI';

function* handleSaveSetting({ payload }: ReturnType<typeof saveSettingRequest>) {
  try {
    const {
      appBridge,
    }: ReturnType<typeof initializationSelector> = yield select(initializationSelector);
    // const { settings }: ReturnType<typeof settingSelector> = yield select(settingSelector);
    if (!appBridge) {
      throw new Error("App didn't exist");
    }
    yield retry(3, 500, fetchAPI.request, {
      url: 'me/settings',
      method: 'put',
      data: {
      } as any,
    });
    try {
      yield retry(3, 500, fetchAPI.request, {
        baseURL: '',
        method: 'POST',
        url: `${appBridge.localOrigin}/api/currencies`,
      });
    } catch {}
    // if (res.data.status === 'error') {
    //   payload.onFailure(res.data.message);
    //   yield put(saveSettingFailure(undefined));
    // } else {
    //   yield put(saveSettingSuccess(undefined));
    //   notification.success({ message: 'Saved successfully!' });
    // }
  } catch (err) {
    const _err = err as AxiosError;
    if (_err.response) {
      payload.onFailure(_err.response.data.message);
    } else {
      notification.error({ message: 'Something went wrong' });
    }
    yield put(saveSettingFailure(undefined));
  }
}

export function* watchSaveSetting() {
  yield takeLatest(saveSettingRequest.type, handleSaveSetting);
}
