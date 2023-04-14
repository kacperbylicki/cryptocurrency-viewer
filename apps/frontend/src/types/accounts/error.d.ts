import { AxiosError } from 'axios';

export interface ErrorResponse extends AxiosError {
  data: {
    error: string[];
    status: number;
  };
}
