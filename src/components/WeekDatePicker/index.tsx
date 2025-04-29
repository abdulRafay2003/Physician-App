import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';
import {FontType, Metrix, Utills} from '../../config';
import {CustomText} from '..';

export interface WeekDatePickerrProps {
  onDateSelect: (date: string) => void;
}
export const WeekDatePicker: React.FC<WeekDatePickerrProps> = ({
  onDateSelect,
}) => {
  const [dates, setDates] = useState<
    {label: string; date: string; day: string; month: string}[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  useEffect(() => {
    const generateDates = () => {
      const today = moment();
      const weekDates = [];

      for (let i = 0; i < 6; i++) {
        const date = today.clone().add(i, 'days');
        weekDates.push({
          label: date.format('ddd'), // e.g., Mon, Tue
          date: date.format('YYYY-MM-DD'),
          day: date.format('D'),
          month: date.format('MMM'),
        });
      }
      setDates(weekDates);
    };

    generateDates();
  }, []);

  const handleDatePress = (date: string): void => {
    setSelectedDate(date);
    onDateSelect(date); // callback to parent
  };

  const renderItem = ({
    item,
  }: {
    item: {label: string; date: string; day: string; month: string};
  }) => (
    <TouchableOpacity
      style={[
        styles.dateItem,
        selectedDate === item.date && styles.selectedDateItem,
      ]}
      onPress={() => handleDatePress(item.date)}>
      <CustomText.RegularText
        style={[
          styles.dayText,
          selectedDate === item.date && styles.selectedDayText,
        ]}>
        {item.label}
      </CustomText.RegularText>
      <CustomText.RegularText
        style={[
          styles.dateText,
          selectedDate === item.date && styles.selectedDateText,
        ]}>
        {item.day}
      </CustomText.RegularText>
      <CustomText.SmallText
        style={[
          styles.monthText,
          selectedDate === item.date && styles.selectedMonthText,
        ]}>
        {item.month}
      </CustomText.SmallText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={dates}
        renderItem={renderItem}
        keyExtractor={item => item.date}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: Metrix.VerticalSize(20),
    alignItems: 'center',
  },
  dateItem: {
    width: Metrix.HorizontalSize(38),
    height: Metrix.VerticalSize(60),
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrix.HorizontalSize(5),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Utills.selectedThemeColors().Primary,
  },
  selectedDateItem: {
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
  dayText: {
    color: Utills.selectedThemeColors().Primary,
    fontWeight: '500',
  },
  dateText: {
    fontSize: FontType.FontRegular,
    fontWeight: 'bold',
    color: Utills.selectedThemeColors().Primary,
    lineHeight: Metrix.VerticalSize(20),
  },
  selectedDayText: {
    color: Utills.selectedThemeColors().Base,
    fontWeight: '500',
  },
  selectedDateText: {
    fontSize: FontType.FontRegular,
    fontWeight: 'bold',
    color: Utills.selectedThemeColors().Base,
  },
  monthText: {
    color: Utills.selectedThemeColors().Primary,
    fontWeight: '500',
  },
  selectedMonthText: {
    color: Utills.selectedThemeColors().Base,
    fontWeight: '500',
  },
});
