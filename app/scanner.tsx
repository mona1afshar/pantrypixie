import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface DetectedItem {
  Food: string;
  Expiry: string;
}

export default function ScannerScreen() {
  const [loading, setLoading] = useState(false);
  const [detectedItems, setDetectedItems] = useState<DetectedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [imageSelected, setImageSelected] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageSelected(true);
        fetchItems(); // Fetch items after image is selected
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select image');
    }
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=TVmXEL6UfGrmMwH5gb-bV4COiAhlxkAe0IDEqn-oybVgzjzT4vg12oWQ63yKdpw6bC4Pz0jds-gkPnyE95U-8xQ59--2EH9Sm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLhN3ZPGFKja603uLLSPSPj0bxhZwS0nRUwqbhvF08wvmTT569xVBR8TmW0KLtCRsdn4LGr5rupaM04eywO1lh-gfUKMdbOdNw&lib=Mvg4JKV_v-rjtjdFGiNcZ6IGwgBN3B_WD');

      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const data = await response.json();
      setDetectedItems(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setImageSelected(false);
    setDetectedItems([]);
    setError(null);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}>
          <ThemedText style={styles.closeText}>✕</ThemedText>
        </TouchableOpacity>
        
        {(imageSelected || detectedItems.length > 0) && (
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={resetScanner}>
            <IconSymbol name="arrow.counterclockwise" size={24} color="#000" />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <ThemedText style={styles.loadingText}>
              {imageSelected ? 'Analyzing image...' : 'Fetching items...'}
            </ThemedText>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={imageSelected ? fetchItems : pickImage}>
              <ThemedText>Try Again</ThemedText>
            </TouchableOpacity>
          </View>
        ) : detectedItems.length > 0 ? (
          <View style={styles.resultsContainer}>
            <ThemedText type="title" style={styles.resultsTitle}> Items Added:</ThemedText>
            {detectedItems.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <ThemedText style={styles.itemName}>{item.Food}</ThemedText>
                <ThemedText style={styles.expiryDate}>
                  {new Date(item.Expiry).toLocaleDateString()}
                </ThemedText>
              </View>
            ))}
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={pickImage}>
              <ThemedText>Scan Another Image</ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={pickImage}>
            <IconSymbol name="chevron.right" size={24} color="#000" />
            <ThemedText style={styles.uploadText}>Select Image from Gallery</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
  },
  uploadText: {
    fontSize: 16,
    marginLeft: 8,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  errorContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
  },
  resultsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  resultsTitle: {
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  expiryDate: {
    fontSize: 14,
    color: '#666',
  },
  scanButton: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
  },
});
