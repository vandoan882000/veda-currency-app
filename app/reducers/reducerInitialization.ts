import { createSlice } from '@reduxjs/toolkit';
import type { State } from '~/type';

const defaultState: State = {
  statusInitialization: 'idle',
  statusGetShopCurrencies: 'idle',
  statusGetThemeAppExtensionStatus: 'idle',
  isInvalidToken: false,
  name: null,
  shopDomain: null,
  email: null,
  themeId: null,
  appExtensionActived: null,
  currencyCode: 'USD',
  currencyFormats: {
    // eslint-disable-next-line no-template-curly-in-string
    moneyFormat: '${{amount}}',
    // eslint-disable-next-line no-template-curly-in-string
    moneyWithCurrencyFormat: '${{amount}}',
  },
  enabledPresentmentCurrencies: [],
};

export const initializationSlice = createSlice({
  initialState: defaultState,
  name: 'initialization',
  reducers: {
    initialSuccess: (state, action) => {
      const {
        themeId,
        appExtensionActived,
        name,
        email,
        shopDomain,
        currencyCode,
        currencyFormats,
        enabledPresentmentCurrencies,
      } = action.payload;
      state.statusInitialization = 'success';
      state.name = name;
      state.shopDomain = shopDomain;
      state.email = email;
      state.appExtensionActived = appExtensionActived;
      state.themeId = themeId;
      state.currencyCode = currencyCode;
      state.currencyFormats = currencyFormats;
      state.enabledPresentmentCurrencies = enabledPresentmentCurrencies;
    },
    initialFailure: (state, action) => {
      const { isInvalidToken } = action.payload;
      state.statusInitialization= 'failure';
      state.isInvalidToken = isInvalidToken;
    },
    getShopCurrenciesRequest: (state, action) => {
      state.statusGetShopCurrencies= 'loading';
    },
    getShopCurrenciesSuccess: (state, action) => {
      const { currencyCode, currencyFormats, enabledPresentmentCurrencies } = action.payload;
      state.statusGetShopCurrencies = 'success';
      state.currencyCode = currencyCode;
      state.currencyFormats= currencyFormats;
      state.enabledPresentmentCurrencies = enabledPresentmentCurrencies;
    },
    getShopCurrenciesFailure: (state, action) => {
      state.statusGetShopCurrencies = 'failure'
    },
    getThemeAppExtensionStatusRequest: (state, action) => {
      state.statusGetThemeAppExtensionStatus= 'loading';
    },
    getThemeAppExtensionStatusSuccess: (state, action) => {
      state.statusGetThemeAppExtensionStatus = 'success';
      state.appExtensionActived = action.payload.appExtensionActived;
    },
    getThemeAppExtensionStatusFailure: (state, action) => {
      state.statusGetThemeAppExtensionStatus = 'failure';
    }
  },
});

export const initialReducer = initializationSlice.reducer;

export const { getShopCurrenciesFailure, getShopCurrenciesRequest, getShopCurrenciesSuccess, getThemeAppExtensionStatusFailure, getThemeAppExtensionStatusRequest, getThemeAppExtensionStatusSuccess, initialFailure, initialSuccess } = initializationSlice.actions;

// export const reducerInitialization = createReducer<State, Actions>(defaultState, [
//   handleAction('@InitializationPage/initializationRequest', ({ state, action }) => {
//     const { appBridge } = action.payload;
//     return {
//       ...state,
//       statusInitialization: 'loading',
//       isInvalidToken: false,
//       appBridge,
//     };
//   }),
//   handleAction('@InitializationPage/initializationSucess', ({ state, action }) => {
//     const {
//       themeId,
//       appExtensionActived,
//       email,
//       shopDomain,
//       currencyCode,
//       currencyFormats,
//       enabledPresentmentCurrencies,
//     } = action.payload;
//     return {
//       ...state,
//       statusInitialization: 'success',
//       shopDomain,
//       email,
//       appExtensionActived,
//       themeId,
//       currencyCode,
//       currencyFormats,
//       enabledPresentmentCurrencies,
//     };
//   }),
//   handleAction('@InitializationPage/initializationFailure', ({ state, action }) => {
//     const { isInvalidToken } = action.payload;
//     return {
//       ...state,
//       statusInitialization: 'failure',
//       isInvalidToken,
//     };
//   }),
//   handleAction('@Initialzation/getShopCurrenciesRequest', ({ state }) => {
//     return {
//       ...state,
//       statusGetShopCurrencies: 'loading',
//     };
//   }),
//   handleAction('@Initialzation/getShopCurrenciesSuccess', ({ state, action }) => {
//     const { currencyCode, currencyFormats, enabledPresentmentCurrencies } = action.payload;
//     return {
//       ...state,
//       statusGetShopCurrencies: 'success',
//       currencyCode,
//       currencyFormats,
//       enabledPresentmentCurrencies,
//     };
//   }),
//   handleAction('@Initialzation/getShopCurrenciesFailure', ({ state }) => {
//     return {
//       ...state,
//       statusGetShopCurrencies: 'failure',
//     };
//   }),
//   handleAction('@InitializationPage/getThemeAppExtensionStatusRequest', ({ state }) => {
//     return {
//       ...state,
//       statusGetThemeAppExtensionStatus: 'loading',
//     };
//   }),
//   handleAction('@InitializationPage/getThemeAppExtensionStatusSuccess', ({ state, action }) => {
//     return {
//       ...state,
//       statusGetThemeAppExtensionStatus: 'success',
//       appExtensionActived: action.payload.appExtensionActived,
//     };
//   }),
//   handleAction('@InitializationPage/getThemeAppExtensionStatusFailure', ({ state }) => {
//     return {
//       ...state,
//       statusGetThemeAppExtensionStatus: 'failure',
//     };
//   }),
// ]);
