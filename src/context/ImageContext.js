import React, {createContext, useContext, useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
const ImagePicker = createContext();

const ImagePickerProvider = ({children}) => {
  const [imageData] = React.useState([
    {
      title: 'Image1',
      src: require('../Assets/Image/aleisha-kalina-DQ_17uY9fjw-unsplash.jpg'),
    },
    {
      title: 'Image2',
      src: require('../Assets/Image/raamin-ka-uR51HXLO7G0-unsplash.jpg'),
    },
    {
      title: 'Image3',
      src: require('../Assets/Image/tamara-bellis-JoKS3XweV50-unsplash.jpg'),
    },
    {
      title: 'Image4',
      src: require('../Assets/Image/aleisha-kalina-DQ_17uY9fjw-unsplash.jpg'),
    },
    {
      title: 'Image5',
      src: require('../Assets/Image/raamin-ka-uR51HXLO7G0-unsplash.jpg'),
    },
    {
      title: 'Image6',
      src: require('../Assets/Image/tamara-bellis-JoKS3XweV50-unsplash.jpg'),
    },
    {
      title: 'Image7',
      src: require('../Assets/Image/aleisha-kalina-DQ_17uY9fjw-unsplash.jpg'),
    },
    {
      title: 'Image8',
      src: require('../Assets/Image/raamin-ka-uR51HXLO7G0-unsplash.jpg'),
    },
    {
      title: 'Image9',
      src: require('../Assets/Image/tamara-bellis-JoKS3XweV50-unsplash.jpg'),
    },
  ]);
  const [data, setData] = useState([]);
  useEffect(() => {
    checkPermission().then(() => getPhotos());
  }, []);
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
      first: 10,
    }).then(photo => setData(photo.edges));
  };
  return (
    <ImagePicker.Provider value={{imageData, data}}>
      {children}
    </ImagePicker.Provider>
  );
};

export const UseImage = () => useContext(ImagePicker);

export default ImagePickerProvider;
