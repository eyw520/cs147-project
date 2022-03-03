import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

export default function GroupPosts({ posts }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View key={item.title}>
          <Text> {item.posterId}, {item.id} </Text>
          <Text> {item.contents} </Text>
          <Text> {item.likes} </Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={posts}
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
