import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Character } from '~/src/types/character.types';
import Checkbox from 'expo-checkbox';
import { Image } from 'expo-image';

export type SearchItemProps = {
  data: Character;
  children: React.ReactNode;
  onSelectedChange: () => void;
  checked: boolean;
};
const SearchItemContext = React.createContext<Omit<SearchItemProps, 'children'> | undefined>(
  undefined
);
export const SearchItemProvider = (props: SearchItemProps) => {
  return <SearchItemContext.Provider value={props}>{props.children}</SearchItemContext.Provider>;
};
const useSearchItem = () => {
  const context = React.useContext(SearchItemContext);
  if (context === undefined) {
    throw new Error('useSearchItem must be used within a SearchItemProvider');
  }
  return context;
};
export const SearchItem = ({ children, ...props }: SearchItemProps) => {
  return (
    <SearchItemProvider
      checked={props.checked}
      data={props.data}
      onSelectedChange={props.onSelectedChange}>
      <Pressable onPress={props.onSelectedChange}>
        <View className="px-2 py-4 space-x-2 flex flex-row w-full items-center">{children}</View>
      </Pressable>
    </SearchItemProvider>
  );
};
export const SearchItemCheckbox = () => {
  const { onSelectedChange, checked } = useSearchItem();
  return <Checkbox value={checked} onValueChange={onSelectedChange} />;
};
export const SearchItemImage = () => {
  const {
    data: { image },
  } = useSearchItem();
  return (
    <Image
      style={{ width: 50, height: 50, marginHorizontal: 8, borderRadius: 10 }}
      className="w-12 mx-1 h-12 rounded"
      source={{ uri: image }}
    />
  );
};

export const SearchItemEpisodeCount = () => {
  const {
    data: { episode },
  } = useSearchItem();
  return <Text className="text-slate-600 font-medium">{`${episode.length} Episodes`}</Text>;
};

export const SearchItemText = ({ search }: { search: string }) => {
  const {
    data: { name },
  } = useSearchItem();
  if (search.length > 0) {
    const index = name.toLowerCase().indexOf(search.toLowerCase());
    if (index !== -1) {
      return (
        <Text className='text-xl'>
          {name.slice(0, index)}
          <Text className="font-bold">{name.slice(index, index + search.length)}</Text>
          {name.slice(index + search.length)}
        </Text>
      );
    }
  }
  return <Text className="text-xl">{name}</Text>;
};
