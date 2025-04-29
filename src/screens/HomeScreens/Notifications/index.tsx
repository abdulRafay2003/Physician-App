import {FlatList, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {NotificationsProps} from '../../propTypes';
import {
  AppointmentCard,
  BackHeader,
  Banner,
  CustomText,
  Loader,
  MainContainer,
} from '../../../components';
import {Images, Metrix, Utills} from '../../../config';

const notifications_data = [
  {
    id: '1',
    title: 'Upcoming Appointment at : ',
    time: '1:00 PM - Apr 18,2025',
  },
  {
    id: '2',
    title: 'Upcoming Appointment at : ',
    time: '1:00 PM - Apr 18,2025',
  },
];

export const Notifications: React.FC<NotificationsProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const renderNotificationItem = ({item}: any) => {
    return <AppointmentCard item={item} />;
  };

  return (
    <ImageBackground
      source={Images.BackgroundImage}
      style={styles.backgroundImage}>
      <Banner />
      <MainContainer>
        <BackHeader heading={'Notifications'} />
        <View style={{flex: 1}}>
          <FlatList
            data={notifications_data}
            renderItem={renderNotificationItem}
            contentContainerStyle={styles.flatlist}
            keyExtractor={item => item?.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <Loader isLoading={loading} />
      </MainContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingBottom: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(5),
  },
  cardContainer: {
    width: '100%',
    marginHorizontal: Metrix.HorizontalSize(5),
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
    fontWeight: '500',
  },
  backgroundImage: {width: '100%', height: '100%'},
});
