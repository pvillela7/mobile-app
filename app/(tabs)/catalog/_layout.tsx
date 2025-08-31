// app/(tabs)/catalog/_layout.tsx
import { Stack } from 'expo-router';

export default function CatalogStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Catálogo de Aulas' }} />
      <Stack.Screen name="[classId]" options={{ title: 'Detalhe da Aula' }} />
    </Stack>
  );
}
