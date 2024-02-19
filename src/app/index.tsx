import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Stack, Link } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { get } from '~/api/get';
import {
  SearchItem,
  SearchItemCheckbox,
  SearchItemEpisodeCount,
  SearchItemImage,
  SearchItemText,
} from '~/src/components/search-item';
import { MultiSelect, useMultiSelect } from '../components/multi-select';
import Checkbox from 'expo-checkbox';
import { Character } from '../types/character.types';
import { SearchBar } from '../components/search-bar';
import { SelectedBadge } from '../components/selected-badge';

function useGetCharacters({ search }: { search: string }) {
  return useInfiniteQuery({
    queryKey: [get.characters.queryKey, search],
    queryFn: async ({ pageParam }) => {
      return await get.characters.queryFn({ page: pageParam, search });
    },
    initialPageParam: 0,
    select(data) {
      return data?.pages.flatMap((e) => e.results);
    },
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
  const multiSelect = useMultiSelect<Character>();
  const characters = useGetCharacters({
    search: multiSelect.search,
  });
  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: 'Search Demo' }} />
      <View className={styles.main}>
        <MultiSelect
          ToggleComponent={
            <SearchBar
              onLayout={(e) => {
                multiSelect.setToggleHeight(e.nativeEvent.layout.height);
              }}
              open={multiSelect.open}
              setOpen={multiSelect.setOpen}
              value={multiSelect.search}
              onValueChange={multiSelect.setSearch}>
              {[...multiSelect.selected].map(([key, value]) => (
                <SelectedBadge
                  key={key}
                  deselect={() => {
                    multiSelect.selected.delete(key);
                    multiSelect.setSelected(new Map(multiSelect.selected));
                  }}>
                  {value.name}
                </SelectedBadge>
              ))}
            </SearchBar>
          }
          {...multiSelect}
          query={characters}
          item={({ item, index }) => {
            const hasValue = multiSelect.selected.has(item.id);
            const onSelectedChange = () => {
              if (hasValue) {
                multiSelect.selected.delete(item.id);
              } else {
                multiSelect.selected.set(item.id, item);
              }
              multiSelect.setSearch(multiSelect.search);
              multiSelect.setSelected(new Map(multiSelect.selected));
            };
            return (
              <SearchItem checked={hasValue} onSelectedChange={onSelectedChange} data={item}>
                <SearchItemCheckbox />
                <SearchItemImage />
                <View className="flex flex-col gap-1">
                  <SearchItemText search={multiSelect.search} />
                  <SearchItemEpisodeCount />
                </View>
              </SearchItem>
            );
          }}
          data={characters.data ?? []}
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
