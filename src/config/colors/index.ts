import DataHandler from '../../services/dataHandler.service';

const DefaultColors = {
  Base: '#FFFFFF',
  TextInputBaseColor: '#FFFFFF',
  WhiteOpacity: (opacity = '0.5') => `rgba(255, 255, 255, ${opacity})`,
  BlackOpacity: (opacity = '0.5') => `rgba(0, 0, 0, ${opacity})`,
  DisabledColor: (opacity = '0.5') => `rgba(20, 60, 133, ${opacity})`,
  BaseOpacity: (opacity = '0.5') => `rgba(255, 255, 255, ${opacity})`,
  PrimaryColorOpacity: (opacity = '0.5') => `rgba(29, 53, 96,${opacity})`,
  Primary: '#1D3560',
  Secondary: '#e55123',
  // Text Colors
  PrimaryTextColor: '#1D3560',
  SecondaryTextColor: '#757575',
  SuccessTextColor: '#00b050',
  ErrorTextColor: 'red',
  Success: 'green',
  Grey: '#00000020',
  TextInputBorderColor: 'rgba(146, 146, 146, 0.49)',
  TextInputPlaceholderColor: '#BBBBBB',
  Transparent: 'rgba(255, 255, 255, 0)',
};

const DarkModeColors = {
  ...DefaultColors,
  Base: '#121212',
  PrimaryTextColor: '#FFFFFF',
  TextInputBaseColor: '#121212',
};

// let selectedTheme = (isDark?: boolean) =>
//   isDark ? DarkModeColors : DefaultColors;

export default {DefaultColors, DarkModeColors};
