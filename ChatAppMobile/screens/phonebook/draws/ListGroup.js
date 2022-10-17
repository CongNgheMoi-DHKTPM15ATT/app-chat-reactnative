import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';
import ItemGroup from '../../phonebook/draws/ItemGroup';
import {images} from '../../../constants';
import {UIHeader} from '../../../components';
function ListGroup(props) {
  const [isActive, setIsActive] = useState(false);
  const [chat, setChat] = useState([
    {
      title: 'Cloud của tôi',
      content: '[File] bai tap html.docx',
      image: images.item_chat,
      time: '5 giờ',
    },
    {
      title: 'DevOps Vietnam Community',
      content: '[File] bai tap html.docx',
      image: images.item_chat1,
      time: '7 giờ',
    },
    {
      title: '[ĐTN 21] BCS Các lớp K.CNTT',
      content: '[File] bai tap html.docx',
      image: images.item_chat2,
      time: '11 giờ',
    },
    {
      title: 'T5_4_6_LTTBDDNC_22_23_N2',
      content: '[File] bai tap html.docx',
      image: images.item_chat3,
      time: '1 giờ',
    },
    {
      title: 'DHDTMT17ATT-Hệ thống máy tính',
      content:
        '[File] bai tap html.docx [File] bai tap html.docx [File] bai tap html.docx [File] bai tap html.docx [File] bai tap html.docx',
      image: images.item_chat3,
      time: '23 giờ',
    },
    {
      title: 'T3_7_9_LT_KTTKPM_22_23_NEW',
      content: '[File] bai tap html.docx',
      image: images.item_chat3,
      time: '5 giờ',
    },
    {
      title: 'Mẹeee',
      content: '[File] bai tap html.docx',
      image: images.item_chat4,
      time: '5 giờ',
    },
  ]);
  return (
    <ScrollView horizontal={false} style={{flex: 1}}>
      <UIHeader
        leftIconName={'search'}
        rightIconName={'QR'}
        onPressLeftIcon={() => {
          alert('Left icon');
        }}
        onPressRightIcon={() => {
          alert('Right icon');
        }}></UIHeader>
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#202124'}}>
        <View
          style={{
            flex: 30,
            backgroundColor: '#252526',
            flexDirection: 'column',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.group}
              style={{
                height: 45,
                width: 45,
                backgroundColor: 'gray',
                borderRadius: 50,
                marginTop: 10,
                marginLeft: 13,
                marginVertical: 10,
              }}
            />
            <Text style={{color: 'white', fontSize: 15, margin: 20}}>
              Tạo nhóm mới
            </Text>
          </View>
        </View>
        <View style={{flex: 20, backgroundColor: '#252526'}}>
          <View style={{height: 7, backgroundColor: 'black'}}></View>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 13,
                fontWeight: 'bold',
                marginHorizontal: 15,
                marginTop: 10,
              }}>
              Tính năng nổi bậc
            </Text>
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: 'white',
                    borderRadius: 15,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={images.celendar}
                    style={{
                      height: 30,
                      width: 30,
                      zIndex: 3,
                      position: 'absolute',
                      marginTop: -40,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  Lịch
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: 'white',
                    borderRadius: 15,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={images.clock}
                    style={{
                      height: 30,
                      width: 30,
                      zIndex: 3,
                      position: 'absolute',
                      marginTop: -40,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  Nhắc hẹn
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: 'white',
                    borderRadius: 15,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={images.nosignal}
                    style={{
                      height: 30,
                      width: 30,
                      zIndex: 3,
                      position: 'absolute',
                      marginTop: -40,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  Nhóm Offline
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: 'white',
                    borderRadius: 15,
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={images.post}
                    style={{
                      height: 30,
                      width: 30,
                      zIndex: 3,
                      position: 'absolute',
                      marginTop: -40,
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'white',
                    fontSize: 12,
                    marginTop: 5,
                  }}>
                  Chia sẻ ảnh
                </Text>
              </View>
            </View>
          </View>
          <View style={{height: 7, backgroundColor: 'black'}}></View>
        </View>
        <View style={{flex: 60}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginHorizontal: 15,
                color: 'white',
                fontSize: 13,
                marginTop: 5,
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              Nhóm đang tham gia (38)
            </Text>
            <View style={{flex: 1}}></View>
            <Image
              source={images.sort}
              style={{
                height: 15,
                width: 15,
                marginTop: 5,
                marginHorizontal: 5,
                opacity: 0.5,
              }}></Image>
            <Text
              style={{
                marginEnd: 10,
                color: 'white',
                fontSize: 13,
                marginTop: 5,
                marginBottom: 10,
                opacity: 0.5,
              }}>
              Sắp xếp
            </Text>
          </View>
          <FlatList
            data={chat}
            renderItem={({item, index}) => (
              <ItemGroup
                chat={item}
                onPress={() => {
                  alert(`name is: ${item.title}`);
                }}
              />
            )}
            keyExtractor={eachChat => eachChat.title}
            key={eachChat => eachChat.title}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default ListGroup;
