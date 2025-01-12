import { StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Types for our data
type UserIngredient = {
  id: string;
  name: string;
  quantity: string;
  expiryDate: Date;
};

type SettingsOption = {
  id: string;
  title: string;
  type: 'toggle' | 'action';
  value?: boolean;
  action?: () => void;
  icon: string;
};

const COLORS = {
  primary: '#a2bcf7',
  secondary: '#f1f55a',
  accent: '#e02d00',
  black: '#1a1a1a',
  white: '#ffffff',
  lightGray: '#f5f7fa',
  primaryLight: '#a2bcf720',
  primaryDark: '#7494d1',
  secondaryDark: '#000A2E',
};

export default function AccountScreen() {
  const [ingredients, setIngredients] = useState<UserIngredient[]>([
    {
      id: '3',
      name: 'Chicken',
      quantity: '2 lbs',
      expiryDate: new Date('2024-03-23'),
    },
    {
      id: '2',
      name: 'Cheese',
      quantity: '1 bag',
      expiryDate: new Date('2024-03-24'),
    },
    {
      id: '1',
      name: 'Milk',
      quantity: '1 gallon',
      expiryDate: new Date('2024-03-25'),
    },
  ]);

  const [settings, setSettings] = useState<SettingsOption[]>([
    {
      id: '1',
      title: 'Expiry Notifications',
      type: 'toggle',
      value: true,
      icon: 'bell',
    },
    {
      id: '2',
      title: 'Daily Recipe Suggestions',
      type: 'toggle',
      value: true,
      icon: 'fork.knife.circle',
    },
    {
      id: '3',
      title: 'Food Preferences',
      type: 'action',
      action: () => router.push('/(profile)/preferences'),
      icon: 'heart',
    },
    {
      id: '4',
      title: 'Edit Profile',
      type: 'action',
      action: () => router.push('/(profile)/profile-edit'),
      icon: 'person',
    },
    {
      id: '5',
      title: 'Help & Support',
      type: 'action',
      action: () => console.log('Help & Support'),
      icon: 'questionmark.circle',
    },
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id && setting.type === 'toggle'
          ? { ...setting, value: !setting.value }
          : setting
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Profile</ThemedText>
        <Pressable onPress={() => router.push('/profile-edit')}>
          <ThemedView style={styles.profileCard}>
            <IconSymbol name="person.circle" size={60} color={COLORS.primary} />
            <ThemedView style={styles.profileInfo}>
              <ThemedText style={styles.profileName}>John Doe</ThemedText>
              <ThemedText style={styles.profileEmail}>john.doe@example.com</ThemedText>
            </ThemedView>
          </ThemedView>
        </Pressable>
      </ThemedView>

      {/* Ingredient Inventory Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>My Ingredients</ThemedText>
        {ingredients.map((ingredient) => (
          <ThemedView key={ingredient.id} style={styles.ingredientCard}>
            <IconSymbol name="leaf" size={24} color={COLORS.primary} />
            <ThemedView style={styles.ingredientInfo}>
              <ThemedText style={styles.ingredientName}>{ingredient.name}</ThemedText>
              <ThemedText style={styles.ingredientDetails}>
                {ingredient.quantity} · Expires {ingredient.expiryDate.toLocaleDateString()}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Settings Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Settings</ThemedText>
        {settings.map((setting) => (
          <Pressable
            key={setting.id}
            style={styles.settingCard}
            onPress={() => setting.type === 'action' && setting.action?.()}
          >
            <ThemedView style={styles.settingContent}>
              {/* <IconSymbol name={.icon} size={24} color={COLORS.primary} /> */}
              <ThemedText style={styles.settingTitle}>{setting.title}</ThemedText>
            </ThemedView>
            {setting.type === 'toggle' ? (
              <Switch
                value={setting.value}
                onValueChange={() => toggleSetting(setting.id)}
                trackColor={{ false: '#767577', true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            ) : (
              <IconSymbol name="chevron.right" size={20} color={COLORS.black} />
            )}
          </Pressable>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 60,
    backgroundColor: COLORS.lightGray,
  },
  section: {
    marginBottom: 24,
    gap: 12,
    backgroundColor: COLORS.lightGray,
  },
  sectionTitle: {
    color: COLORS.black,
    backgroundColor: COLORS.lightGray,
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    gap: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '600',
  },
  profileEmail: {
    color: COLORS.black + '99',
    fontSize: 14,
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ingredientInfo: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  ingredientName: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ingredientDetails: {
    color: COLORS.black + '99',
    fontSize: 14,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingTitle: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '500',
  },
});
