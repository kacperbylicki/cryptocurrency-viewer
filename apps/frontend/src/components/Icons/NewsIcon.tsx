import { BiNews } from 'react-icons/bi';

export type IconStyleProps = {
  currentLocation?: string;
  color?: string;
  pathname?: string;
};

export const NewsIcon = (props: IconStyleProps) => (
  <BiNews
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
