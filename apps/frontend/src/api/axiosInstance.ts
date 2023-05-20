import axios from 'axios';

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

  const logoutUser = () => {
    localStorage.setItem('access_token', '');
    localStorage.setItem('refresh_token', '');
    localStorage.setItem('user', '');
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
        } catch (err) {
          logoutUser();
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
