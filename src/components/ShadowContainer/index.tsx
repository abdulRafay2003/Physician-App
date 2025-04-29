import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {Images, Metrix, Utills} from '../../config';

export interface ShadowContainerProps {
  children: React.ReactNode;
}

export const ShadowContainer: React.FC<ShadowContainerProps> = ({children}) => {
  return <View style={[styles.mainContainer]}>{children}</View>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Metrix.VerticalSize(15),
    paddingVertical: Metrix.VerticalSize(10),
    borderRadius: Metrix.VerticalSize(30),
    backgroundColor: Utills.selectedThemeColors().Base,
    shadowColor: '#000000',
    shadowOffset: {
      width: Metrix.HorizontalSize(3),
      height: Metrix.VerticalSize(5),
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: Metrix.VerticalSize(10),
  },
});
