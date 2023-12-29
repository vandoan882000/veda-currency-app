import { initializationSlice } from "~/reducers/reducerInitialization";



export const initializationActions = initializationSlice.actions;

// import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
// import type { AppBridge, State } from '~/type';

// export const initialization = createAsyncAction([
//   '@InitializationPage/initializationRequest',
//   '@InitializationPage/initializationSucess',
//   '@InitializationPage/initializationFailure',
// ])<
//   { appBridge: AppBridge },
//   Pick<
//     Required<State>,
//     | 'appExtensionActived'
//     | 'email'
//     | 'shopDomain'
//     | 'themeId'
//     | 'currencyCode'
//     | 'currencyFormats'
//     | 'enabledPresentmentCurrencies'
//   >,
//   { isInvalidToken: boolean }
// >();

// export const getShopCurrencies = createAsyncAction([
//   '@Initialzation/getShopCurrenciesRequest',
//   '@Initialzation/getShopCurrenciesSuccess',
//   '@Initialzation/getShopCurrenciesFailure',
// ])<
//   { onSuccess?: () => void },
//   Pick<Required<State>, 'currencyCode' | 'currencyFormats' | 'enabledPresentmentCurrencies'>,
//   undefined
// >();

// export const getThemeAppExtensionStatus = createAsyncAction([
//   '@InitializationPage/getThemeAppExtensionStatusRequest',
//   '@InitializationPage/getThemeAppExtensionStatusSuccess',
//   '@InitializationPage/getThemeAppExtensionStatusFailure',
// ])<undefined, { appExtensionActived: boolean }, undefined>();

// export const useInitialization = createDispatchAsyncAction(initialization);
// export const useGetShopCurrencies = createDispatchAsyncAction(getShopCurrencies);
// export const useGetThemeAppExtension = createDispatchAsyncAction(getThemeAppExtensionStatus);
