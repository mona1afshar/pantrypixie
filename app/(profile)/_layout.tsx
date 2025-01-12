import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      headerBackTitle: ' ',  // iOS back button text
      headerTitle: '',       // Remove header title
      headerTransparent: true,
      headerBlurEffect: 'light',
    }}>
      <Stack.Screen name="preferences" />
      <Stack.Screen name="profile-edit" />
    </Stack>
  );
} 