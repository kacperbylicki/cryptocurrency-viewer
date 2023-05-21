import '../assets/styles/LiveChart.scss';
import { Chart } from '../components/charts/Chart';
import { Cryptocurrency } from '../types/cryptocurrencies/cryptocurrencies.types';
import { Loader } from '../components/Loader';
import { SelectedCryptocurrencyContext } from '../context/SelectedCryptocurrencyContext';
import { ToastNotificationContext } from '../context/ToastNotificationContext';
import { useContext, useEffect, useState } from 'react';
import { useCryptocurrenciesQuery } from '../api/cryptocurrencies/cryptocurrencies.service';
import { useGetCryptocurrencyByUuidQuery } from '../api/cryptocurrencies/getCryptocurrencyByUuid.service';
import { useGetCryptocurrencyHistoryQuery } from '../api/cryptocurrencies/getCryptocurrencyHistory';

export const LiveChart = () => {
  const timePeriodsArr = ['24h', '7d', '30d'];
  const [timePeriod, setTimePeriod] = useState<string>('24h');
  const prices = [];
  const timestamps = [];
  const { handleSelectCryptocurrency, activeUuid } = useContext(
    SelectedCryptocurrencyContext,
  );
  const { showToastNotification } = useContext(ToastNotificationContext);

  //Fetching data
  const {
    data: cryptocurrenciesData,
    isLoading: cryptocurrenciesIsLoading,
    isError: cryptocurrenciesIsError,
  } = useCryptocurrenciesQuery('24h', 1, 'marketCap', 'desc', 50, 0);

  const {
    data: cryptocurrencyByUuidData,
    isLoading: cryptocurrencyByUuidLoading,
    isError: cryptocurrencyByUuidError,
  } = useGetCryptocurrencyByUuidQuery(activeUuid, timePeriod);

  const {
    data: cryptocurrencyHistoryData,
    isLoading: cryptocurrencyHistoryLoading,
    isError: cryptocurrencyHistoryError,
  } = useGetCryptocurrencyHistoryQuery(activeUuid, timePeriod);

  useEffect(() => {
    if (
      cryptocurrenciesIsError ||
      cryptocurrencyByUuidError ||
      cryptocurrencyHistoryError
    ) {
      showToastNotification('something went wrong!', 'error');
    }
  }, [
    cryptocurrenciesIsError,
    cryptocurrencyByUuidError,
    cryptocurrencyHistoryError,
  ]);

  // Adding elements from API to price and timestamp array
  if (cryptocurrencyHistoryData?.data) {
    for (let i = 0; i < cryptocurrencyHistoryData.data.history.length; i++) {
      prices.unshift(cryptocurrencyHistoryData.data.history[i].price);
    }

    for (let i = 0; i < cryptocurrencyHistoryData.data.history.length; i++) {
      if (timePeriod === '24h') {
        timestamps.unshift(
          new Date(
            cryptocurrencyHistoryData.data.history[i].timestamp?.low * 1000,
          ).toLocaleTimeString(),
        );
      } else {
        timestamps.unshift(
          new Date(
            cryptocurrencyHistoryData.data.history[i].timestamp?.low * 1000,
          ).toLocaleDateString(),
        );
      }
    }
  }

  return (
    <section className="live-chart">
      <div className="search-and-header-container-chart">
        <div className="live-chart-header">
          <h2>Live Chart</h2>
        </div>
        <select
          className="search-chart-cryptocurrency"
          onChange={(e) => [handleSelectCryptocurrency(e.target.value)]}>
          {cryptocurrenciesData?.data?.map((crypto: Cryptocurrency) =>
            crypto?.uuid === activeUuid ? (
              <option
                key={crypto?.name}
                value={crypto?.name + '//' + crypto?.uuid}
                selected>
                {crypto?.name}
              </option>
            ) : (
              <option
                key={crypto?.name}
                value={crypto?.name + '//' + crypto?.uuid}>
                {crypto?.name}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="live-chart-element-wrapper">
        <div className="select-and-current-price-container">
          <select
            className="time-period-select"
            onChange={(e) => [setTimePeriod(e.target.value)]}>
            {timePeriodsArr?.map((data: string) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <p>
            {cryptocurrencyByUuidData?.data
              ? parseFloat(cryptocurrencyByUuidData?.data?.price) < 1
                ? `Current price: $${
                    Math.round(
                      parseFloat(cryptocurrencyByUuidData?.data?.price) *
                        1000000,
                    ) / 1000000
                  }`
                : `Current price: $${
                    Math.round(
                      parseFloat(
                        cryptocurrencyByUuidData?.data?.price as string,
                      ) * 10,
                    ) / 10
                  }`
              : null}
          </p>
        </div>
        <div className="live-chart-area">
          <Chart prices={prices} timestamps={timestamps} />
        </div>
      </div>
      {(cryptocurrenciesIsLoading ||
        cryptocurrencyByUuidLoading ||
        cryptocurrencyHistoryLoading) && <Loader />}
    </section>
  );
};
