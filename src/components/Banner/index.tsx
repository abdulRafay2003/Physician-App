import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Images, Metrix, Utills} from '../../config';

export const Banner: React.FC<any> = () => {
  return (
    <View style={[styles.mainContainer]}>
      <Image
        source={Images.Logo}
        style={styles.logoImage}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-end',
    width: '100%',
    alignSelf: 'center',
    paddingTop: Metrix.VerticalSize(50),
    borderRadius: Metrix.VerticalSize(40),
    backgroundColor: Utills.selectedThemeColors().Base,
    shadowColor: '#000000',
    shadowOffset: {
      width: Metrix.HorizontalSize(3),
      height: Metrix.VerticalSize(5),
    },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: Metrix.VerticalSize(10),
  },
  logoImage: {
    width: '100%',
    height: Metrix.VerticalSize(75),
  },
});
