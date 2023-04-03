import { BiHomeAlt } from 'react-icons/bi';
import { IconStyleProps } from '../../types/IconStyleProps';

export const HomeIcon = (props: IconStyleProps) => (
  <BiHomeAlt
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
