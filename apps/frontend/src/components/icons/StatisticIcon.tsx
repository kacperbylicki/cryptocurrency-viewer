import { AiOutlinePieChart } from 'react-icons/ai';
import { IconStyleProps } from '../../types/icon-style-props';

export const StatisticIcon = (props: IconStyleProps) => (
  <AiOutlinePieChart
    style={
      props.currentLocation === props.pathname
        ? { color: props.color }
        : undefined
    }
  />
);
