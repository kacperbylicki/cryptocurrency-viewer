import '../../assets/styles/dashboard/AbbreviatedStatistics.scss';
import { Loader } from '../Loader';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { formatNumber } from '../../helpers/formatUtils';

type AbbreviatedStatisticsProps = {
  name: string;
  price: string;
  symbol: string;
  iconUrl: string;
  change: string;
  rank: number;
};

export const AbbreviatedStatistics = ({
  name,
  price,
  symbol,
  iconUrl,
  change,
  rank,
}: AbbreviatedStatisticsProps) => {
  return (
    <div className="abbreviated-statistics" role="abbreviated-statistics">
      <div className="abbreviated-statistics-container">
        <div className="cryptocurrency-name-and-icon">
          <img src={iconUrl} alt="" />
          <p>
            {name} {symbol}
          </p>
        </div>
        <div className="cryptocurrency-price">
          {price ? <p>{formatNumber(parseFloat(price ?? '0'))}</p> : <Loader />}
        </div>
        <div className="other-statistics">
          <div className="volume-24h">
            <p>24h%</p>
            {parseFloat(change) < 0 ? (
              <div>
                <MdArrowDropDown
                  style={{ color: '#ff3572' }}
                  role="arrow-down"
                />
                <p style={{ color: '#ff3572' }}>{change}%</p>
              </div>
            ) : (
              <div>
                <MdArrowDropUp style={{ color: '#1fc2a0' }} role="arrow-up" />
                <p style={{ color: '#1fc2a0' }}>{change}%</p>
              </div>
            )}
          </div>
          <div className="rank">
            <p>Rank</p>
            <div>
              <p>{rank}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
