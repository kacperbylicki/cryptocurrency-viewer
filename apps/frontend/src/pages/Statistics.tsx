import '../assets/styles/Statistics.scss';
import { Cryptocurrency } from '../types/cryptocurrencies/cryptocurrencies.types';
import { FiMaximize2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { RiMedalFill } from 'react-icons/ri';
import { SelectedCryptocurrencyContext } from '../context/SelectedCryptocurrencyContext';
import { SmallChart } from '../components/charts/SmallChart';
import { ToastNotificationContext } from '../context/ToastNotificationContext';
import { formatNumber } from '../helpers/formatUtils';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useCryptocurrenciesQuery } from '../api/cryptocurrencies/cryptocurrencies.service';
import { useGetCryptocurrencyByUuidQuery } from '../api/cryptocurrencies/getCryptocurrencyByUuid.service';

export const Statistics = () => {
  const [lowestPrice, setLowestPrice] = useState<number>();
  const [highestPrice, setHighestPrice] = useState<number>();
  const [timePeriod, setTimePeriod] = useState<string>('24h');
  const prices: number[] = [];
  const { handleSelectCryptocurrency, activeUuid } = useContext(
    SelectedCryptocurrencyContext,
  );
  const { showToastNotification } = useContext(ToastNotificationContext);
  const timePeriodOptions = ['24h', '7d', '30d'];

  //Fetching data
  const { data: cryptocurrenciesData, isError: cryptocurrenciesIsError } =
    useCryptocurrenciesQuery('24h', 1, 'marketCap', 'desc', 50, 0);

  const { data: cryptocurrencyByUuidData, isError: cryptocurrencyByUuidError } =
    useGetCryptocurrencyByUuidQuery(activeUuid, timePeriod);

  useEffect(() => {
    if (cryptocurrenciesIsError || cryptocurrencyByUuidError) {
      showToastNotification('something went wrong!', 'error');
    }
  }, [cryptocurrenciesIsError, cryptocurrencyByUuidError]);

  // Adding elements from API to array
  if (cryptocurrencyByUuidData?.data?.sparkline?.length)
    for (
      let i = 0;
      i < cryptocurrencyByUuidData?.data?.sparkline?.length;
      i++
    ) {
      prices.unshift(Number(cryptocurrencyByUuidData?.data?.sparkline[i]));
    }

  // Determining the highest and lowest price
  const determiningHighestPrice = useCallback(() => {
    const validPrices = prices.filter((price) => !isNaN(price));
    if (validPrices.length > 0) {
      validPrices.sort((a: number, b: number) => b - a);
      setHighestPrice(parseFloat(String(validPrices[0])));
    } else {
      setHighestPrice(0);
    }
  }, [prices]);

  const determiningLowestPrice = useCallback(() => {
    const validPrices = prices.filter((price) => !isNaN(price));
    if (validPrices.length > 0) {
      validPrices.sort((a: number, b: number) => a - b);
      setLowestPrice(parseFloat(String(validPrices[0])));
    } else {
      setLowestPrice(0);
    }
  }, [prices]);

  useEffect(() => {
    determiningHighestPrice();
    determiningLowestPrice();
  }, [determiningHighestPrice, determiningLowestPrice]);

  return (
    <section className="statistics">
      <div className="statistics-header-wrapper" role="statistics-header">
        <div className="statistics-header">
          <h2>Statistics</h2>
        </div>
        <select
          className="select-cryptocurrency"
          role="select-cryptocurrency"
          onChange={(e) => [handleSelectCryptocurrency(e.target.value)]}>
          {cryptocurrenciesData?.data?.map((coin: Cryptocurrency) =>
            coin?.uuid === activeUuid ? (
              <option
                key={coin?.rank}
                value={coin?.name + '//' + coin?.uuid}
                selected>
                {coin?.name}
              </option>
            ) : (
              <option key={coin?.rank} value={coin?.name + '//' + coin?.uuid}>
                {coin?.name}
              </option>
            ),
          )}
        </select>
      </div>

      <main className="statistics-main-container">
        <div className="price" role="price">
          {cryptocurrencyByUuidData?.data ? (
            <>
              <div>
                <img
                  src={cryptocurrencyByUuidData?.data?.iconUrl}
                  alt="Coin logo"
                />
                <p>
                  {cryptocurrencyByUuidData?.data?.name}{' '}
                  {cryptocurrencyByUuidData?.data?.symbol}
                </p>
              </div>
              <p className="price-txt">
                {cryptocurrencyByUuidData?.data ? (
                  formatNumber(
                    parseFloat(cryptocurrencyByUuidData?.data?.price ?? '0'),
                  )
                ) : (
                  <Loader />
                )}
              </p>
            </>
          ) : (
            <Loader />
          )}
        </div>
        <div className="height24h" role="height24h">
          <div className="height24h-header">
            <MdArrowDropUp />
            <p>Height 24h</p>
          </div>

          <p className="height24h-value">
            {highestPrice ? formatNumber(highestPrice) : <Loader />}
          </p>
        </div>
        <div className="low24h" role="low24h">
          <div className="low24h-header">
            <MdArrowDropDown />
            <p>Low 24h</p>
          </div>
          <p className="low24h-value">
            {lowestPrice ? formatNumber(lowestPrice) : <Loader />}
          </p>
        </div>
        <div className="rank" role="rank">
          <div className="rank-header">
            <RiMedalFill />
            <p>Rank</p>
          </div>
          {cryptocurrencyByUuidData?.data?.rank ? (
            <p className="rank-value">{cryptocurrencyByUuidData?.data?.rank}</p>
          ) : (
            <Loader />
          )}
        </div>
        <div className="bottom-area-container">
          <div
            className="live-chart-statistics-container"
            role="live-chart-statistics-container">
            <div className="live-chart-statistics-header">
              <p>Live chart last 24h</p>
              <Link to="/live-chart">
                <FiMaximize2 />
              </Link>
            </div>
            <div className="live-chart-statistics">
              {prices?.length !== 0 ? (
                <SmallChart prices={prices} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="market-cap-and-percent-change">
            <div className="market-cap" role="market-cap">
              <div>
                <p className="market-cap-header">Market cap</p>
              </div>
              {cryptocurrencyByUuidData?.data?.marketCap ? (
                <p className="market-cap-value">
                  {`$${cryptocurrencyByUuidData?.data?.marketCap}`}
                </p>
              ) : (
                <Loader />
              )}
            </div>
            <div className="percent-change" role="percent-change">
              <div>
                <p className="percent-change-header">Percent change</p>
                <select
                  className="select-percent-change"
                  onChange={(e) => setTimePeriod(e.target.value)}>
                  {timePeriodOptions.map((option: string, i: number) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <p className="percent-change-value">
                {cryptocurrencyByUuidData ? (
                  formatNumber(
                    parseFloat(cryptocurrencyByUuidData?.data?.change ?? '0'),
                    true,
                  )
                ) : (
                  <Loader />
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
