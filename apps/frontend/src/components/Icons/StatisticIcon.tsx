import { AiOutlinePieChart } from 'react-icons/ai';

export type IconStyleProps = {
  currentLocation?: string;
  color?: string;
  pathname?: string;
};

export const StatisticIcon = (props: IconStyleProps) => (
  <AiOutlinePieChart
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
