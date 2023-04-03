import { AiOutlineClockCircle } from 'react-icons/ai';
import { IconStyleProps } from '../../types/IconStyleProps';

export const ClockIcon = (props: IconStyleProps) => (
  <AiOutlineClockCircle
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
