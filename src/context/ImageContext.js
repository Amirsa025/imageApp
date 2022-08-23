import React, {createContext, useContext, useEffect, useState} from 'react';
const ImagePicker = createContext();
const ImagePickerProvider = ({children}) => {
  const [data, setData] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [image, setImage] = useState([]);

  return (
    <ImagePicker.Provider value={{gallery, data, image, setImage}}>
      {children}
    </ImagePicker.Provider>
  );
};

export const UseImage = () => useContext(ImagePicker);

export default ImagePickerProvider;
