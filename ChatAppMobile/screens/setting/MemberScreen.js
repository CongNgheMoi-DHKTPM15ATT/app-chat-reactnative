import * as React from 'react';
import {View, useWindowDimensions, FlatList} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {UIHeaderChat} from '../../components';

const FirstRoute = () => (
  <View style={{flex: 1, backgroundColor: '#ff4081'}}>
    <FlatList
      data={friends}
      renderItem={({item, index}) => (
        <ItemFriend
          data={item}

          // onPress={() => {
          //   // alert(`name is: ${item._id}`);
          //   getMessById(item._id);
          //   navigate('Messenger', {users: chat});
          // }}
        />
      )}
      keyExtractor={eachChat => eachChat._id}
      key={eachChat => eachChat._id}
    />
  </View>
);

const SecondRoute = () => (
  <View style={{flex: 1, backgroundColor: '#673ab7'}} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function MemberScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Tất cả'},
    {key: 'second', title: 'Đã mời'},
  ]);
  const [friends, setFriend] = React.useState([]);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
