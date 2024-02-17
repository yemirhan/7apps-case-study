import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { queryClient } from '~/src/utils/query-client';

type Props = {
  children: React.ReactNode;
};
export const QueryClientProviderWrapper = (props: Props) => {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};
