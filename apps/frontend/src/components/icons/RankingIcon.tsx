import { IconStyleProps } from '../../types/icon-style-props.types';
import { RiMedalFill } from 'react-icons/ri';

export const RankingIcon = (props: IconStyleProps) => (
  <RiMedalFill
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
