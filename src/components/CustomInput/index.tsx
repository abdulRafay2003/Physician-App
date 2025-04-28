import {FC, Ref} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
  ImageProps,
} from 'react-native';
import {CustomText} from '..';
import {Fonts, Metrix, Images, Utills} from '../../config';

type CustomInputProps = TextInputProps & {
  customStyle?: TextInputProps['style'];
  onEyePress?: () => void;
  hidepswdState?: boolean;
  eye?: boolean;
  onBtnPress?: () => void;
  iconStyle?: ImageProps['style'];
  error?: string;
  touched?: boolean;
  inputRef?: Ref<TextInput>;
  heading?: string;
  mainContainerStyle?: any;
  editable?: boolean;
};

export const CustomInput: FC<CustomInputProps> = ({
  customStyle,
  onEyePress,
  hidepswdState,
  eye,
  onBtnPress,
  iconStyle = {},
  error,
  touched,
  inputRef,
  heading,
  mainContainerStyle,
  editable = true,
  ...rest
}) => {
  //   const [isFocused, setIsFocused] = useState(false);
  // const {Colors} = useThemeHook();

  return (
    <>
      <View
        style={[
          styles.textContainer,
          {
            backgroundColor: !editable
              ? Utills.selectedThemeColors().Grey
              : Utills.selectedThemeColors().Base,
          },
          mainContainerStyle,
        ]}>
        <TextInput
          selectionColor={Utills.selectedThemeColors().Primary}
          style={[styles.textInput, {width: eye ? '85%' : '100%'}, customStyle]}
          placeholderTextColor={
            Utills.selectedThemeColors().TextInputPlaceholderColor
          }
          ref={inputRef}
          editable={editable}
          {...rest}
        />
        {eye && (
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.eyeStyle}
            onPress={onEyePress}>
            {hidepswdState ? (
              <Image
                source={Images.EyeDisableIcon}
                style={styles.disabledEye}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={Images.EyeAbleIcon}
                style={styles.enabledEye}
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
      {touched && error && (
        <CustomText.SmallText customStyle={styles.errorText}>
          {error}
        </CustomText.SmallText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderWidth: 1.5,
    borderRadius: Metrix.VerticalSize(100),
    height: Metrix.VerticalSize(45),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrix.VerticalSize(10),
    backgroundColor: Utills.selectedThemeColors().TextInputBaseColor,
    borderColor: Utills.selectedThemeColors().Primary,
    alignItems: 'center',
    overflow: 'hidden',
  },
  textInput: {
    color: Utills.selectedThemeColors().PrimaryTextColor,
    fontSize: Metrix.customFontSize(16),
    paddingLeft: Metrix.HorizontalSize(15),
    paddingRight: Metrix.HorizontalSize(5),
    fontFamily: Fonts['Regular'],
    height: '100%',
    // borderWidth: 1,
    // textAlign: I18nManager.forceRTL ? 'left' : 'right',
  },
  eyeStyle: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Utills.selectedThemeColors().TextInputBaseColor,
    borderRadius: Metrix.VerticalSize(10),
  },
  disabledEye: {
    width: '45%',
    height: '45%',
    tintColor: Utills.selectedThemeColors().SecondaryTextColor,
  },
  enabledEye: {
    width: '45%',
    height: '45%',
  },
  errorText: {
    color: Utills.selectedThemeColors().ErrorTextColor,
    marginBottom: Metrix.VerticalSize(15),
    marginLeft: Metrix.HorizontalSize(10),
  },
});
