import React from 'react';
import {Text as RNText} from 'react-native';

export const Typography = props => {
  return (
    <RNText
      style={{
        color: props.color ?? 'black',
        fontSize: props.fontSize ?? 10,
      }}
      numberOfLines={props.numberOfLines}>
      {props.children}
    </RNText>
  );
};
