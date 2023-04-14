import { BiNews } from 'react-icons/bi';
import { IconStyleProps } from '../../types/icon-style-props';

export const NewsIcon = (props: IconStyleProps) => (
  <BiNews
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
