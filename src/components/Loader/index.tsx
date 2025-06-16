import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Metrix, Utills} from '../../config';
import {ActivityIndicatorProps} from 'react-native-paper';

type LoaderProps = ActivityIndicatorProps & {isLoading: any};

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Modal visible={isLoading} transparent={true} animationType={'fade'}>
        <View style={styles.mainContaienr}>
          <View
            style={{
              padding: Metrix.HorizontalSize(22),
              borderRadius: Metrix.HorizontalSize(10),
              backgroundColor: Utills.selectedThemeColors().Base,
            }}>
            <ActivityIndicator
              size={size}
              color={Utills.selectedThemeColors().Primary}
            />
          </View>
        </View>
      </Modal>
    );
  } else {
    return null;
  }
};

interface LoaderStyles {
  mainContaienr: ViewStyle;
}
const styles = StyleSheet.create<LoaderStyles>({
  mainContaienr: {
    flex: 1,
    backgroundColor: Utills.selectedThemeColors().BlackOpacity('0.5'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
