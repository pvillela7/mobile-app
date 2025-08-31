// app/(tabs)/_layout.tsx
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/modules/auth/AuthProvider';

export default function TabsLayout() {
  const { user, loading } = useAuth();
  if (loading) return null;

  if (!user) return <Redirect href="/(public)/login" />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index" // app/(tabs)/index.tsx
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="catalog" // app/(tabs)/catalog/index.tsx
        options={{
          title: 'Catálogo',
          tabBarLabel: 'Catálogo',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile/index" // importante usar "profile/index" se seu arquivo for app/(tabs)/profile/index.tsx
        options={{
          title: 'Perfil',
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
