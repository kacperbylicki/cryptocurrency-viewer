import axios, { AxiosError } from 'axios';

export function createAxiosInstance(handleRefreshToken: () => Promise<void>) {
  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  const processQueue = (error: AxiosError | null, token: string | null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await handleRefreshToken();
          const newToken = localStorage.getItem('access_token');
          axiosInstance.defaults.headers.common['Authorization'] =
            'Bearer ' + newToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
          processQueue(null, newToken);
          return axiosInstance(originalRequest);
        } catch (err) {
          processQueue(error as AxiosError, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
