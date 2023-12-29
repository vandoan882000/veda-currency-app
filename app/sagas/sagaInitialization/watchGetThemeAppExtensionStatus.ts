import { put, retry, select, takeLeading } from '@redux-saga/core/effects';
import type { AxiosError, AxiosResponse } from 'axios';
import { initializationSelector } from '~/store/selectors';
import type { AppState } from '~/type';
import { fetchAPI } from '~/utils/fetchAPI';
import type { ErrorData } from '~/utils/handleError';
import { handleError } from '~/utils/handleError';
import { initializationActions } from '../../actions/actionInitializationPage';

interface ResponseSuccess {
  /** Để hiển thị thông báo có cần active theme app extension hay không */
  appExtensionActived: boolean;
}

function* handleGetThemeAppExtensionStatus(_: ReturnType<typeof initializationActions.getThemeAppExtensionStatusRequest>) {
  try {
    const { appBridge, themeId }: AppState['initialization'] = yield select(initializationSelector);
    if (appBridge) {
      const res: AxiosResponse<ResponseSuccess> = yield retry(3, 1000, fetchAPI.request, {
        url: `${appBridge.localOrigin}/api/theme-app-extension/status`,
        params: { themeId },
        baseURL: '',
      });
      yield put(
        initializationActions.getThemeAppExtensionStatusSuccess({
          appExtensionActived: res.data.appExtensionActived,
        }),
      );
    } else {
      yield put(initializationActions.getThemeAppExtensionStatusFailure(undefined));
    }
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    yield put(initializationActions.getThemeAppExtensionStatusFailure(undefined));
  }
}

export function* watchGetThemeAppExtensionStatus() {
  yield takeLeading(initializationActions.getThemeAppExtensionStatusRequest, handleGetThemeAppExtensionStatus);
}
