import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ListImage from '../components/ListImage/ListImage';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const [ImageUpdate, setImageUpdate] = React.useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log('mounted');
      getData().then();
    } else if (isFocused === false) {
      console.log('unmounted from navigate upload ');
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uploadFromHome');
      const item = {uri: value, id: Math.floor(Math.random() * 100)};
      if (item.uri !== null) {
        setImageUpdate([...ImageUpdate, item]);
        console.log('value', ImageUpdate);
        await AsyncStorage.clear();
      } else {
        console.log("'unfocused'");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const renderImage = ({item}) => {
    return <ListImage src={{uri: item.uri}} />;
  };
  return (
    <View style={styles.container}>
      <View>
        <SafeAreaView style={styles.ListImage}>
          <FlatList
            data={ImageUpdate}
            numColumns={3}
            renderItem={renderImage}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('uploadPage')}
          style={[styles.btnStyle, styles.elevation]}>
          <View>
            <Icon name="add" size={22} style={styles.TextbtnStyle} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
    height: '100%',
    marginVertical: 40,
  },
  btnContainer: {
    flexDirection: 'column',
    width: '100%',
    marginHorizontal: 10,
  },
  btnStyle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginRight: 5,
    backgroundColor: '#00f69c',
    bottom: 0,
  },
  TextbtnStyle: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  ListImage: {
    height: '90%',
  },
});
