import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Images, Metrix, Utills} from '../../../config';
import {
  AuthHeader,
  Banner,
  CustomInput,
  FadeInImage,
  Loader,
} from '../../../components';
import {Formik} from 'formik';
import {LoginScreenProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions, HomeActions} from '../../../redux/actions';
import {t} from 'i18next';
import {AuthAPIS} from '../../../services/auth';
import {useMutation} from '@tanstack/react-query';
import Schema from '../../../formik';

interface LoginBody {
  email: string;
  password: string;
}

const handleLogin = async (body: LoginBody) => {
  const response = await AuthAPIS.login(body);
  // console.log('Response', response?.status, response?.data);
  const data = response?.data;
  if (data) {
    return {data};
  } else {
    throw new Error('Login failed');
  }
};

export const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFingerprint: boolean = true;
  let passwordRef = useRef<TextInput>(null!);

  const {mutate, error, data} = useMutation({
    mutationFn: handleLogin,
    onSuccess: (data: any) => {
      setLoading(false);
      dispatch(
        HomeActions.setUserDetails({
          ...data?.data?.user,
          token: data?.data?.token,
        }),
      );
      dispatch(AuthActions.loginSuccess(true));
    },
    onError: (error: any) => {
      console.log('Failure', error);
      setLoading(false);
      Utills.showToast(error.message);
    },
  });

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => {
        setLoading(true);
        mutate({email: values?.email, password: values?.password});
      }}
      validationSchema={Schema.LoginSchema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        handleSubmit,
      }) => (
        <ImageBackground
          source={Images.BackgroundImage}
          style={styles.backgroundImage}>
          <Banner />
          <AuthHeader
            heading={t('Sign In')}
            title={t('Sign In')}
            paragraph="Please log in using your email and password, or authenticate with your biometric credentials."
            customStyles={styles.buttonContainer}
            isBtn
            onPress={() => handleSubmit()}>
            <CustomInput
              placeholder={'Enter your email address'}
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
              placeholder={'Enter your password'}
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
              activeOpacity={0.8}
              style={styles.fingerPrintContainer}>
              <FadeInImage
                source={isFingerprint ? Images.Fingerprint : Images.FadeId}
              />
            </TouchableOpacity>
            <Loader isLoading={loading} />
          </AuthHeader>
          <Loader isLoading={loading} />
        </ImageBackground>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {width: '100%', height: '100%'},
  buttonContainer: {marginTop: Metrix.VerticalSize(20)},
  fingerPrintContainer: {
    borderWidth: 1,
    width: Metrix.HorizontalSize(50),
    height: Metrix.HorizontalSize(50),
    borderRadius: Metrix.HorizontalSize(10),
    padding: 5,
    marginVertical: Metrix.VerticalSize(5),
    alignSelf: 'center',
  },
});
