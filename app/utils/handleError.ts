import { notification } from 'antd';
import { AxiosError } from 'axios';

export interface ErrorData {
  code: number;
  message: string;
  status: string;
}

export function handleError<T extends AxiosError<ErrorData> | Error>(error: T) {
  if ((error as AxiosError).isAxiosError) {
    const _error = error as AxiosError<ErrorData>;
    notification.error({
      duration: 10,
      message: _error.response?.data.message ?? _error.message,
    });
  } else {
    notification.error({
      duration: 10,
      message: error.message,
    });
  }
}
