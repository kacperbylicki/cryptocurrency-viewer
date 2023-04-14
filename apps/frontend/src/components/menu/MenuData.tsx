import React from 'react';
import { ClockIcon } from '../icons/ClockIcon';
import { HomeIcon } from '../icons/HomeIcon';
import { NewsIcon } from '../icons/NewsIcon';
import { RankingIcon } from '../icons/RankingIcon';
import { StatisticIcon } from '../icons/StatisticIcon';

export type MenuDataItem = {
  path: string;
  label: string;
  icon: React.ElementType;
};

export const menuData: MenuDataItem[] = [
  {
    path: '/cryptocurrency-viewer',
    label: 'Dashboard',
    icon: HomeIcon,
  },
  {
    path: '/live-chart',
    label: 'Live Chart',
    icon: ClockIcon,
  },
  {
    path: '/statistics',
    label: 'Statistics',
    icon: StatisticIcon,
  },
  {
    path: '/ranking',
    label: 'Ranking',
    icon: RankingIcon,
  },
  {
    path: '/news',
    label: 'News',
    icon: NewsIcon,
  },
];
