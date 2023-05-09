import '../../assets/styles/dashboard/NewsDashboard.scss';
import moment from 'moment';
import noImage from '../../assets/images/no_photo.png';
import { Cryptocurrency } from '../../types/cryptocurrencies/cryptocurrencies.types';
import { CryptocurrencyNews } from '../../types/cryptocurrencies/news.types';
import { Link } from 'react-router-dom';
import { LoaderContext } from '../../context/LoaderContext';
import { SelectedCryptocurrencyContext } from '../../context/SelectedCryptocurrencyContext';
import { ToastNotificationContext } from '../../context/ToastNotificationContext';
import { useContext, useEffect } from 'react';
import { useCryptocurrenciesQuery } from '../../api/cryptocurrencies/cryptocurrencies.service';
import { useNewsQuery } from '../../api/cryptocurrencies/news.service';

export const NewsDashboard: React.FC = () => {
  const { newsCategory, handleSelectCryptocurrency, activeUuid } = useContext(
    SelectedCryptocurrencyContext,
  );
  const { setActiveLoader } = useContext(LoaderContext);
  const { showToastNotification } = useContext(ToastNotificationContext);

  //Fetching data
  const {
    data: newsData,
    isLoading: newsIsLoading,
    isError: newsIsError,
  } = useNewsQuery(newsCategory);

  const {
    data: cryptocurrenciesData,
    isLoading: cryptocurrenciesIsLoading,
    isError: cryptocurrenciesIsError,
  } = useCryptocurrenciesQuery('24h', 1, 'marketCap', 'desc', 50, 1);

  useEffect(() => {
    if (cryptocurrenciesIsLoading || newsIsLoading) {
      setActiveLoader(true);
    } else {
      setActiveLoader(false);
    }
  }, [cryptocurrenciesIsLoading, newsIsLoading]);

  useEffect(() => {
    if (cryptocurrenciesIsError || newsIsError) {
      showToastNotification('something went wrong!', 'error');
    }
  }, [cryptocurrenciesIsError, newsIsError]);

  return (
    <div className="crypto-news-dashboard">
      <div className="crypto-news-header-and-select">
        <h2>Crypto News</h2>
        <select onChange={(e) => [handleSelectCryptocurrency(e.target.value)]}>
          {cryptocurrenciesData?.data?.map(
            (currency: Cryptocurrency, i: number) =>
              currency?.uuid === activeUuid ? (
                <option
                  value={currency.name + '//' + currency.uuid}
                  key={i}
                  selected>
                  {currency.name}
                </option>
              ) : (
                <option value={currency.name + '//' + currency.uuid} key={i}>
                  {currency.name}
                </option>
              ),
          )}
        </select>
      </div>

      <div className="news-dashboard-element-wrapper">
        {newsData?.data?.map((news: CryptocurrencyNews, i: number) => (
          <div className="news-dashboard-element" key={i}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <img
                className="news-dashboard-element-img"
                src={news?.image?.thumbnail?.contentUrl || noImage}
                alt="photography of the article"
              />
              <div className="news-dashboard-element-information-wrapper">
                <p className="news-dashboard-element-header">
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
        {newsData?.data?.length === 0 && (
          <p className="empty-crypto-news-info-dashboard">
            We currently do not have any news
          </p>
        )}
        <Link to="/news">
          <button className="news-dashboard-button">Show all</button>
        </Link>
      </div>
    </div>
  );
};
