import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Colors, Layout, Typography } from "../styles";

export default function GroupPosts({ posts }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View key={item.title}>
          <Text style={styles.body}>{item.posterId}, {item.id}</Text>
          <Text style={styles.body}>{item.contents}</Text>
          <Text style={styles.body}>{item.likes}</Text>
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
  topContainer: {
    ...Layout.topContainer,
  },
  container: {
    ...Layout.container,
  },
  body: {
    ...Typography.body
  }
});
