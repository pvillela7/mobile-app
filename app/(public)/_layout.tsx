import { Stack, Redirect } from 'expo-router';
import { useAuth } from '../../src/modules/auth/AuthProvider';

export default function PublicLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;          // você pode mostrar um splash aqui
  if (user) return <Redirect href="/(tabs)" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
