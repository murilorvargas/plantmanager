import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

import grinningFaceWithSmilingEyesImg from '../assets/grinning-face-with-smiling-eyes.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function Confirmation() {
  const navigation = useNavigation();

  function handleMoveOn() {
    navigation.navigate('PlantSelect' as any);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={grinningFaceWithSmilingEyesImg} style={styles.emoji} />
        <Text style={styles.title}>
          Prontinho
        </Text>
        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button title="Começar" onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  emoji: {
  },
  title: {
    marginTop: 64,
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subtitle: {
    marginTop: 16,
    fontSize: 17,
    lineHeight: 25,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: 'center',
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 40,
  }
})