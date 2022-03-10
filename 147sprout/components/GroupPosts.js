import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from 'react-native';
import { Colors, Layout, Typography } from "../styles";
import * as Images from "../assets/images/";

export default function GroupPosts({ posts }) {
  const renderItem = ({ item }) => {
    var name = item.posterPhoto;
    name = name.substring(0, name.indexOf( ".png" ))

    return (
      <View style={styles.hContainer} key={item.title}>
        <Image style={styles.image} source={Images.profiles[name]} />
        <View style={styles.right}>
          <Text numberOfLines={3} style={styles.body}>{item.contents}</Text>
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
  hContainer: {
    ...Layout.hContainer,
    marginBottom: 15,
    alignItems: "center"
  },
  image: {
    ...Layout.image,
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20
  },
  body: {
    ...Typography.body,
  },
  right: {
    ...Layout.hContainer,
    flex: 1,
    overflow: "hidden"
  }
});
