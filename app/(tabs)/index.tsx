import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface FoodItem {
  id: string;
  name: string;
  expiryDate: string;
  shelfNumber: number;
  imageNumber: number;
}

const sampleItems: FoodItem[] = [
  // Shelf 1
  { id: '1', name: 'Veggies', expiryDate: '2024-04-20', shelfNumber: 1, imageNumber: 1 },
  { id: '2', name: 'Spinach', expiryDate: '2024-04-21', shelfNumber: 1, imageNumber: 2 },
  { id: '3', name: 'Chicken', expiryDate: '2024-04-22', shelfNumber: 1, imageNumber: 3 },
  // Shelf 2
  { id: '4', name: 'Cod fish', expiryDate: '2024-04-23', shelfNumber: 2, imageNumber: 4 },
  { id: '5', name: 'Blueberries', expiryDate: '2024-04-24', shelfNumber: 2, imageNumber: 5 },
  { id: '6', name: 'Yogurt', expiryDate: '2024-04-25', shelfNumber: 2, imageNumber: 6 },
  // Shelf 3
  { id: '7', name: 'Milk', expiryDate: '2024-04-26', shelfNumber: 3, imageNumber: 7 },
  { id: '8', name: 'Canned Pasta', expiryDate: '2024-04-27', shelfNumber: 3, imageNumber: 8 },
  { id: '9', name: 'Canned Veggies', expiryDate: '2024-04-28', shelfNumber: 3, imageNumber: 9 },
  // Shelf 4
  { id: '10', name: 'Tortilla', expiryDate: '2024-04-29', shelfNumber: 4, imageNumber: 10 },
  { id: '11', name: 'Becel Butter', expiryDate: '2024-04-30', shelfNumber: 4, imageNumber: 11 },
  { id: '12', name: 'Tofu', expiryDate: '2024-05-01', shelfNumber: 4, imageNumber: 12 },
  // Shelf 5
  { id: '13', name: 'Chicken Nuggets', expiryDate: '2024-05-02', shelfNumber: 5, imageNumber: 13 },
  { id: '14', name: 'Tostitos', expiryDate: '2024-05-03', shelfNumber: 5, imageNumber: 14 },
  { id: '15', name: 'Artichoke hearts', expiryDate: '2024-05-04', shelfNumber: 5, imageNumber: 15 },
];

const getImageSource = (imageNumber: number) => {
  const images: { [key: number]: any } = {
    1: require('@/assets/images/image-removebg-preview (65).png'),
    2: require('@/assets/images/image-removebg-preview (86).png'),
    3: require('@/assets/images/image-removebg-preview (69).png'),
    4: require('@/assets/images/image-removebg-preview (70).png'),
    5: require('@/assets/images/image-removebg-preview (71).png'),
    6: require('@/assets/images/image-removebg-preview (72).png'),
    7: require('@/assets/images/image-removebg-preview (73).png'),
    8: require('@/assets/images/image-removebg-preview (74).png'),
    9: require('@/assets/images/image-removebg-preview (75).png'),
    10: require('@/assets/images/image-removebg-preview (76).png'),
    11: require('@/assets/images/image-removebg-preview (77).png'),
    12: require('@/assets/images/image-removebg-preview (78).png'),
    13: require('@/assets/images/image-removebg-preview (79).png'),
    14: require('@/assets/images/image-removebg-preview (80).png'),
    15: require('@/assets/images/image-removebg-preview (81).png')
  };
  return images[imageNumber];
};

export default function HomeScreen() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [items, setItems] = useState<FoodItem[]>(sampleItems);

  const handleDeleteItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const toggleItem = (id: string) => {
    setSelectedItem(selectedItem === id ? null : id);
  };

  const renderShelf = (shelfNumber: number) => (
    <View key={shelfNumber} style={styles.shelfContainer}>
      <Image 
        source={require('@/assets/images/shelf.png')}
        style={styles.shelfImage}
      />
      <View style={styles.itemsContainer}>
        {items
          .filter(item => item.shelfNumber === shelfNumber)
          .map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.foodItem}
              onPress={() => toggleItem(item.id)}>
              <Image 
                source={getImageSource(item.imageNumber)}
                style={styles.foodIcon}
              />
              
              {selectedItem === item.id && (
                <ThemedView style={styles.hoverCard}>
                  <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
                  <ThemedText type="default" style={styles.expiryDate}>
                    Expires: {item.expiryDate}
                  </ThemedText>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteItem(item.id)}>
                    <ThemedText style={styles.deleteX}>✕</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              )}
            </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">My Pantry</ThemedText>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => setItems(sampleItems)}>
            <IconSymbol name="arrow.counterclockwise" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.scannerButton}
            onPress={() => router.push("/scanner")}>
            <IconSymbol name="barcode.viewfinder" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.shelvesContainer}>
        {[1, 2, 3, 4, 5].map(shelfNumber => renderShelf(shelfNumber))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 70,
    marginTop: 20
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  shelvesContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 0,
    gap: 0,
    marginTop: -30,
  },
  shelfContainer: {
    position: 'relative',
    height: '12%',
  },
  shelfImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemsContainer: {
    position: 'absolute',
    top: -40,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 2,
  },
  foodItem: {
    position: 'relative',
    padding: 5,
    zIndex: 1,
  },
  foodIcon: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  hoverCard: {
    position: 'absolute',
    bottom: '120%',
    left: -40,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 150,
    zIndex: 10,
  },
  expiryDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteX: {
    color: 'red',
    fontSize: 16,
  },
  scannerButton: {
    padding: 10,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  resetButton: {
    padding: 10,
  },
});
