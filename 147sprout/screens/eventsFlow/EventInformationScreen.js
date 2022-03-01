import { StyleSheet, Button, Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EventInformationScreen({ route }) {
  const navigation = useNavigation();
  const { eventData } = route.params;

  return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text> return </Text>
        </Pressable>
        <View>
          <Text>{eventData.eventName}</Text>
          <Text>{eventData.description}</Text>
        </View>
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
  },
});
