import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgFromUri } from 'react-native-svg';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface PlantCardPrimaryProps extends TouchableOpacityProps {
  data: {
    name: string;
    photo: string;
  }
}

const PlantCardPrimary: React.FC<PlantCardPrimaryProps> = ({ data, ...rest }) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: 'center',
    margin: 8,

  },
  text: {
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 8,
  }
})

export default PlantCardPrimary;