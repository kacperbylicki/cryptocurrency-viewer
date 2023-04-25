import React from 'react';
import { ClockIcon } from '../components/icons/ClockIcon';
import { HomeIcon } from '../components/icons/HomeIcon';
import { NewsIcon } from '../components/icons/NewsIcon';
import { RankingIcon } from '../components/icons/RankingIcon';
import { StatisticIcon } from '../components/icons/StatisticIcon';

export type Route = {
  path: string;
  label: string;
  icon: React.ElementType;
};

export const routes: Route[] = [
  {
    path: '/',
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
