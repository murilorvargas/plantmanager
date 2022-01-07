import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../services/api';

import Header from '../components/Header';
import EnvironmentButton from '../components/EnvironmentButton';
import Load from '../components/Load';
import PlantCardPrimary from '../components/PlantCardPrimary';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: string[],
  frequency: {
    times: number;
    repeat_every: string;
  }
}

const PlantSelect: React.FC = () => {
  const navigation = useNavigation();

  const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  async function fetchPlants() {
    const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

    if (!data)
      return setLoading(true)

    if (page > 1) {
      setPlants(oldValue => [...oldValue, ...data])
      setFilteredPlants(oldValue => [...oldValue, ...data])
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoadingMore(false);
    setLoading(false);
  }

  function handleEnvironmentSelected(key: string) {
    setEnvironmentSelected(key)

    if (key === 'all') {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter(plant => plant.environments.includes(key));

    setFilteredPlants(filtered)
  }

  function handleFetchMore(distance: number) {
    if (distance < 1)
      return

    setLoadingMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave' as never, { plant } as never);
  }

  useEffect(() => {
    async function fetchEnvironment() {
      const { data } = await api.get('plants_environments?_sort=title&_order=asc');
      setEnvironment([
        {
          key: 'all',
          title: 'Todos'
        },
        ...data
      ]);
    }
    fetchEnvironment();
  }, [])

  useEffect(() => {
    fetchPlants();
  }, [])

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList data={environment} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.environmentList} renderItem={({ item }) => (
          <EnvironmentButton
            key={item.key}
            title={item.title}
            active={item.key === environmentSelected}
            onPress={() => handleEnvironmentSelected(item.key)}
            activeOpacity={1}
          />
        )} />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.plantList}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
          renderItem={({ item }) => (
            <PlantCardPrimary key={String(item.id)} data={item} onPress={() => handlePlantSelect(item)} />
          )}
          ListFooterComponent={loadingMore ? <ActivityIndicator color={colors.green} /> : <></>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 23,
    color: colors.heading,
    fontFamily: fonts.text
  },
  environmentList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginVertical: 32,
    paddingHorizontal: 32,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  plantList: {

  }
})

export default PlantSelect;