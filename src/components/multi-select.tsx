import React, { BaseSyntheticEvent, useState } from 'react';
import { Character } from '../types/character.types';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { SearchItem } from './search-item';
import { SearchBar } from './search-bar';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { SelectedBadge } from './selected-badge';

type BaseType = { id: number; name: string };
export const useMultiSelect = <T extends BaseType>() => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Map<number, T>>(new Map());
  const [open, setOpen] = useState(false);
  const [toggleHeight, setToggleHeight] = useState(0);

  return {
    search,
    setSearch,
    selected,
    setSelected,
    open,
    setOpen,
    toggleHeight,
    setToggleHeight,
  };
};
type UseMultiSelectReturn<T extends BaseType> = ReturnType<typeof useMultiSelect<T>>;
type MultiSelectProps<T extends BaseType> = {
  data: T[];
  item: ListRenderItem<T>;
  query: UseInfiniteQueryResult<unknown, Error>;
  ToggleComponent: React.ReactNode;
} & UseMultiSelectReturn<T>;
export const MultiSelect = <T extends BaseType>(props: MultiSelectProps<T>) => {
  return (
    <Pressable onPressOut={() => props.setOpen?.(false)}>
      <View className="relative">
        {props.ToggleComponent}
        <View
          style={{
            top: props.toggleHeight + 8,
          }}
          className={`
        w-full absolute
        transition-all duration-300 h-96
        ${props.open ? 'opacity-100' : 'opacity-0'}
        `}>
          <View className="flex-1 bg-white rounded-md border-2 border-slate-400 px-2">
            <FlashList
              onEndReached={() => {
                if (props.query.hasNextPage && !props.query.isFetchingNextPage) {
                  props.query.fetchNextPage();
                }
              }}
              refreshing={props.query.isFetching}
              onRefresh={() => {
                props.query.refetch();
              }}
              refreshControl={
                <RefreshControl
                  refreshing={props.query.isFetching}
                  onRefresh={() => {
                    props.query.refetch();
                  }}
                />
              }
              extraData={props.selected}
              ItemSeparatorComponent={() => <View className="h-px bg-slate-200" />}
              estimatedItemSize={71}
              renderItem={props.item}
              data={props.data}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};
