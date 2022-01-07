import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface EnvironmentButtonProps extends TouchableOpacityProps {
  title: string;
  active?: boolean;
}

const EnvironmentButton: React.FC<EnvironmentButtonProps> = ({ title, active = false, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.container, active && styles.containerActive]} {...rest}>
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginRight: 4
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    fontSize: 13,
    lineHeight: 23,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
})

export default EnvironmentButton;