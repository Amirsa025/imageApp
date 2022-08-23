import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {deg} from 'react-native-linear-gradient-degree';
import Icon from 'react-native-vector-icons/Feather';
import {UseImage} from '../context/ImageContext';
import { useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Upload = ({navigation, route}) => {
  const {image} = UseImage();
  const [pickedImage, setPickedImage] = useState();
  const [gallery, setGallery] = useState([]);
  const [isShow, setIsShow] = React.useState(false);


  const isFocused = useIsFocused();
  useEffect(() => {
    console.log('updating page');
    if (isFocused) {
      checkPermission().then(() => getPhotos().then());
    } else {
      console.log('unmount');
    }
  }, [isFocused]);

  const uploadPage = async () => {
    if (pickedImage === undefined) {
      console.log('nothing image for upload');
      return false;
    }
    await AsyncStorage.setItem('uploadFromHome', pickedImage);
    navigation.navigate('Home');
  };
  const goToHome = async () => {
    navigation.navigate('Home');
  };
  //camera Roll
  const checkPermission = async () => {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (hasPermission) {
      console.log(hasPermission);
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        buttonPositive: 'OK',
      },
    );

    return status === 'granted';
  };
  const getPhotos = async () => {
    await CameraRoll.getPhotos({
      first: 1000,
      assetType: 'All',
    }).then(photo => setGallery(photo.edges));
  };
  const renderImage = ({item, id}) => {
    const handlePressImage = () => {
      const image = item.node.image.uri;
      setPickedImage(image);
      setIsShow(true);
    };
    return (
      <TouchableOpacity
        style={styles.PressImageCLick}
        onPress={handlePressImage}>
        <Image
          key={id}
          source={{uri: item.node.image.uri}}
          style={styles.ImageContainer}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <TouchableOpacity onPress={() => uploadPage()}>
          <Icon name="arrow-left" size={28} color="#004aff" />
        </TouchableOpacity>
        <LinearGradient
          style={styles.boxStyle}
          colors={['#004aff', '#00e4f6', '#26f600']}
          {...deg(231)}>
          <TouchableOpacity onPress={() => goToHome()}>
            <Icon name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.ImagePreViewBoxContainer}>
        <Image
          style={styles.ImagePreViewContainer}
          source={{uri: isShow ? pickedImage : image[0]}}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cameraStyle}>
        <View style={styles.cropBtnContainer}>
          <LinearGradient
            style={styles.cropButton34}
            colors={['#ababab', '#6a6a6a', '#6d6d6d']}
            {...deg(90)}
            {...deg(90)}>
            <TouchableOpacity>
              <Text style={styles.TextCrop}>3:4</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            style={styles.cropButton169}
            colors={['#26f600', '#00e4f6', '#004aff']}
            {...deg(90)}>
            <TouchableOpacity>
              <Text style={styles.TextCrop}>1:1</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            style={styles.cropButton11}
            colors={['#ababab', '#6a6a6a', '#6d6d6d']}
            {...deg(90)}>
            <TouchableOpacity>
              <Text style={styles.TextCrop}>16:9</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('camera')}>
          <Icon name="camera" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.listUpload}>
        <SafeAreaView style={styles.ListImage}>
          <FlatList data={gallery} numColumns={3} renderItem={renderImage} />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Upload;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
    height: '100%',
    marginTop: 0,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 30,
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  boxStyle: {
    width: 30,
    height: 30,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  cropBtnContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  cropButton169: {
    width: 30,
    height: 25,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  cropButton34: {
    width: 30,
    height: 45,
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  cropButton11: {
    width: 50,
    height: 25,
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  TextCrop: {
    color: 'white',
    fontSize: 10,
  },
  listUpload: {
    height: 500,
    width: '100%',
    marginHorizontal: 10,
  },
  ListImage: {
    width: '100%',
    marginBottom: 20,
    marginTop: 5,
  },
  ImageContainer: {
    width: '85%',
    height: 100,
    marginHorizontal: 20,
    resizeMode: 'cover',
    borderRadius: 8,
    marginVertical: 2,
  },
  PressImageCLick: {
    width: '30%',
    flexDirection: 'row',
  },
  ImagePreViewContainer: {
    height: 400,
    width: '90%',
    borderRadius: 15,
  },
  ImagePreViewBoxContainer: {
    marginTop: 100,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
});
