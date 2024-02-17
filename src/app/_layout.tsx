import { QueryClientProviderWrapper } from '~/src/providers/query-client-provider';
import '../../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <QueryClientProviderWrapper>
      <Stack />
    </QueryClientProviderWrapper>
  );
}
