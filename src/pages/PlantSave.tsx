import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

import { PlantProps, plantSave } from '../libs/storage';
import Button from '../components/Button';

import waterDropImg from '../assets/waterdrop.png';

import fonts from '../styles/fonts';
import colors from '../styles/colors';


interface Params {
  plant: PlantProps;
}

const PlantSave: React.FC = () => {
  const navigation = useNavigation();

  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert("Escolha uma hora no futuro! ⏰")
    }

    if (dateTime)
      setSelectedDateTime(dateTime)
  }

  function handleOpenDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave() {
    try {
      await plantSave({
        ...plant,
        dateTimeNotification: selectedDateTime
      })

      navigation.navigate('Confirmation' as never, {
        title: 'Tudo certo',
        subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
        buttonTitle: 'Muito obrigado :D',
        icon: 'hug',
        nextScreen: 'MyPlants'
      } as never);
    } catch {
      Alert.alert("Não foi possível cadastrar a planta. 😥")
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri={plant.photo} height={150} width={150} />
        <Text style={styles.plantName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>{plant.about}</Text>
      </View>
      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterDropImg} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (<DateTimePicker value={selectedDateTime} mode="time" display="spinner" onChange={handleChangeTime} />)}

        {Platform.OS === 'android' && (
          <View style={styles.selectedDateTime}>
            <Text style={styles.selectedDateTimeText}>{format(selectedDateTime, 'HH:mm')}</Text>
            <TouchableOpacity onPress={handleOpenDateTimePickerForAndroid} style={styles.selectedDateTimeButton}>
              <Text style={styles.selectedDateTimeButtonText}>Mudar</Text>
            </TouchableOpacity>
          </View>
        )}

        <Button title="Cadastrar planta" onPress={handleSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  plantName: {
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  tipContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.blue_light,
    padding: 20,
    position: 'relative',
    bottom: 75,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  selectedDateTime: {
    alignItems: 'center',
  },
  selectedDateTimeText: {
    width: '100%',
    textAlign: 'center',
    color: colors.heading,
    fontSize: 36,
    fontFamily: fonts.text,
  },
  selectedDateTimeButton: {
    backgroundColor: colors.green,
    marginBottom: 40,
    height: 28,
    width: '30%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateTimeButtonText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,
    fontFamily: fonts.text,
  }
})

export default PlantSave;