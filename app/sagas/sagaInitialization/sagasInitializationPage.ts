import { watchGetShopCurrencies } from "./watchGetShopCurrencies";
import { watchGetThemeAppExtensionStatus } from "./watchGetThemeAppExtensionStatus";


export const sagasInitializationPage = [watchGetShopCurrencies, watchGetThemeAppExtensionStatus];
