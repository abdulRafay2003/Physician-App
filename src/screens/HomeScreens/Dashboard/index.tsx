import {FlatList, ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {DashboardProps} from '../../propTypes';
import {
  AppointmentCard,
  CustomText,
  Loader,
  MainContainer,
  ShadowContainer,
  WeekDatePicker,
} from '../../../components';
import {Images, Metrix, NavigationService, RouteNames} from '../../../config';
import {normalizeFont} from '../../../config/metrix';
import {RootState} from '../../../redux/reducers';
import {useSelector} from 'react-redux';

interface HandleDateSelectParams {
  date: string;
}

const aapointment_data = [
  {
    id: '1',
    title: 'Leonardo DiCaprio',
    time: '11:00 AM',
  },
  {
    id: '2',
    title: 'Robert Downey Jr.',
    time: '1:00 PM',
  },
  {
    id: '3',
    title: 'Christian Bale',
    time: '5:00 PM',
  },
  {
    id: '4',
    title: 'Cristiano Ronaldo',
    time: '11:00 PM',
  },
];

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  const userDetails = useSelector((state: RootState) => state.home.userDetails);
  const [loading, setLoading] = useState(false);
  console.log('userDetails', userDetails);

  const handleDateSelect = (date: HandleDateSelectParams['date']): void => {
    console.log('Selected date:', date);
  };

  const renderAppointmentItem = ({item}: any) => {
    return (
      <AppointmentCard
        item={item}
        customContainerStyle={styles.aapointmentCard}
        onPress={() => {
          NavigationService.navigate(RouteNames.HomeRoutes.AppointmentDetail);
        }}
      />
    );
  };

  return (
    <ImageBackground
      source={Images.BackgroundImage}
      style={styles.backgroundImage}>
      <MainContainer>
        <ShadowContainer>
          <WeekDatePicker onDateSelect={handleDateSelect} />
          <CustomText.MediumText customStyle={styles.heading}>
            Appointments
          </CustomText.MediumText>
          <FlatList
            data={aapointment_data}
            renderItem={renderAppointmentItem}
            contentContainerStyle={styles.flatlist}
            keyExtractor={item => item?.id}
            showsVerticalScrollIndicator={false}
          />
        </ShadowContainer>

        <Loader isLoading={loading} />
      </MainContainer>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingBottom: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(5),
    marginTop: Metrix.VerticalSize(10),
  },

  backgroundImage: {width: '100%', height: '100%'},
  aapointmentCard: {
    paddingTop: Metrix.VerticalSize(5),
    paddingBottom: Metrix.VerticalSize(5),
  },
  heading: {
    fontSize: normalizeFont(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: Metrix.VerticalSize(10),
  },
});
