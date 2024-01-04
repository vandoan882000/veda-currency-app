import { initialReducer } from "~/reducers/reducerInitialization";
import { settingsReducer } from "~/reducers/reducerSettings";

export const rootReducers = {
  initialization: initialReducer,
  setting: settingsReducer
};
