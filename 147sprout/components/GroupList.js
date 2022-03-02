import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import USER from "../consts/user";

export default function GroupList({ groups }) {
  const navigation = useNavigation();

  const joinGroup = async () => {

  }

  const leaveGroup = async () => {
    
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable onPress={() => {navigation.navigate(item.groupName, {
          groupData: item,
        })}}>
          <View key={item.id}>
            <Text> {item.groupName}, {item.img} </Text>
            <Text> {item.groupDescription} </Text>
            <Text> {item.members.length} </Text>
          </View>
        </Pressable>
        {USER.groups.includes(item.id) ?
          <Pressable onPress={() => joinGroup()}>
            <Text> Leave Group </Text>
          </Pressable>
        :
          <Pressable onPress={() => joinGroup()}>
            <Text> Join Group </Text>
          </Pressable>
        }
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={groups}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderStyle: "solid",
    borderWidth:  1
  },
});
