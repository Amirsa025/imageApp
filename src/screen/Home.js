import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import ListImage from '../components/ListImage/ListImage';
import {UseImage} from '../context/ImageContext';
import Icon from 'react-native-vector-icons/Ionicons';
const Home = ({navigation}) => {
  const {imageData, data} = UseImage();
  console.log('src:', data);
  const renderItem = ({item}) => {
    return <ListImage src={item.src} />;
  };
  return (
    <View style={styles.container}>
      <View>
        <SafeAreaView style={styles.ListImage}>
          <FlatList
            numColumns={3}
            data={imageData}
            renderItem={renderItem}
            keyExtractor={item => item.title}
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
