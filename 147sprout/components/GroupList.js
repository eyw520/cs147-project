import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Layout, Typography } from "../styles";
import * as Images from "../assets/images/";

export default function GroupList({ groups }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={styles.group}
        onPress={() => {navigation.navigate(item.groupName, {
          groupId: item.id,
          data: item
        })}}
      >
        <View style={styles.container}>
            <View key={item.id} style={styles.interest}>
              <Image style={styles.image} source={Images.interests[item.img]} />
              <View style={styles.details}>
                <Text numberOfLines={1} style={styles.subheader}>{item.groupName}</Text>
                <Text numberOfLines={1} style={styles.small}># members: {item.members.length}</Text>
                <Text numberOfLines={2} style={styles.body}>{item.groupDescription}</Text>
              </View>
            </View>
        </View>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.topContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={groups}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    ...Layout.topContainer,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  group: {
    ...Layout.topContainer,
    backgroundColor: Colors.offWhite,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  container: {
    ...Layout.container,
    height: 75,
    overflow: "hidden"
  },
  interest: {
    ...Layout.container,
    flexDirection: "row",
  },
  image: {
    ...Layout.image,
    width: 75,
    height: 75,
    borderRadius: 10,
    marginRight: 10
  },
  details: {
    flex: 1
  },
  body: {
    ...Typography.body,
    lineHeight: 20
  },
  subheader: {
    ...Typography.subheader,
    lineHeight: 20
  },
  small: {
    ...Typography.smallBody,
    lineHeight: 15,
    textTransform: "uppercase"
  }
});
