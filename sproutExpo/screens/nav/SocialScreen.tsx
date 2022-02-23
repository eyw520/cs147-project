import { StyleSheet } from 'react-native';
import styleObject from '../../styles.js';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Social({ navigation }: RootTabScreenProps<'Social'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create(styleObject);
