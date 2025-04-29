import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  Switch,
  ImageBackground,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../config';
import {Banner, CustomText, Loader, MainContainer} from '../components';
import {useDispatch} from 'react-redux';
import {AuthActions, HomeActions} from '../redux/actions';
import utills from '../config/utills';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppointmentDetail, Dashboard, ReferredPatients} from '../screens';
import {normalizeFont} from '../config/metrix';
import {useNavigation, useNavigationState} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const DrawerContent: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  // console.log('Screeen', currentScreen);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleLogout = () => {
    Alert.alert('Are you sure you want to logout?', '', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.setItem('userData', JSON.stringify({}));
          dispatch(HomeActions.setUserDetails({}));
          dispatch(AuthActions.loginSuccess(false));
        },
      },
    ]);
  };

  const DrawerElement = [
    {
      id: '1',
      label: 'Patients Referred',
      onPress: () => {
        NavigationService.navigate(RouteNames.HomeRoutes.ReferredPatients);
      },
    },
    {
      id: '2',
      label: 'Logout',
      onPress: handleLogout,
    },
    {
      id: '3',
      label: 'Biometric Login',
      onPress: () => {},
    },
  ];
  return (
    <ImageBackground
      source={Images.BackgroundImage}
      style={styles.backgroundImage}>
      <MainContainer customeStyle={{paddingHorizontal: 0}}>
        <View>
          {DrawerElement.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              style={styles.drawerItemContainer}>
              <DrawerItem
                label={option.label}
                labelStyle={styles.drawerItemText}
                onPress={option.onPress}
                style={{width: '80%'}}
              />
              {option.id != '3' ? (
                <Image
                  source={Images.Arrow}
                  style={styles.drawerItemImg}
                  resizeMode="contain"
                />
              ) : (
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: Utills.selectedThemeColors().Primary,
                  }}
                  thumbColor={Utills.selectedThemeColors().Base}
                  ios_backgroundColor={
                    Utills.selectedThemeColors().SecondaryTextColor
                  }
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        <Loader isLoading={loading} />
      </MainContainer>
    </ImageBackground>
  );
};

const HeaderIconsComponent: React.FC<{
  item: any;
}> = ({item}) => (
  <>
    {item?.id == '2' ? (
      <CustomText.MediumText customStyle={styles.headerHeading}>
        {item?.title}
      </CustomText.MediumText>
    ) : (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.circularView}
        onPress={item?.onPress}>
        <Image
          source={item?.icon}
          resizeMode="contain"
          style={styles.drawerIcons}
        />
      </TouchableOpacity>
    )}
  </>
);

const CustomHeader = ({navigation}: {navigation: any}) => {
  const currentRouteIndex = useNavigationState(state => state?.index);
  const currentRouteName = useNavigationState(
    state => state?.routes?.[currentRouteIndex]?.name,
  );
  const isAppointmentDetail =
    currentRouteName === RouteNames.HomeRoutes.AppointmentDetail;
  const isReferredPatient =
    currentRouteName === RouteNames.HomeRoutes.ReferredPatients;

  const headerIconsData = [
    {
      id: '1',
      icon:
        isAppointmentDetail || isReferredPatient ? Images.Arrow : Images.Drawer,
      onPress: () => {
        isAppointmentDetail || isReferredPatient
          ? NavigationService.goBack()
          : navigation?.openDrawer();
      },
    },
    {
      id: '2',
      title: isAppointmentDetail
        ? 'Patient Profile'
        : isReferredPatient
        ? 'Patient Referred'
        : 'Welcome \n Dr. Humayun Naqvi',
    },
    {
      id: '3',
      icon: Images.Notification,
      onPress: () => {
        NavigationService.navigate(RouteNames.HomeRoutes.Notifications);
      },
    },
  ];
  return (
    <>
      <Banner />
      <View style={styles.headerContainer}>
        {headerIconsData?.map((item: any) => (
          <HeaderIconsComponent item={item} />
        ))}
      </View>
    </>
  );
};

export const DrawerStack: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({navigation, route, options}) => {
          return <CustomHeader navigation={navigation} />;
        },
      }}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen
        name={RouteNames.HomeRoutes.Dashboard}
        component={Dashboard}
      />
      <Drawer.Screen
        name={RouteNames.HomeRoutes.AppointmentDetail}
        component={AppointmentDetail}
      />
      <Drawer.Screen
        name={RouteNames.HomeRoutes.ReferredPatients}
        component={ReferredPatients}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingRight: Metrix.HorizontalSize(30),
  },
  drawerItemText: {
    fontSize: FontType.FontRegular,
    color: utills.selectedThemeColors().Primary,
    fontWeight: '600',
  },
  drawerItemImg: {
    width: Metrix.HorizontalSize(18),
    height: Metrix.VerticalSize(18),
    transform: [{rotate: '180deg'}],
  },
  headerHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    width: '60%',
    fontSize: normalizeFont(18),
  },
  circularView: {
    padding: Metrix.HorizontalSize(12),
    borderRadius: Metrix.HorizontalSize(100),
    backgroundColor: utills.selectedThemeColors().Base,
    ...Metrix.cardShadow,
  },
  drawerIcons: {
    width: Metrix.HorizontalSize(22),
    height: Metrix.VerticalSize(22),
    tintColor: utills.selectedThemeColors().Primary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Metrix.HorizontalSize(20),
    marginTop: Metrix.VerticalSize(20),
    width: '100%',
  },
  backgroundImage: {width: '100%', height: '100%'},
});
