import { AiOutlineClockCircle } from 'react-icons/ai';

export type IconStyleProps = {
  currentLocation?: string;
  color?: string;
  pathname?: string;
};

export const ClockIcon = (props: IconStyleProps) => (
  <AiOutlineClockCircle
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
