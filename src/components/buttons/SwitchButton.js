import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

export default function SwitchButton() {
  const [isEnabled, setIsEnabled] = useState(false);
  function toggleSwitch () {
    setIsEnabled(previousState => !previousState);
  }
  return (
    <View>
      <Switch
        trackColor={{false: '#161c26', true: '#f4f3f4'}}
        thumbColor={isEnabled ? '#161c26' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({

});
