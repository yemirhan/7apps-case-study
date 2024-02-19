import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Character } from '../types/character.types';
import Entypo from '@expo/vector-icons/Entypo';

type SelectedBadgeProps = {
  deselect: () => void;
  children: React.ReactNode;
};
export const SelectedBadge = (props: SelectedBadgeProps) => {
  return (
    <Pressable
      onPress={props.deselect}
      className="p-1 rounded flex flex-row items-center gap-1 bg-slate-200 ">
      <Text className="text-black font-medium">{props.children}</Text>
      <View className="p-px ml-1 rounded bg-slate-400 flex items-center justify-center">
        <Entypo name="cross" size={20} color="white" />
      </View>
    </Pressable>
  );
};
