import { Button, Image, StyleSheet, Text, View } from 'react-native';

interface IDemoScreen {
  navigation: any;
}

export const DemoScreen: React.FC<IDemoScreen> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://reactjs.org/logo-og.png' }}
        style={styles.image}
      />
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
      <Button
        title="Press me"
        onPress={() => console.log('Simple Button pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  image: {
    width: 300,
    height: 300,
  },
});
