import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const ListImage = ({src}) => {
  return (
    <>
      <View style={styles.ListImage}>
        <Image style={styles.ImageContainer} source={src} />
      </View>
    </>
  );
};

export default ListImage;
const styles = StyleSheet.create({
  ListImage: {
    marginVertical: 10,
    marginTop: 10,
    marginHorizontal: 15,
  },
  ImageContainer: {
    width: 100,
    height: 100,
    resizeMode: 'center',
    borderRadius: 8,
    marginVertical: 2,
  },
});
