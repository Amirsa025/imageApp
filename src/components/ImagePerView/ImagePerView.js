import {View, Image, StyleSheet} from 'react-native';
import React from 'react';
const ImagePerView = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.ImageContainer}
        source={require('../../Assets/Image/raamin-ka-uR51HXLO7G0-unsplash.jpg')}
      />
    </View>
  );
};

export default ImagePerView;
const styles = StyleSheet.create({
  ImageContainer: {
    height: 350,
    width: '80%',
    resizeMode: 'center',
    borderRadius: 15,
  },
  container: {
    marginTop: 100,
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
