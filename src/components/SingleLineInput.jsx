import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

export const SingleLineInput = props => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.inputContainer, { borderColor: focused ? '#4285F4' : '#dfe1e5' }]}>
      <TouchableOpacity onPress={props.onSearchPress}>
        <Icon name="search" size={27} color="#5f6368" />
      </TouchableOpacity>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        onSubmitEditing={props.onSubmitEditing}
        style={styles.textInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor="#80868b"
      />
      <TouchableOpacity onPress={props.onVoicePress}>
        <Icon name="mic" size={27} color="#5f6368" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row', 
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    fontSize: 18,
    flex: 1, 
    marginLeft: 10, 
    marginRight: 10, 
    color: '#202124',
  },
});