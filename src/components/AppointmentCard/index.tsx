import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Images, Metrix, Utills} from '../../config';
import {CustomText} from '..';
import {normalizeFont} from '../../config/metrix';

export interface AppointmentCardProps {
  item: {
    id: string;
    title: string;
    time: string;
  };
  customContainerStyle?: ViewStyle;
  onPress?: () => void;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  item,
  customContainerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.cardContainer, customContainerStyle]}>
      <CustomText.SmallText customStyle={styles.cardText}>
        {item?.title}
      </CustomText.SmallText>
      <CustomText.SmallText
        customStyle={[styles.cardText, {fontWeight: 'bold'}]}>
        {item?.time}
      </CustomText.SmallText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    paddingTop: Metrix.VerticalSize(15),
    marginTop: Metrix.VerticalSize(5),
    paddingBottom: Metrix.HorizontalSize(8),
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: Utills.selectedThemeColors().SecondaryTextColor,
  },
  cardText: {
    fontSize: normalizeFont(13),
    fontWeight: '500',
  },
});
