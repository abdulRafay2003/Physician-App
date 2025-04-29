import {
  FlatList,
  Image,
  ImageBackground,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppointmentDetailProps} from '../../propTypes';
import {
  AlertModal,
  CustomText,
  Loader,
  MainContainer,
  ShadowContainer,
} from '../../../components';
import {
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {normalizeFont} from '../../../config/metrix';

const aapointment_data = [
  {
    id: '1',
    title: 'ABC-DE-1234',
  },
  {
    id: '2',
    title: 'EFG-ZZ-4321.',
  },
];

const patient_details = [
  {
    id: '1',
    title: 'Name : ',
    value: 'Leonardo DiCaprio',
  },
  {
    id: '2',
    title: 'Email : ',
    value: 'leonardo@gmail.com',
  },
  {
    id: '3',
    title: 'Phone : ',
    value: '+1 212-451-6262',
  },
];

export const AppointmentDetail: React.FC<AppointmentDetailProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({title: '', msg: ''});

  const handleFeedback = (title: string, msg: string) => {
    setIsModalVisible(true);
    setModalContent({title, msg});
  };

  const FeedbackButton = (
    src: ImageRequireSource,
    bgColor: string,
    title: string,
    msg: string,
  ) => {
    return (
      <TouchableOpacity
        onPress={() => handleFeedback(title, msg)}
        activeOpacity={0.7}
        style={[styles.feedbackBtn, {backgroundColor: bgColor}]}>
        <Image
          source={src}
          resizeMode="contain"
          style={styles.feedbackBtnIcon}
        />
      </TouchableOpacity>
    );
  };

  const renderAppointmentItem = ({item}: any) => {
    return (
      <View
        key={item?.id}
        style={[styles.horizontalItem, {justifyContent: 'space-between'}]}>
        <CustomText.SmallText customStyle={styles.titleText}>
          {item?.title}
        </CustomText.SmallText>
        <View style={{flexDirection: 'row', gap: Metrix.HorizontalSize(10)}}>
          {FeedbackButton(
            Images.Tick,
            Utills.selectedThemeColors().Success,
            'Thank You ! \n',
            'Our team will get in touch with the patient',
          )}
          {FeedbackButton(
            Images.Close,
            Utills.selectedThemeColors().ErrorTextColor,
            'Thank You ! \n',
            'Our team will not  contact this patient',
          )}
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={Images.BackgroundImage}
      style={styles.backgroundImage}>
      <MainContainer>
        <ShadowContainer>
          <View style={styles.dateContainer}>
            <CustomText.RegularText customStyle={styles.dateText}>
              Thursday, 17th April, 2025
            </CustomText.RegularText>
          </View>
          <View style={styles.userInfoContainer}>
            {patient_details?.map((item: any) => {
              return (
                <View key={item?.id} style={styles.horizontalItem}>
                  <CustomText.SmallText customStyle={styles.titleText}>
                    {item?.title}
                  </CustomText.SmallText>
                  <CustomText.RegularText customStyle={styles.valueText}>
                    {item?.value}
                  </CustomText.RegularText>
                </View>
              );
            })}
          </View>
          <CustomText.MediumText customStyle={styles.heading}>
            Qualifying for these trails
          </CustomText.MediumText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: Metrix.VerticalSize(5),
            }}>
            <CustomText.MediumText customStyle={styles.protocolText}>
              Protocol
            </CustomText.MediumText>
            <CustomText.MediumText customStyle={styles.protocolText}>
              Physician Feedback
            </CustomText.MediumText>
          </View>
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

      <View style={{height: 0}}>
        <AlertModal
          modalVisible={isModalVisible}
          setModalVisible={setIsModalVisible}
          title={modalContent?.title}
          msg={modalContent?.msg}
          maxHeight={170}
          maxWidth={220}
          customStyles={{padding: Metrix.VerticalSize(0)}}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingBottom: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(5),
  },

  backgroundImage: {width: '100%', height: '100%'},
  aapointmentCard: {
    paddingTop: Metrix.VerticalSize(5),
    paddingBottom: Metrix.VerticalSize(5),
  },
  dateContainer: {
    marginVertical: Metrix.VerticalSize(5),
    padding: Metrix.HorizontalSize(15),
    backgroundColor: Utills.selectedThemeColors().Primary,
    borderRadius: Metrix.HorizontalSize(100),
    alignItems: 'center',
  },
  dateText: {
    color: Utills.selectedThemeColors().Base,
    fontWeight: 'bold',
  },

  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: Metrix.VerticalSize(20),
  },
  userInfoContainer: {
    marginVertical: Metrix.VerticalSize(10),
  },
  horizontalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrix.VerticalSize(7),
    borderBottomWidth: 1,
    borderColor: Utills.selectedThemeColors().SecondaryTextColor,
  },
  titleText: {
    fontSize: normalizeFont(13),
    fontWeight: '500',
  },
  valueText: {
    fontSize: normalizeFont(13),
    fontWeight: '600',
  },
  protocolText: {},
  renderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrix.VerticalSize(7),
    borderBottomWidth: 1,
    borderColor: Utills.selectedThemeColors().SecondaryTextColor,
  },
  feedbackBtn: {
    width: Metrix.HorizontalSize(35),
    height: Metrix.VerticalSize(20),
    borderRadius: Metrix.HorizontalSize(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackBtnIcon: {
    width: Metrix.HorizontalSize(9),
    height: Metrix.HorizontalSize(9),
    tintColor: Utills.selectedThemeColors().Base,
  },
});
