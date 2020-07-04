import React, {useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {StyleSheet} from 'react-native';

import {fetchEntertainmentData} from '../action/actions';
import styles from './Entertainment.style';

type EntertainmentData = {
  Search: {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string,
  },
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

  const renderList = () => {
    console.log('data3', data);
    if (data) {
      return (
        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                minHeight: StyleSheet.hairlineWidth,
                opacity: 0.3,
                backgroundColor: '#404041',
              }}
            />
          )}
          data={data}
          renderItem={renderItem}
          keyExtractor={extractKey}
        />
      );
    }
    renderErrorMessage();
  };

  const extractKey = (item: EntertainmentData, index: number) =>
    `${item}-${index}`;

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          height: 100,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 30,
          flex: 1,
        }}>
        <Image style={{width: 90, height: 80}} source={{uri: item?.Poster}} />
        <View style={{marginHorizontal: 15}}>
          <Text numberOfLines={1} style={{fontSize: 15, fontWeight: 'bold'}}>
            {item?.Title}
          </Text>
          <Text>{item?.Year}</Text>
          <Text>{item?.imdbID}</Text>
          <Text>{item?.Type}</Text>
        </View>
      </View>
    );
  };

  const renderErrorMessage = () => {
    console.log('hellow');
    return (
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
        <Text
          style={{
            fontSize: 20,
          }}>
          Your search is not found
        </Text>
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
        style={{
          backgroundColor: 'transparent',
          marginTop: 40,
          borderWidth: 1,
          padding: 10,
          marginHorizontal: 15,
        }}
        onChangeText={changeText => {
          setType(changeText);
        }}
        onSubmitEditing={() => {
          onSubmit(type);
        }}
      />
      {renderList()}
      {renderErrorMessage()}
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
