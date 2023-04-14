import { AiOutlineClockCircle } from 'react-icons/ai';
import { IconStyleProps } from '../../types/icon-style-props';

export const ClockIcon = (props: IconStyleProps) => (
  <AiOutlineClockCircle
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
