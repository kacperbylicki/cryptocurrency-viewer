import '../assets/styles/Ranking.scss';
import { AuthContext } from '../context/AuthContext';
import { Cryptocurrency } from '../types/cryptocurrencies/cryptocurrencies.types';
import { FavouriteCryptocurrency } from '../types/cryptocurrencies/favouriteCryptocurrencies.types';
import { Link } from 'react-router-dom';
import { LoaderContext } from '../context/LoaderContext';
import { RiArrowDropDownLine, RiStarLine } from 'react-icons/ri';
import { SelectedCryptocurrencyContext } from '../context/SelectedCryptocurrencyContext';
import { ToastNotificationContext } from '../context/ToastNotificationContext';
import { useContext, useEffect, useState } from 'react';
import { useCryptocurrenciesQuery } from '../api/cryptocurrencies/cryptocurrencies.service';
import { useGetFavouriteCryptocurrenciesQuery } from '../api/cryptocurrencies/getFavoriteCryptocurrencies.service';
import { useQueryClient } from 'react-query';
import { useToggleFavoriteCryptocurrencyMutation } from '../api/cryptocurrencies/toggleFavoriteCryptocurrency.service';

export const Ranking = () => {
  const [rankingToggle, setRankingToggle] = useState<boolean>(true);
  const { handleSelectCryptocurrency } = useContext(
    SelectedCryptocurrencyContext,
  );
  const { accessToken } = useContext(AuthContext);
  const { setActiveLoader } = useContext(LoaderContext);
  const { showToastNotification } = useContext(ToastNotificationContext);
  const queryClient = useQueryClient();

  const toggleFavoriteMutation = useToggleFavoriteCryptocurrencyMutation(
    accessToken!,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('getFavouriteCryptocurrencies');
      },
      onError: (error) => {
        if (error?.status === 401) {
          showToastNotification(
            'this option is only available to logged in users!',
            'warning',
          );
        } else {
          showToastNotification('something went wrong!', 'error');
        }
      },
    },
  );

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
    if (favoriteCryptocurrenciesIsLoading || cryptocurrenciesIsLoading) {
      setActiveLoader(true);
    } else {
      setActiveLoader(false);
    }
  }, [favoriteCryptocurrenciesIsLoading, cryptocurrenciesIsLoading]);

  useEffect(() => {
    if (cryptocurrenciesIsError || favoriteCryptocurrenciesIsError) {
      showToastNotification('something went wrong!', 'error');
    }
  }, [cryptocurrenciesIsError, favoriteCryptocurrenciesIsError]);

  const updateFavoriteCryptocurrencies = (
    cryptocurrency: FavouriteCryptocurrency,
  ) => {
    toggleFavoriteMutation.mutate(cryptocurrency);
  };

  const sorting = () => {
    setRankingToggle(!rankingToggle);
    const array = cryptocurrenciesData;
    array?.data?.reverse();
  };

  return (
    <section className="ranking">
      <div className="ranking-header">
        <h2>Ranking</h2>
      </div>
      <div className="ranking-table">
        <div className="ranking-table-header">
          <div></div>
          <div className="ranking-sort" onClick={() => sorting()}>
            <p>#</p>
            <RiArrowDropDownLine
              className={
                rankingToggle ? 'RiArrowDropUpLine' : 'RiArrowDropDownLine'
              }
            />
          </div>
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>Price</p>
          </div>
        </div>
        <div className="ranking-list-wrapper" role="ranking-list">
          {cryptocurrenciesData?.data?.map(
            (cryptocurrency: Cryptocurrency, i: number) => {
              const matchingData = favoriteCryptocurrenciesData?.data?.find(
                (data: any) =>
                  cryptocurrency?.uuid === data?.cryptocurrency?.uuid &&
                  data.isFavorite,
              );
              const isFavorite = !!matchingData;

              const handleClick = () => {
                if (isFavorite) {
                  updateFavoriteCryptocurrencies({
                    cryptocurrency,
                    isFavorite: false,
                  });
                } else {
                  updateFavoriteCryptocurrencies({
                    cryptocurrency,
                    isFavorite: true,
                  });
                }
              };

              return (
                <div
                  className="ranking-list-element"
                  role="ranking-list-element"
                  onClick={() =>
                    handleSelectCryptocurrency(
                      cryptocurrency?.name + '//' + cryptocurrency?.uuid,
                    )
                  }
                  key={i}>
                  <div
                    className="star-icon"
                    role="favorite-icon"
                    onClick={handleClick}>
                    {isFavorite ? (
                      <RiStarLine className="active" />
                    ) : (
                      <RiStarLine />
                    )}
                  </div>
                  <Link
                    to="/statistics"
                    className="ranking-list-element-link"
                    key={cryptocurrency?.rank}>
                    <div className="item-number">
                      <p>{cryptocurrency?.rank}</p>
                    </div>
                    <div className="item-name">
                      <img src={cryptocurrency?.iconUrl} alt="" />
                      <p>{cryptocurrency?.name}</p>
                      <p>{cryptocurrency?.symbol}</p>
                    </div>
                    <div className="item-price">
                      <p>
                        {parseFloat(cryptocurrency?.price) < 1
                          ? `${
                              Math.round(
                                parseFloat(cryptocurrency?.price) * 1000000,
                              ) / 1000000
                            }$`
                          : `${
                              Math.round(
                                parseFloat(cryptocurrency?.price) * 100,
                              ) / 100
                            }$`}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};
