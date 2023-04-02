import { RiMedalFill } from 'react-icons/ri';

export type IconStyleProps = {
  currentLocation?: string;
  color?: string;
  pathname?: string;
};

export const RankingIcon = (props: IconStyleProps) => (
  <RiMedalFill
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);