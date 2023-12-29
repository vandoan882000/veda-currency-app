import { watchGetShopCurrencies } from "./watchGetShopCurrencies";
import { watchGetThemeAppExtensionStatus } from "./watchGetThemeAppExtensionStatus";
import { watchInitialization } from "./watchInitialization";


export const sagasInitializationPage = [watchInitialization, watchGetShopCurrencies, watchGetThemeAppExtensionStatus];
