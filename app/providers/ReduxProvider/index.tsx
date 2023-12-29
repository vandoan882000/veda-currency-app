import type { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '~/store/configureStore';

export const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
