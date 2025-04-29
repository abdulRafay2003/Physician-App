import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  I18nManager,
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {LottieAnimatedComponent} from '../LottieAnimatedComponent';

export type FadeInImageProps = {
  source: ImageProps['source'];
  resizeMode?: ImageProps['resizeMode'];
  customImageContainerStyle?: ViewStyle;
  imageStyles?: ImageStyle;
  customPlaceholderStyle?: ViewStyle;
};

export const FadeInImage: React.FC<FadeInImageProps> = ({
  source,
  resizeMode = 'contain',
  customImageContainerStyle,
  imageStyles,
}) => {
  const [isLoad, setIsLoad] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0))?.current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={customImageContainerStyle}>
      <Image
        source={source}
        style={[
          {
            width: '100%',
            height: '100%',
          },
          imageStyles,
        ]}
        resizeMode={resizeMode}
        onLoadStart={() => setIsLoad(true)}
        onLoadEnd={() => setIsLoad(false)}
      />
    </View>
  );
};
