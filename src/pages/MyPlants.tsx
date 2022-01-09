import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale'

import { deletePlant, loadPlant, PlantProps } from '../libs/storage';
import Header from '../components/Header';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Load from '../components/Load';

import waterDropImg from '../assets/waterdrop.png';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const MyPlants: React.FC = () => {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState('');

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      if (plantsStoraged.length) {
        const nextTime = formatDistance(
          new Date(plantsStoraged[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: pt }
        )

        setNextWaterd(`Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}.`);
        setMyPlants(plantsStoraged);
        setLoading(false);
      } else {
        setLoading(true)
      }
    }

    loadStorageData();
  }, [myPlants])

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterDropImg} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary data={item} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    paddingHorizontal: 20,
    color: colors.blue,
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
})

export default MyPlants;