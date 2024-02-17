import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Character } from '~/src/types/character.types';
import Checkbox from 'expo-checkbox';
import { Image } from 'expo-image';

export type SearchItemProps = {
  data: Character;
};
export const SearchItem = (props: SearchItemProps) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <Pressable
      onPress={() => {
        setChecked(!checked);
      }}>
      <View className={styles.item}>
        <Checkbox value={checked} onValueChange={(e) => setChecked(e)} />
        <SearchItemImage src={props.data.image} />
        <View className="flex flex-col gap-1">
          <SearchItemText name={props.data.name} />
          <SearchItemEpisodeCount count={props.data.episode.length} />
        </View>
      </View>
    </Pressable>
  );
};
type SearchItemImageProps = {
  src: SearchItemProps['data']['image'];
};
const SearchItemImage = (props: SearchItemImageProps) => {
  return (
    <Image
      style={{ width: 50, height: 50, borderRadius: 10 }}
      className="w-12 h-12 rounded"
      source={{ uri: props.src }}
    />
  );
};

type SearchItemEpisodeCountProps = {
  count: SearchItemProps['data']['episode']['length'];
};
const SearchItemEpisodeCount = (props: SearchItemEpisodeCountProps) => {
  return <Text className="text-slate-600 font-medium">{`${props.count} Episodes`}</Text>;
};

type SearchItemTextProps = {
  name: SearchItemProps['data']['name'];
};
const SearchItemText = (props: SearchItemTextProps) => {
  return <Text className="text-xl">{props.name}</Text>;
};

const styles = {
  item: 'px-2 py-4 border-b border-slate-200 space-x-2 flex flex-row w-full items-center',
  checkbox: 'ml-2',
};
