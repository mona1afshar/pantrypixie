import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, Switch, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type Allergy = {
  id: string;
  name: string;
  selected: boolean;
};

export default function PreferencesScreen() {
  const [familySize, setFamilySize] = useState('4');
  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: '1', name: 'Peanuts', selected: false },
    { id: '2', name: 'Dairy', selected: false },
    { id: '3', name: 'Gluten', selected: false },
    { id: '4', name: 'Shellfish', selected: false },
  ]);
  const [vegetarian, setVegetarian] = useState(false);
  const [vegan, setVegan] = useState(false);

  const toggleAllergy = (id: string) => {
    setAllergies(prev => 
      prev.map(allergy => 
        allergy.id === id 
          ? { ...allergy, selected: !allergy.selected }
          : allergy
      )
    );
  };

  const handleSave = () => {
    // Save preferences logic here
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>Food Preferences</ThemedText>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Family Size</ThemedText>
        <TextInput
          style={styles.input}
          value={familySize}
          onChangeText={setFamilySize}
          keyboardType="number-pad"
          placeholder="Number of people"
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Dietary Restrictions</ThemedText>
        <ThemedView style={styles.toggleRow}>
          <ThemedText>Vegetarian</ThemedText>
          <Switch value={vegetarian} onValueChange={setVegetarian} />
        </ThemedView>
        <ThemedView style={styles.toggleRow}>
          <ThemedText>Vegan</ThemedText>
          <Switch value={vegan} onValueChange={setVegan} />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Allergies</ThemedText>
        {allergies.map(allergy => (
          <ThemedView key={allergy.id} style={styles.toggleRow}>
            <ThemedText>{allergy.name}</ThemedText>
            <Switch 
              value={allergy.selected} 
              onValueChange={() => toggleAllergy(allergy.id)}
            />
          </ThemedView>
        ))}
      </ThemedView>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <ThemedText style={styles.saveButtonText}>Save Preferences</ThemedText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 60,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  saveButton: {
    backgroundColor: '#a2bcf7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#000A2E',
    fontSize: 16,
    fontWeight: '600',
  },
}); 