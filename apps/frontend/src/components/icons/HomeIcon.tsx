import { BiHomeAlt } from 'react-icons/bi';
import { IconStyleProps } from '../../types/icon-style-props';

export const HomeIcon = (props: IconStyleProps) => (
  <BiHomeAlt
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
