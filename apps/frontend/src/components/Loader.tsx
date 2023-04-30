import '../assets/styles/Loader.scss';
import BeatLoader from 'react-spinners/BeatLoader';

export const Loader = () => (
  <div className="loader">
    <BeatLoader color="#1fc2a0" size={10} />
  </div>
);
