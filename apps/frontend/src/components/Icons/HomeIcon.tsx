import { BiHomeAlt } from 'react-icons/bi';

export type IconStyleProps = {
  currentLocation?: string;
  color?: string;
  pathname?: string;
};

export const HomeIcon = (props: IconStyleProps) => (
  <BiHomeAlt
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
