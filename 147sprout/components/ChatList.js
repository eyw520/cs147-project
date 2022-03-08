import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Layout, Typography } from "../styles";
import * as Images from "../assets/images/";

import USER from "../consts/user";

export default function ChatList({ chats }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable style={styles.chat} onPress={() => {navigation.navigate("Chat", {
          chatData: item,
        })}}>
          <View>
            {item.chatName === "" ?
              <Text style={styles.body}>Direct Message w/ {item.members.filter(item => item !== USER.id)[0]}</Text>
              :
              <Text style={styles.body}>{item.chatName}</Text>
            }

            <View style={styles.hContainer}>
              {item.latestSender === USER.name ?
              <Text numberOfLines={1} style={styles.body}>You: </Text>
              :
              <Text numberOfLines={1} style={styles.body}>{item.latestSender}: </Text>
              }
              <Text numberOfLines={1} style={styles.body}>{item.latestMessage}</Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
  },
  container: {
    ...Layout.container,
  },
  chat: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    marginVertical: 10
  },
  hContainer: {
    ...Layout.container,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  body: {
    ...Typography.body,
    overflow: "hidden"
  }
});
