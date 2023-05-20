import '../assets/styles/News.scss';
import moment from 'moment';
import noImage from '../assets/images/no_photo.png';
import { Cryptocurrency } from '../types/cryptocurrencies/cryptocurrencies.types';
import { CryptocurrencyNews } from '../types/cryptocurrencies/news.types';
import { Loader } from '../components/Loader';
import { SelectedCryptocurrencyContext } from '../context/SelectedCryptocurrencyContext';
import { ToastNotificationContext } from '../context/ToastNotificationContext';
import { useContext, useEffect } from 'react';
import { useCryptocurrenciesQuery } from '../api/cryptocurrencies/cryptocurrencies.service';
import { useNewsQuery } from '../api/cryptocurrencies/news.service';

export const News = () => {
  const { newsCategory, handleSelectCryptocurrency, activeUuid } = useContext(
    SelectedCryptocurrencyContext,
  );
  const { showToastNotification } = useContext(ToastNotificationContext);

  //Fetching data
  const {
    data: cryptocurrenciesData,
    isLoading: cryptocurrenciesIsLoading,
    isError: cryptocurrenciesIsError,
  } = useCryptocurrenciesQuery('24h', 1, 'marketCap', 'desc', 50, 1);

  const {
    data: newsData,
    isLoading: newsIsLoading,
    isError: newsIsError,
  } = useNewsQuery(newsCategory, 100);

  useEffect(() => {
    if (cryptocurrenciesIsError || newsIsError) {
      showToastNotification('something went wrong!', 'error');
    }
  }, [cryptocurrenciesIsError, newsIsError]);

  return (
    <section className="news">
      <div className="search-and-header-wrapper">
        <div className="news-header">
          <h2>Cryptocurrency news</h2>
        </div>
        <select
          className="search-cryptocurrency"
          onChange={(e) => [handleSelectCryptocurrency(e.target.value)]}>
          {cryptocurrenciesData?.data?.map((currency: Cryptocurrency) =>
            currency?.uuid === activeUuid ? (
              <option
                key={currency?.uuid}
                value={currency?.name + '//' + currency?.uuid}
                selected>
                {currency?.name}
              </option>
            ) : (
              <option
                key={currency?.uuid}
                value={currency?.name + '//' + currency?.uuid}>
                {currency?.name}
              </option>
            ),
          )}
        </select>
      </div>
      <div className="news-element-wrapper">
        {newsData?.data?.map((news: CryptocurrencyNews, i: number) => (
          <div className="news-element" key={i}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <img
                className="news-element-img"
                src={news?.image?.thumbnail?.contentUrl || noImage}
                alt="photography of the article"
              />
              <div className="news-element-information-wrapper">
                <p className="news-element-header">
                  {(news?.description ?? '').length > 80
                    ? `${(news?.description ?? '').substring(0, 80)}...`
                    : news?.description ?? ''}
                </p>

                <p className="publication-time">
                  {moment(news.datePublished).startOf('seconds').fromNow()}
                </p>
              </div>
            </a>
          </div>
        ))}
        {!newsData?.data?.length &&
          (!cryptocurrenciesIsLoading || !newsIsLoading) && (
            <p className="empty-crypto-news-info">
              We currently do not have any news
            </p>
          )}
      </div>
      {(cryptocurrenciesIsLoading || newsIsLoading) && <Loader />}
    </section>
  );
};
