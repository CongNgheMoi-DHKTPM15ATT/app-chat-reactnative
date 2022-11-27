import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import ItemImage from './ItemImage';
function SettingChat(props) {
  const [isActive, setIsActive] = useState(false);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [imagesMess, setImagesMess] = useState([]);
  let {_id, receiver, is_group, nick_name} = props.route.params.id;
  const [adminGr, setAdminGr] = useState('');
  const [myUser, setMyUser] = useState('');
  const [userId, setUserId] = useState('');
  const BASE_URL = 'http://192.168.43.91:8080/api/messages/content-type-top-4';
  const RM_URL = 'http://192.168.43.91:8080/api/group/remove-mem';
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_name').then(result => {
      setMyUser(result);
    });
    AsyncStorage.getItem('user_id').then(result => {
      setUserId(result);
    });
    console.log('eiu a: ', myUser);
    console.log('eiu a: ', nick_name);
  });
  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: _id,
        content_type: 'image',
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson;
        setImagesMess(currentUser);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  let handleImageAll = () => {
    alert('okkk');
  };
  const handleRemoveMembers = () => {
    const method = 'POST';
    fetch(RM_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: _id,
        user_id: userId,
        user_control_id: userId,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        // console.log('demo day nha: ', currentUser.members);
        //  currentUserRequests.map(req=>{
        //   if (req==) {

        //   }
        //  })
        alert('Rời nhóm thành công!');
        navigate('UITag');
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  return (
    <View style={{flex: 1}}>
      <UIHeaderChat
        title={'Tùy chọn'}
        leftIconName={'search'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          navigate('SettingChat');
        }}
        onPressPhoneRightIcon={() => {
          joinRoom();
          navigate('CallScreen');
          // alert('ok');
        }}
        onPressVideoRightIcon={() => {
          alert('ok');
        }}></UIHeaderChat>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#252526',
            height: 250,
            alignItems: 'center',
          }}>
          <Image
            source={{uri: receiver.avatar}}
            style={{
              height: 90,
              width: 90,
              borderRadius: 100,
              marginTop: 10,
            }}></Image>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              width: 300,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {receiver.nick_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              marginTop: 15,
            }}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  height: 50,
                  width: 50,
                  backgroundColor: 'gray',
                  marginHorizontal: 15,
                  borderRadius: 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.icon_search}
                  style={{height: 24, width: 24}}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: 55,
                }}>
                Tìm tin nhắn
              </Text>
            </View>
            {is_group == true ? (
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => navigate('AddMem', {id: {_id, receiver}})}
                  style={{
                    padding: 10,
                    height: 50,
                    width: 50,
                    backgroundColor: 'gray',
                    marginHorizontal: 15,
                    borderRadius: 100,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={images.account}
                    style={{height: 24, width: 24}}></Image>
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    width: 100,
                  }}>
                  Thêm thành viên
                </Text>
              </View>
            ) : (
              <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    height: 50,
                    width: 50,
                    backgroundColor: 'gray',
                    marginHorizontal: 15,
                    borderRadius: 100,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={images.account}
                    style={{height: 24, width: 24}}></Image>
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    width: 55,
                  }}>
                  Trang cá nhân
                </Text>
              </View>
            )}
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  height: 50,
                  width: 50,
                  backgroundColor: 'gray',
                  marginHorizontal: 15,
                  borderRadius: 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.camera}
                  style={{height: 24, width: 24}}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: 55,
                }}>
                Đổi hình nền
              </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  height: 50,
                  width: 50,
                  backgroundColor: 'gray',
                  marginHorizontal: 15,
                  borderRadius: 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.notification}
                  style={{height: 24, width: 24}}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: 60,
                }}>
                Tắt thông báo
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#252526',
            height: 130,
            marginTop: 10,
            alignContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 15,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image
              source={images.cloud2}
              style={{height: 30, width: 30}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Ảnh, link, file đã gửi
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FlatList
                  horizontal={true}
                  data={imagesMess}
                  renderItem={({item, index}) => (
                    <ItemImage
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
                <TouchableOpacity
                  onPress={() => handleImageAll()}
                  style={{
                    padding: 10,
                    height: 50,
                    width: 50,
                    backgroundColor: 'gray',
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={images.camera}
                    style={{height: 24, width: 24}}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#252526',
            height: 120,
            marginTop: 10,
            alignContent: 'center',
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            onPress={() => navigate('MemberScreen')}
            style={{
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image
              source={images.adduser}
              style={{height: 25, width: 25}}></Image>
            {is_group == true ? (
              <View style={{flexDirection: 'column'}}>
                <Text
                  style={{
                    color: 'white',
                    padding: 5,
                    fontSize: 18,
                    paddingHorizontal: 15,
                  }}>
                  Xem thành viên ({receiver.members.length + 1})
                </Text>
              </View>
            ) : (
              <View style={{flexDirection: 'column'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    color: 'white',
                    padding: 5,
                    fontSize: 18,
                    paddingHorizontal: 15,
                  }}>
                  Tạo nhóm với {receiver.nick_name}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image source={images.link} style={{height: 25, width: 25}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 15,
                }}>
                Link tham gia nhóm
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#252526',
            height: 230,
            marginTop: 10,
            alignContent: 'center',
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            style={{
              padding: 15,
              marginHorizontal: 17,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image source={images.tag} style={{height: 20, width: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  padding: 2,
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Phân loại
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 15,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image source={images.pin} style={{height: 30, width: 30}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 15,
                }}>
                Ghim trò chuyện
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image source={images.eye} style={{height: 20, width: 20}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Ẩn trò chuyện
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 15,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image
              source={images.setting_user}
              style={{height: 25, width: 25}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Cài đặt cá nhân
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#252526',
            height: 200,
            marginTop: 10,
            flexDirection: 'column',
          }}>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 20,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image
              source={images.warning}
              style={{height: 25, width: 25}}></Image>
            <View>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Báo xấu
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 15,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image
              source={images.delete}
              style={{height: 30, width: 30}}></Image>
            <View>
              <Text
                style={{
                  color: 'red',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Xóa lịch xử trò chuyện
              </Text>
            </View>
          </TouchableOpacity>
          {is_group == true && nick_name == receiver.nick_name ? (
            <TouchableOpacity
              style={{
                padding: 10,
                marginHorizontal: 25,
                borderRadius: 100,
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Image
                source={images.logout}
                style={{height: 20, width: 20, color: 'red'}}></Image>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    paddingHorizontal: 20,
                  }}>
                  Chuyển quyền trưởng nhóm
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          {is_group == true ? (
            <TouchableOpacity
              onPress={() => handleRemoveMembers()}
              style={{
                padding: 10,
                marginHorizontal: 25,
                borderRadius: 100,
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Image
                source={images.logout}
                style={{height: 20, width: 20, color: 'red'}}></Image>
              <View>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 18,
                    paddingHorizontal: 20,
                  }}>
                  Rời nhóm
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                padding: 10,
                marginHorizontal: 25,
                borderRadius: 100,
                flexDirection: 'row',
                alignContent: 'center',
              }}>
              <Image
                source={images.logout}
                style={{height: 20, width: 20, color: 'red'}}></Image>
              <View>
                <Text
                  style={{
                    color: 'red',
                    fontSize: 18,
                    paddingHorizontal: 20,
                  }}>
                  Xóa bạn
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
export default SettingChat;
