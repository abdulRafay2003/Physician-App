import React, {ReactNode} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {CustomText, MainContainer, PrimaryButton} from '..';
import {Metrix, Utills} from '../../config';
import {PrimaryButtonProps} from '../PrimaryButton';

type AuthHeaderProps = PrimaryButtonProps & {
  heading: string;
  paragraph?: string;
  children: ReactNode;
  disabled?: boolean;
  isBtn?: boolean;
  title?: string;
  onPress: () => void;
  customStyles?: any;
};

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  heading,
  paragraph,
  children,
  disabled,
  title,
  onPress,
  isBtn,
  customStyles,
}) => {
  // const {Colors} = useThemeHook();

  return (
    <MainContainer customeStyle={{paddingHorizontal: 0}}>
      <View style={styles.topContainer}>
        <CustomText.ExtraLargeBoldText customStyle={styles.heading}>
          {heading}
        </CustomText.ExtraLargeBoldText>
        <CustomText.RegularText
          isSecondaryColor
          customStyle={styles.subHeading}>
          {paragraph}
        </CustomText.RegularText>
      </View>
      <View style={styles.childrenView}>
        <View style={styles.childrenContainer}>{children}</View>
        <View
          style={[
            styles.bottomContainer,
            !isBtn && {justifyContent: 'flex-end'},
          ]}>
          {isBtn && (
            <PrimaryButton
              title={title}
              customStyles={customStyles}
              disabled={disabled}
              onPress={onPress}
            />
          )}
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    alignItems: 'center',
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  heading: {
    fontWeight: '700',
    marginVertical: Metrix.VerticalSize(10),
  },
  subHeading: {
    textAlign: 'center',
    width: '90%',
    fontWeight: '500',
  },
  bottomContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(20),
  },
  childrenView: {
    marginVertical: Metrix.VerticalSize(20),
    flex: 4,
    justifyContent: 'space-between',
  },
  childrenContainer: {
    // borderWidth: 1,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(10),
    borderRadius: Metrix.HorizontalSize(30),
    backgroundColor: Utills.selectedThemeColors().Base,
    ...Metrix.cardShadow,
  },
});
