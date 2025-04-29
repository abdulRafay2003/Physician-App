import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {FontType, Metrix, Utills} from '../../config';
import {CustomText} from '..';

type AlertModalProps = {
  modalVisible?: any;
  setModalVisible?: any;
  maxWidth?: any;
  maxHeight?: any;
  backgroundPress?: any;
  customStyles?: any;
  title?: string;
  msg: string;
};

export const AlertModal: React.FC<AlertModalProps> = ({
  modalVisible,
  setModalVisible,
  maxWidth = 150,
  maxHeight = 150,
  backgroundPress = true,
  customStyles,
  title,
  msg,
}) => {
  return (
    <View style={{...styles.centeredView}}>
      <Modal
        animationType={'slide'}
        transparent={true}
        onRequestClose={() => {
          if (backgroundPress) {
            setModalVisible(false);
          }
        }}
        visible={modalVisible}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            if (backgroundPress) {
              setModalVisible(!modalVisible);
            }
          }}
          style={styles.centeredView}>
          <TouchableHighlight
            style={{
              ...styles.modalView,
              width: Metrix.HorizontalSize(maxWidth),
              ...customStyles,
            }}>
            <View
              style={[
                styles.msgContainer,
                {
                  height: Metrix.VerticalSize(maxHeight),
                },
              ]}>
              <CustomText.MediumText
                customStyle={[styles.modalHeading, {fontWeight: '900'}]}>
                {title}
              </CustomText.MediumText>
              <CustomText.MediumText customStyle={styles.modalHeading}>
                {msg}
              </CustomText.MediumText>
            </View>
          </TouchableHighlight>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Utills.selectedThemeColors().BlackOpacity(),
  },
  modalView: {
    backgroundColor: Utills.selectedThemeColors().Base,
    borderRadius: Metrix.VerticalSize(30),
    padding: Metrix.HorizontalSize(20),
    width: Metrix.HorizontalSize(320),
    ...Metrix.createShadow,
  },
  modalHeading: {
    textAlign: 'center',
    width: '95%',
    fontWeight: '600',
  },
  msgContainer: {
    paddingVertical: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.VerticalSize(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
