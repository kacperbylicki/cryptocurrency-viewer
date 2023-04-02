import React from 'react';
import { ClockIcon } from '../Icons/ClockIcon';
import { HomeIcon } from '../Icons/HomeIcon';
import { NewsIcon } from '../Icons/NewsIcon';
import { RankingIcon } from '../Icons/RankingIcon';
import { StatisticIcon } from '../Icons/StatisticIcon';

export interface MenuDataItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

export const menuData: MenuDataItem[] = [
  {
    path: '/cryptocurrency_viewer',
    label: 'Dashboard',
    icon: HomeIcon,
  },
  {
    path: '/live_chart',
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
