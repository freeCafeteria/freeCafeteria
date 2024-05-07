import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export const Icon = props => {
  return <Ionicons name={props.name} size={props.size} color={props.color} />;
};
