import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ListItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    priceUnit: string;
  };
}

const ListItem: React.FC<ListItemProps> = ({ item }) => {
  const placeholderImage = require('../assets/images/logo.png'); // Replace with your placeholder image

  return (
    <View style={styles.listItem}>
      <Image
        source={item.image ? { uri: item.image } : placeholderImage}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.body}>{item.description}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
          <Text style={{ fontWeight: 'bold' }}>Price: </Text>
          <Text style={styles.body}>{item.price}</Text>
          <Text style={styles.body}>{item.priceUnit}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  image: {
    width: 50, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    borderRadius: 25, // Assuming you want a circular image
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
});

export default ListItem;
