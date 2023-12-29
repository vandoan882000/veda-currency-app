import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import type { AxiosResponse } from 'axios';
import type { SagaReturnType } from 'redux-saga/effects';
import { initializationActions } from '~/actions/actionInitializationPage';
import { initializationSelector } from '~/store/selectors';
import { fetchAPI } from '~/utils/fetchAPI';

interface ResponseSuccess {
  data: {
    currencyCode: string;
    currencyFormats: {
      moneyFormat: String;
      moneyWithCurrencyFormat: string;
    };
    enabledPresentmentCurrencies: string[];
  };
}

function* handleGetShopCurrencies({ payload }: ReturnType<typeof initializationActions.getShopCurrenciesRequest>) {
  const { onSuccess } = payload;
  try {
    const { appBridge }: SagaReturnType<typeof initializationSelector> = yield select(initializationSelector);
    if (appBridge) {
      const res: AxiosResponse<ResponseSuccess> = yield retry(3, 1000, fetchAPI.request, {
        url: `${appBridge.localOrigin}/api/currencies`,
        baseURL: '',
      });
      yield put(initializationActions.getShopCurrenciesSuccess(res.data.data));
      onSuccess?.();
    } else {
      yield put(initializationActions.getShopCurrenciesFailure(undefined));
    }
  } catch {
    yield put(initializationActions.getShopCurrenciesFailure(undefined));
  }
}

export function* watchGetShopCurrencies() {
  yield takeLatest(initializationActions.getShopCurrenciesRequest, handleGetShopCurrencies);
}
