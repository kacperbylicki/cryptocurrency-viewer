import '../../assets/styles/dashboard/AbbreviatedStatistics.scss';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

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
    <div className="abbreviated-statistics">
      <div className="abbreviated-statistics-container">
        <div className="cryptocurrency-name-and-icon">
          <img src={iconUrl} alt="" />
          <p>
            {name} {symbol}
          </p>
        </div>
        <div className="cryptocurrency-price">
          <p>${Math.round(parseFloat(price) * 100000) / 100000}</p>
        </div>
        <div className="other-statistics">
          <div className="volume-24h">
            <p>24h%</p>
            {parseFloat(change) < 0 ? (
              <div>
                <MdArrowDropDown style={{ color: '#ff3572' }} />
                <p style={{ color: '#ff3572' }}>{change}%</p>
              </div>
            ) : (
              <div>
                <MdArrowDropUp style={{ color: '#1fc2a0' }} />
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
