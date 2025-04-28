import React, {FC, ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Metrix, Colors, Fonts, Images, FontType, Utills} from '../../config';
import {CustomText} from '..';

export type PrimaryButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  width?: number | string;
  color?: string;
  textColor?: string;
  customStyles?: StyleProp<ViewStyle>;
  fontSize?: any;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  width = '100%',
  color = Utills.selectedThemeColors().Primary,
  textColor = Utills.selectedThemeColors().Base,
  customStyles,
  fontSize = FontType.FontMedium,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: disabled
            ? Utills.selectedThemeColors().TextInputPlaceholderColor
            : color,
          width: width,
        },
        customStyles,
      ]}
      disabled={disabled || isLoading}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <CustomText.LargeSemiBoldText
          customStyle={{
            color: textColor,
            fontSize: fontSize,
            fontWeight: '500',
          }}>
          {title}
        </CustomText.LargeSemiBoldText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: Metrix.VerticalSize(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrix.VerticalSize(100),
    marginVertical: Metrix.VerticalSize(10),
  },
});
