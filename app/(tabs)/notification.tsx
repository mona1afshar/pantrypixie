import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Types for our data  
type Ingredient = {
  id: string;
  name: string;
  expiryDate: Date;
  daysUntilExpiry: number;
};

type RecipeRecommendation = {
  id: string;
  name: string;
  ingredients: string[];
  difficulty: 'easy' | 'medium' | 'hard';
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

export default function NotificationScreen() {
  const [expiringIngredients, setExpiringIngredients] = useState<Ingredient[]>([
    {
      id: '3',
      name: 'Chicken',
      expiryDate: new Date('2024-03-23'),
      daysUntilExpiry: 0,
    },
    {
      id: '2',
      name: 'Cheese',
      expiryDate: new Date('2024-03-24'),
      daysUntilExpiry: 1,
    },
    {
      id: '1',
      name: 'Milk',
      expiryDate: new Date('2024-03-25'),
      daysUntilExpiry: 2,
    },

  ]);

  const [recommendations, setRecommendations] = useState<RecipeRecommendation[]>([
    // Dummy recommendations - replace with real recommendations
    {
      id: '1',
      name: 'Creamy Spinach Chicken',
      ingredients: ['Chicken', 'Spinach', 'Milk'],
      difficulty: 'medium',
    },
    {
      id: '2',
      name: 'Spinach Smoothie',
      ingredients: ['Spinach', 'Milk'],
      difficulty: 'easy',
    },
  ]);

  const getExpiryColor = (days: number) => {
    if (days === 0) return COLORS.accent;
    if (days <= 2) return COLORS.secondaryDark;
    return COLORS.primaryDark;
  };

  const navigateToRecipeChat = (recipe?: RecipeRecommendation) => {
    // Navigate to chat with pre-filled context about the recipe
    router.push('/chatbot');
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Expiring Soon</ThemedText>
        {expiringIngredients.map((ingredient) => (
           <Pressable
           key={ingredient.id}
           style={styles.recipeCard}
           onPress={() => navigateToRecipeChat()}
         >
          <ThemedView key={ingredient.id} style={styles.ingredientCard}>
            <IconSymbol 
              name="exclamationmark.circle.fill" 
              size={24} 
              color={getExpiryColor(ingredient.daysUntilExpiry)} 
            />
            <ThemedView style={styles.ingredientInfo}>
              <ThemedText style={styles.ingredientName}>{ingredient.name}</ThemedText>
              <ThemedText style={{ color: getExpiryColor(ingredient.daysUntilExpiry), fontWeight: '500' }}>
                {ingredient.daysUntilExpiry === 0
                  ? 'Expires today!'
                  : `Expires in ${ingredient.daysUntilExpiry} days`}
              </ThemedText>
            </ThemedView>
          </ThemedView>
          </Pressable>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Recommended Recipes</ThemedText>
        {recommendations.map((recipe) => (
          <Pressable
            key={recipe.id}
            style={styles.recipeCard}
            onPress={() => navigateToRecipeChat(recipe)}
          >
            <ThemedView style={styles.recipeHeader}>
              <ThemedText style={styles.recipeName}>{recipe.name}</ThemedText>
              <ThemedText style={styles.difficultyTag}>
                {recipe.difficulty}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.ingredientsList}>
              Uses: {recipe.ingredients.join(', ')}
            </ThemedText>
            <ThemedText style={styles.tapPrompt}>
              Tap to get the recipe →
            </ThemedText>
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
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    marginBottom: 4,
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
  recipeCard: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeName: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '600',
  },
  difficultyTag: {
    fontSize: 12,
    color: COLORS.primaryDark,
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontWeight: '500',
  },
  ingredientsList: {
    color: COLORS.black + '99',
    fontSize: 14,
  },
  tapPrompt: {
    color: COLORS.primary,
    marginTop: 8,
    fontWeight: '500',
  },
});
