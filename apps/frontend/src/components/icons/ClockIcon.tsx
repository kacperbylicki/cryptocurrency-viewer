import { AiOutlineClockCircle } from 'react-icons/ai';
import { IconStyleProps } from '../../types/icon-style-props.types';

export const ClockIcon = (props: IconStyleProps) => (
  <AiOutlineClockCircle
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
