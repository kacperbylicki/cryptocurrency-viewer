import '../assets/styles/dashboard/Dashboard.scss';
import { AbbreviatedStatistics } from '../components/dashboard/AbbreviatedStatistics';
import { AuthContext } from '../context/AuthContext';
import { Cryptocurrency } from '../types/cryptocurrencies/cryptocurrencies.types';
import { LoaderContext } from '../context/LoaderContext';
import { NewsDashboard } from '../components/dashboard/NewsDashboard';
import { ToastNotificationContext } from '../context/ToastNotificationContext';
import { useContext, useEffect } from 'react';
import { useCryptocurrenciesQuery } from '../api/cryptocurrencies/cryptocurrencies.service';
import { useGetFavouriteCryptocurrenciesQuery } from '../api/cryptocurrencies/getFavoriteCryptocurrencies.service';

export const Dashboard = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { setActiveLoader } = useContext(LoaderContext);
  const { showToastNotification } = useContext(ToastNotificationContext);

  //Fetching data
  const {
    data: cryptocurrenciesData,
    isLoading: cryptocurrenciesIsLoading,
    isError: cryptocurrenciesIsError,
  } = useCryptocurrenciesQuery('24h', 1, 'marketCap', 'desc', 50, 1);

  const {
    data: favoriteCryptocurrenciesData,
    isLoading: favoriteCryptocurrenciesIsLoading,
    isError: favoriteCryptocurrenciesIsError,
    refetch: refetchFavouriteCryptocurrencies,
  } = useGetFavouriteCryptocurrenciesQuery(
    accessToken || '',
    'getFavouriteCryptocurrencies',
  );

  useEffect(() => {
    if (accessToken) {
      refetchFavouriteCryptocurrencies();
    }
  }, [accessToken, refetchFavouriteCryptocurrencies]);

  useEffect(() => {
    if (cryptocurrenciesIsLoading || favoriteCryptocurrenciesIsLoading) {
      setActiveLoader(true);
    } else {
      setActiveLoader(false);
    }
  }, [cryptocurrenciesIsLoading, favoriteCryptocurrenciesIsLoading]);

  useEffect(() => {
    if (cryptocurrenciesIsError || favoriteCryptocurrenciesIsError) {
      showToastNotification('something went wrong!', 'error');
    }
  }, [cryptocurrenciesIsError, favoriteCryptocurrenciesIsError]);

  return (
    <section className="dashboard">
      <div className="dashboard-left-area">
        <div className="dashboard-top-bar">
          {user ? <p>{`Welcome ${user.username}`}</p> : <p>Welcome</p>}
          <h2>Dashboard</h2>
        </div>
        <div className="abbreviated-statistics-wrapper">
          {favoriteCryptocurrenciesData?.data?.length === 0 && user ? (
            <p className="empty-favorite-cryptocurrencies">
              You currently do not have any favorite cryptocurrencies, go to the
              Ranking section and add them to your profile using stars
            </p>
          ) : user?.email ? (
            favoriteCryptocurrenciesData?.data?.map((data: any) =>
              data?.isFavorite &&
              Object.keys(data?.cryptocurrency || {}).length > 0 ? (
                <AbbreviatedStatistics
                  name={data?.cryptocurrency.name}
                  symbol={data?.cryptocurrency.symbol}
                  price={data?.cryptocurrency.price}
                  iconUrl={data?.cryptocurrency.iconUrl}
                  change={data?.cryptocurrency.change}
                  rank={data?.cryptocurrency.rank}
                  key={data?.cryptocurrency.uuid}
                />
              ) : null,
            )
          ) : (
            cryptocurrenciesData?.data
              ?.slice(0, 9)
              .map((data: Cryptocurrency) => (
                <AbbreviatedStatistics
                  name={data?.name}
                  symbol={data?.symbol}
                  price={data?.price}
                  iconUrl={data?.iconUrl}
                  change={data?.change}
                  rank={data?.rank}
                  key={data?.rank}
                />
              ))
          )}
        </div>
      </div>
      <div className="dashboard-right-area">
        <NewsDashboard />
      </div>
    </section>
  );
};
