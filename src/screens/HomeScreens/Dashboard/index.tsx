import {FlatList, ImageBackground, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useQuery} from '@tanstack/react-query';
import {HomeAPIS} from '../../../services/home';
import moment from 'moment';

interface HandleDateSelectParams {
  date: string;
}

const fetPhysicianLeads = async () => {
  const response = await HomeAPIS.physicianLeads();
  const data = response?.data;
  const status = response?.status;
  if (status == 200) {
    let array: any = [];
    data?.patients?.map((item: any) => {
      array?.push({
        leadId: item?.lead_id,
        assignId: item?.assign_id,
        email: item?.email,
        phone: item?.phone,
        protocol: item?.protocol_name,
        status: item?.status,
        title: item?.name,
        time: moment(item?.visit_date).format('hh:mm A'),
      });
    });
    return {data: array};
  } else {
    throw new Error('Login failed');
  }
};

export const Dashboard: React.FC<DashboardProps> = ({}) => {
  const userDetails = useSelector((state: RootState) => state.home.userDetails);
  const [loading, setLoading] = useState(false);
  const [physicianLeads, setPhysicianLeads] = useState([]);
  console.log('physicianLeads', physicianLeads);

  const {data, error, isLoading} = useQuery({
    queryKey: ['fetPhysicianLeads'],
    queryFn: () => fetPhysicianLeads(),
    staleTime: 300000,
  });

  useEffect(() => {
    if (data) {
      setPhysicianLeads(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

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
            data={physicianLeads}
            renderItem={renderAppointmentItem}
            contentContainerStyle={styles.flatlist}
            keyExtractor={(item, index) => index.toString()}
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
