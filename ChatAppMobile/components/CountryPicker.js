import React, {useState, useEffect, useContext} from 'react';
import {images, fontSizes, colors} from '../constants';
import {isValidPhone, isValidPass} from '../utils/Validation';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import countries from '../components/countries';
function CountryPicker(props) {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [searchText, setSearchText] = useState('');

  const [data, setData] = useState(countries);
  const filterSearch = () =>
    data.filter(data =>
      data.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          height: 50,
          backgroundColor: 'gray',
          flexDirection: 'row',
          alignContent: 'center',
        }}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            source={images.back}
            style={{height: 25, width: 25, margin: 10}}></Image>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            onChangeText={text => {
              setSearchText(text);
            }}
            placeholder="Tìm kiếm"
            placeholderTextColor="white"
            style={{paddingLeft: 15, color: 'white'}}></TextInput>
        </View>
      </View>
      <View style={{flexDirection: 'column'}}>
        {filterSearch().length > 0 ? (
          <FlatList
            data={filterSearch()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => navigate('RegisterPhoneActivity', {code: item})}
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: 'white',
                  flexDirection: 'row',
                }}>
                <Text style={{color: 'black', padding: 10}}>{item.name}</Text>
                <View style={{flex: 1}}></View>
                <Text style={{color: 'black', padding: 10}}>
                  {item.dialCode}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={eachChat => eachChat.name}
            key={eachChat => eachChat.name}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 30}}>No data</Text>
          </View>
        )}
      </View>
    </View>
  );
}
export default CountryPicker;
