import React, { useEffect } from 'react';
import { Keyboard, Pressable, TextInput, View, ViewProps } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
type SearchBarProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  setOpen?: (open: boolean) => void;
  open?: boolean;
} & ViewProps;
export const SearchBar = ({ value, onValueChange, children, ...props }: SearchBarProps) => {
  return (
    <View
      style={{
        minHeight: 56,
        alignItems: 'center',
      }}
      {...props}
      className="p-4 min-h-14 transition-all h-auto items-center flex flex-row flex-wrap gap-2 border border-slate-400 rounded-md bg-slate-100 ">
      <View className="flex-1 flex flex-row flex-wrap gap-2">
        <View className="flex empty:hidden flex-row flex-wrap gap-1">{children}</View>
        <TextInput
          value={value}
          onChangeText={onValueChange}
          placeholder="Search"
          onFocus={() => props.setOpen?.(true)}
          // onBlur={() => props.setOpen?.(false)}
          style={{
            height: 26,
            minWidth: 100,
          }}
          className="min-w-14 flex-grow flex-shrink-0"
        />
      </View>
      <Pressable
        className={`transition-all ${props.open ? 'transform rotate-180' : 'transform rotate-0'}`}
        onPress={() => {
          if (props.setOpen) props.setOpen(!props.open);
        }}>
        <Entypo name="chevron-down" size={20} color="black" />
      </Pressable>
    </View>
  );
};
