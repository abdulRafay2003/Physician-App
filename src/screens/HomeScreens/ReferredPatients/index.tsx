import {FlatList, ImageBackground, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {ReferredPatientsProps} from '../../propTypes';
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

interface HandleDateSelectParams {
  date: string;
}

const aapointment_data = [
  {
    id: '1',
    title: 'Johny Depp',
    time: 'FGH-ZZ-4321',
  },
];

export const ReferredPatients: React.FC<ReferredPatientsProps> = ({}) => {
  const [loading, setLoading] = useState(false);

  const handleDateSelect = (date: HandleDateSelectParams['date']): void => {
    console.log('Selected date:', date);
  };

  const renderAppointmentItem = ({item}: any) => {
    return (
      <AppointmentCard
        item={item}
        customContainerStyle={styles.aapointmentCard}
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
