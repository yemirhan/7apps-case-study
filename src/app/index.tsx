import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Stack, Link } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { get } from '~/api/get';
import { SearchItem } from '~/src/components/search-item';
import { MultiSelect, useMultiSelect } from '../components/multi-select';

function useGetCharacters({ search }: { search: string }) {
  return useInfiniteQuery({
    queryKey: [get.characters.queryKey, search],
    queryFn: async ({ pageParam }) => {
      return await get.characters.queryFn({ page: pageParam, search });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.next) {
        return undefined;
      }
      const url = new URL(lastPage.info.next);
      const page = Number(url.searchParams.get('page'));
      if (page > 3) return undefined;
      return page;
    },
  });
}

export default function Page() {
  const multiSelect = useMultiSelect();
  const characters = useGetCharacters({
    search: multiSelect.search,
  });

  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Overview' }} />
      <View className={styles.main}>
        <MultiSelect
          {...multiSelect}
          query={characters}
          item={(item) => <SearchItem key={item.index} data={item.item} />}
          data={characters.data?.pages.flatMap((e) => e.results) ?? []}
        />
      </View>
    </View>
  );
}

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960] justify-between',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
