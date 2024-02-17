import React, { useState } from 'react';
import { Character } from '../types/character.types';
import { ScrollView, View } from 'react-native';
import { SearchItem } from './search-item';
import { SearchBar } from './search-bar';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
export const useMultiSelect = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Map<number, Character>>(new Map());
  return { search, setSearch, selected, setSelected };
};

type UseMultiSelectReturn = ReturnType<typeof useMultiSelect>;
type MultiSelectProps<T> = {
  data: T[];
  item: ListRenderItem<T>;
  query: UseInfiniteQueryResult<InfiniteData<unknown, unknown>, Error>;
} & UseMultiSelectReturn;
export const MultiSelect = <T extends { id: number }>(props: MultiSelectProps<T>) => {
  return (
    <View className="flex-1">
      <SearchBar value={props.search} onValueChange={props.setSearch} />
      <FlashList
        onEndReached={() => {
          if (props.query.hasNextPage && !props.query.isFetchingNextPage) {
            props.query.fetchNextPage();
          }
        }}
        estimatedItemSize={71}
        renderItem={props.item}
        data={props.data}
      />
    </View>
  );
};
