import React from 'react';
import { TextInput } from 'react-native';

type SearchBarProps = {
  value: string;
  onValueChange: (value: string) => void;
};
export const SearchBar = (props: SearchBarProps) => {
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onValueChange}
      placeholder="Search"
      className="p-2 bg-slate-100 rounded"
    />
  );
};
