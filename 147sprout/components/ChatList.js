import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Layout, Typography } from "../styles";
import * as Images from "../assets/images/";

import USER from "../consts/user";

export default function ChatList({ chats }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {navigation.navigate("Chat", {
          chatData: item,
        })}}>
          {item.chatName === "" ?
            <Text>Direct Message w/ {item.members.filter(item => item !== USER.id)[0]}</Text>
            :
            <Text>{item.chatName}</Text>
          }

          {item.latestSender === USER.name ?
          <Text>You</Text>
          :
          <Text>{item.latestSender}</Text>
          }

          <Text>{item.latestMessage}</Text>
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
});
