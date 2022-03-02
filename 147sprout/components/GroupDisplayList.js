import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import USER from "../consts/user";

export default function GroupDisplayList({ groups }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View key={item.id}>
          <Text> {item.groupName}, {item.img} </Text>
          <Text> {item.groupDescription} </Text>
          <Text>  </Text>
          <Text> # members: {item.members.length} </Text>
        </View>
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
