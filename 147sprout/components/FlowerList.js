import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Layout, Typography } from "../styles";
import * as Images from "../assets/images";

export default function EventList({ flowers }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Pressable style={styles.hContainer} onPress={() => {navigation.navigate("View Flower", {
          flowerData: item,
        })}}>
          <Image style={styles.image} source={Images.garden[item.imgLarge]} />
          <View key={item.id} style={styles.flower}>
            <Text numberOfLines={1} style={styles.subheader}>{item.flowerName}</Text>
            {item.state === "growing" ?
            <View style={styles.progressBar}>
              <View style={[styles.progress, {width: `${item.growth}%`}]}>
                <Text style={[styles.small, styles.progressText]}>{item.growth}%</Text>
              </View>
            </View>
            :
            <Text numberOfLines={1} style={styles.small}>{item.state}</Text>
            }
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={flowers}
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
    marginBottom: 20
  },
  hContainer: {
    ...Layout.hContainer,
    alignItems: "center",
  },
  flower: {
    ...Layout.container,
    flex: 1
  },
  image: {
    ...Layout.image,
    marginRight: 20,
    height: 90,
    width: 90,
  },
  subheader: {
    ...Typography.subheader,
    lineHeight: 16,
    marginBottom: 10
  },
  body: {
    ...Typography.body,
  },
  small: {
    ...Typography.small,
    fontSize: 12,
    lineHeight: 12,
    fontStyle: "italic",
    color: Colors.lightGray,
  },
  progressBar: {
    ...Layout.button,
    backgroundColor: Colors.darkGreen,
    borderColor: Colors.pink,
    borderWidth: 3,
    paddingVertical: 0,
    paddingHorizontal: 0,
    width: "100%",
  },
  progress: {
    ...Layout.button,
    paddingVertical: 7.5,
    paddingHorizontal: 10,
    backgroundColor: Colors.green,
    borderWidth: 0,
    alignSelf: "flex-start",
  },
  progressText: {
    color: Colors.white,
    alignSelf: "flex-end",
    fontStyle: "normal"
  }
});
