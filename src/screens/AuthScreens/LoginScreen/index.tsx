import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {
  AuthHeader,
  Banner,
  CustomInput,
  CustomText,
  FadeInImage,
  Loader,
} from '../../../components';
import {Formik} from 'formik';
import {LoginScreenProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions} from '../../../redux/actions';
import {RootState} from '../../../redux/reducers';
import {t} from 'i18next';

export const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector((state: RootState) => state.home.userDetails);

  const isFingerprint: boolean = true;
  // console.log('========Login', userDetails);
  let passwordRef = useRef<TextInput>(null!);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        fcm_token: 'fcm',
        platform_id: 1,
      }}
      onSubmit={values => {
        console.log('Vslues', values);
        dispatch(AuthActions.loginSuccess(true));
      }}
      // validationSchema={Schema.LoginSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <ImageBackground
          source={Images.BackgroundImage}
          style={styles.backgroundImage}>
          <Banner />
          <AuthHeader
            heading={t('Sign In')}
            title={t('Sign In')}
            paragraph="Please enter your email and password to log in to your account"
            customStyles={styles.buttonContainer}
            isBtn
            onPress={() => handleSubmit()}>
            <CustomInput
              heading={t('email')}
              placeholder={t('enter_mail')}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              value={values?.email}
              error={errors?.email}
              touched={touched?.email}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <CustomInput
              heading={t('password')}
              placeholder={t('enter_your_password')}
              value={values?.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              error={errors?.password}
              touched={touched?.password}
              secureTextEntry={hidePassword}
              hidepswdState={hidePassword}
              eye
              onEyePress={() => {
                if (values?.password) {
                  setHidePassword(prev => !prev);
                }
              }}
              returnKeyType="done"
              inputRef={passwordRef}
            />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                width: Metrix.HorizontalSize(50),
                height: Metrix.HorizontalSize(50),
                borderRadius: Metrix.HorizontalSize(100),
                padding: 5,
                marginVertical: Metrix.VerticalSize(5),
                alignSelf: 'center',
              }}>
              <FadeInImage
                source={isFingerprint ? Images.Fingerprint : Images.FadeId}
              />
            </TouchableOpacity>
            <Loader isLoading={loading} />
          </AuthHeader>
        </ImageBackground>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {width: '100%', height: '100%'},
  buttonContainer: {marginTop: Metrix.VerticalSize(20)},
});
