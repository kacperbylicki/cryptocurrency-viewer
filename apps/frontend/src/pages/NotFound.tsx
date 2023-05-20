import '../assets/styles/NotFound.scss';
import Lottie, { LottieProps } from 'react-lottie';
import animation from '../assets/animations/animation.json';

export const NotFound = () => {
  const lottieOptions: LottieProps['options'] = {
    animationData: animation,
  };

  return (
    <section className="not-found">
      <div className="not-found-content">
        <p className="not-found-title">404</p>
        <p className="not-found-message">Oops! Page not found</p>
        <p className="not-found-description">
          Sorry, but the page you are looking for is not found. Please, make
          sure you have typed the current URL.
        </p>
      </div>
      <div className="animation">
        <Lottie options={lottieOptions} />
      </div>
    </section>
  );
};
