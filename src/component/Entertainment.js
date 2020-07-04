import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator, Text, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';

import {fetchEntertainmentData} from '../action/actions';
import styles from './Entertainment.style';

type EntertainmentData = {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string,
};

type Props = {
  fetchEntertainmentInfo: (type: string) => void,
  data: EntertainmentData,
  loading: Boolean,
};

const Entertainment = (props: Props) => {
  const {fetchEntertainmentInfo, data, loading} = props;

  const [type, setType] = useState('');

  const onSubmit = (text: string) => {
    fetchEntertainmentInfo(text);
  };

  const extractKey = (item: EntertainmentData, index: number) =>
    `${item}-${index}`;

  const renderItem = ({item}: {item: EntertainmentData}) => {
    return (
      <View
        style={{
          height: 100,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text>item?.Title</Text>
        <Text>item?.Year</Text>
        <Text>item?.imdbID</Text>
        <Text>item?.Type</Text>
        <Text>item?.Poster</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Search"
        style={{backgroundColor: 'transparent', marginTop: 40}}
        onChangeText={changeText => {
          setType(changeText);
        }}
        onSubmitEditing={() => {
          onSubmit(type);
        }}
      />

      <FlatList
        ItemSeparatorComponent={{
          minHeight: StyleSheet.hairlineWidth,
          opacity: 0.3,
          backgroundColor: '#404041',
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={extractKey}
      />
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchEntertainmentInfo: type => dispatch(fetchEntertainmentData(type)),
});

const mapStateToProps = state => ({
  loading: state.isFetching,
  data: state.entertainmentReducer.data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entertainment);
