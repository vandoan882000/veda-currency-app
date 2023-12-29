import { put, retry, takeLatest } from '@redux-saga/core/effects';
import type { AxiosError, AxiosResponse } from 'axios';
import { initializationActions } from '~/actions/actionInitializationPage';
import { fetchAPI } from '~/utils/fetchAPI/index';
import type { ErrorData} from '~/utils/handleError';
import { handleError } from '~/utils/handleError';

interface ResponseSuccess {
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  email: string;
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  myshopifyDomain: string;
  /** Để sử dụng cho tính năng redirect đến shopify editor - nơi active theme app extension */
  themeId: number | null;
  /** Để hiển thị thông báo có cần active theme app extension hay không */
  appExtensionActived: boolean;
  currencyCode: string;
  currencyFormats: {
    moneyFormat: String;
    moneyWithCurrencyFormat: string;
  };
  enabledPresentmentCurrencies: string[];
}

interface ResponseError {
  message: string;
  isInvalidToken: boolean;
}

function* handleInitialization({ payload }: ReturnType<typeof initializationActions.inititalRequest>) {
  try {
    const res: AxiosResponse<ResponseSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: `${payload.appBridge.localOrigin}/api/initialization`,
      baseURL: '',
    });

    yield put(
      initializationActions.initialSuccess({
        themeId: res.data.themeId,
        appExtensionActived: res.data.appExtensionActived,
        email: res.data.email,
        shopDomain: res.data.myshopifyDomain,
        currencyFormats: res.data.currencyFormats,
        currencyCode: res.data.currencyCode,
        enabledPresentmentCurrencies: res.data.enabledPresentmentCurrencies,
      }),
    );
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    const error_ = error as AxiosError;
    console.log('watchInitialization', error_);
    if (error_.isAxiosError) {
      const response = error_.response?.data as ResponseError;
      const isInvalidToken = response.isInvalidToken;
      yield put(initializationActions.initialFailure({ isInvalidToken }));
    } else {
      yield put(initializationActions.initialFailure({ isInvalidToken: false }));
    }
  }
}

export function* watchInitialization() {
  yield takeLatest(initializationActions.inititalRequest, handleInitialization);
}
