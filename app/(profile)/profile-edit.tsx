import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ProfileEditScreen() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      // Validate passwords if being changed
      if (newPassword || confirmPassword) {
        if (!currentPassword) {
          setError('Current password is required to change password');
          return;
        }
        if (newPassword !== confirmPassword) {
          setError('New passwords do not match');
          return;
        }
      }

      // Save profile logic here
      router.back();
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.title}>Edit Profile</ThemedText>

      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

      <Pressable style={styles.avatarContainer}>
        <ThemedView style={styles.avatar}>
          <IconSymbol name="person.circle" size={80} color="#a2bcf7" />
        </ThemedView>
        <ThemedText style={styles.changePhotoText}>Change Photo</ThemedText>
      </Pressable>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.label}>Name</ThemedText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Your email"
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Change Password</ThemedText>
        
        <ThemedText style={styles.label}>Current Password</ThemedText>
        <TextInput
          style={styles.input}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          placeholder="Enter current password"
        />

        <ThemedText style={styles.label}>New Password</ThemedText>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="Enter new password"
        />

        <ThemedText style={styles.label}>Confirm New Password</ThemedText>
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm new password"
        />
      </ThemedView>

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
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
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoText: {
    color: '#a2bcf7',
    marginTop: 8,
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
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
  error: {
    color: '#e02d00',
    marginBottom: 10,
    textAlign: 'center',
  },
}); 