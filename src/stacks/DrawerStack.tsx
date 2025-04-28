import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageProps,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {Images, Metrix, NavigationService, RouteNames, Utills} from '../config';
import {CustomText, Loader} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {AuthActions, HomeActions} from '../redux/actions';
import utills from '../config/utills';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dashboard, WebView} from '../screens';

const Drawer = createDrawerNavigator();

const DrawerContent: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const DrawerElement = [
    {
      label: 'Patients Referred',
      onPress: () => {
        NavigationService.navigate(RouteNames.HomeRoutes.WebView, {
          from: 'About us',
          url: 'https://github.com/iamStephenFang/react-native-heart-rate-monitor?tab=readme-ov-file',
        });
      },
    },
    {
      label: 'Logout',
      onPress: () => {
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
      },
    },
  ];
  return (
    <View style={styles.userInfoSection}>
      <View style={styles.drawerSection}>
        {DrawerElement.map((option, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={{
              // borderWidth:1,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingRight: Metrix.HorizontalSize(20),
            }}>
            <DrawerItem
              // icon={({color, size}) => (
              //   <Image
              //     key={index}
              //     source={option.icon}
              //     style={{
              //       width: Metrix.HorizontalSize(18),
              //       height: Metrix.HorizontalSize(18),
              //       // tintColor: Utills.selectedThemeColors().PrimaryTextColor,
              //     }}
              //     resizeMode="contain"
              //   />
              // )}
              label={option.label}
              labelStyle={{
                fontSize: 14,
                color: '#222',
              }}
              onPress={option.onPress}
              style={{width: '80%'}}
            />
            <Image
              key={index}
              source={Images.Stroke}
              style={{
                width: Metrix.HorizontalSize(10),
                height: Metrix.VerticalSize(10),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
      <Loader isLoading={loading} />
    </View>
    // </DrawerContentScrollView>
  );
};

const HeaderIconsComponent: React.FC<{
  item: any;
}> = ({item}) => (
  <>
    {item?.id == '2' ? (
      <CustomText.RegularText>{item?.title}</CustomText.RegularText>
    ) : (
      <TouchableOpacity
        style={{
          padding: Metrix.HorizontalSize(12),
          borderRadius: Metrix.HorizontalSize(100),
          backgroundColor: utills.selectedThemeColors().Base,
          ...Metrix.cardShadow,
        }}
        onPress={item?.onPress}>
        <Image
          source={item?.icon}
          resizeMode="contain"
          style={{
            width: Metrix.HorizontalSize(item?.size || 22),
            height: Metrix.VerticalSize(item?.size || 22),
            tintColor: utills.selectedThemeColors().Primary,
          }}
        />
      </TouchableOpacity>
    )}
  </>
);

const CustomHeader = ({navigation}: {navigation: any}) => {
  //   const navigation = useNavigation();

  const headerIconsData = [
    {
      id: '1',
      icon: Images.Drawer,
      onPress: () => navigation?.openDrawer(),
    },
    {
      id: '2',
      title: 'Images.Drawer',
      onPress: () => navigation?.openDrawer(),
    },
    {
      id: '3',
      icon: Images.Notification,
      onPress: () => navigation?.openDrawer(),
    },
  ];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Metrix.HorizontalSize(20),
        marginTop: Metrix.VerticalSize(50),
        borderWidth: 1,
      }}>
      {headerIconsData?.map((item: any) => (
        <HeaderIconsComponent item={item} />
      ))}
    </View>
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
      <Drawer.Screen name={RouteNames.HomeRoutes.WebView} component={WebView} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    position: 'absolute',
    zIndex: 999,
    flex: 1,
  },
  userInfoSection: {
    marginTop: 50,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    paddingTop: 25,
    borderTopWidth: 1,
    borderColor: Utills.selectedThemeColors().Grey,
    marginTop: 25,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
