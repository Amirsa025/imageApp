import React, {useState, useEffect} from 'react';
import {View, PermissionsAndroid, Platform} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const Camera = ({navigation}) => {
  const [file, setFiles] = useState({});
  useEffect(() => {
    captureImage('photo').then();
  }, []);
  //permittions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const camera = PermissionsAndroid.PERMISSIONS.CAMERA;
        const granted = PermissionsAndroid.request(camera, {
          title: 'camera permission',
          message: 'App needs camera permission',
        });
        const result = await PermissionsAndroid.RESULTS.GRANTED;
        return granted === result;
      } catch (err) {
        console.log(err);
        return false;
      }
    } else {
      return true;
    }
  };
  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        console.warn('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };
  //capture
  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    const isCameraPermission = await requestPermissions();
    const isStoragePermitted = await requestExternalWritePermission();
    if ((isCameraPermission, isStoragePermitted)) {
      await ImagePicker.launchCamera(options, response => {
        console.log('response' + response);
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return false;
        } else if (response.errorCode === 'camera_unavailable') {
          console.log('Camera not available on device');
        } else if (response.errorCode === 'permission') {
          console.log('Permission not satisfied');
          return false;
        } else if (response.errorCode === 'others') {
          console.log(response.errorMessage);
          return false;
        }
        setFiles(response);
        navigation.goBack();
      });
    }
  };
  return <View />;
};

export default Camera;
