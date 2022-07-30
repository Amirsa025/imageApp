import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import Upload from './src/screen/upload';
import ImagePickerProvider from './src/context/ImageContext';
import CameraScreen from './src/screen/camera';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <ImagePickerProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{headerShown: false}}>
            {props => <Home {...props} />}
          </Stack.Screen>
          <Stack.Screen name="uploadPage" options={{headerShown: false}}>
            {props => <Upload {...props} />}
          </Stack.Screen>
          <Stack.Screen name="camera" options={{headerShown: false}}>
            {props => <CameraScreen {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </ImagePickerProvider>
    </NavigationContainer>
  );
}
