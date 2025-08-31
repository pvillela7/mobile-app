import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { getClasses } from '.../../src/modules/catalog/catalog.service'; 
import type { ClassDoc } from '.../../src/modules/catalog/catalog.types';

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}



export default function CatalogScreen() {
  const [data, setData] = useState<ClassDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const rows = await getClasses(true, 100);
        setData(rows);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Carregando aulas…</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(it) => it.id}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/catalog/${item.id}`)}
          style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', gap: 12 }}
        >
          <Image
            source={{ uri: ytThumb(item.youtubeId) }}
            style={{ width: 100, height: 60, borderRadius: 8, backgroundColor: '#ddd' }}
            resizeMode="cover"
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
            <Text style={{ color: '#666', marginTop: 4 }}>
              {(item.level ?? '—')} • {(item.durationMin ?? '—')} min
            </Text>
            {!!item.tags?.length && (
              <Text style={{ color: '#888', marginTop: 2 }} numberOfLines={1}>
                {item.tags.join(' · ')}
              </Text>
            )}
          </View>
        </Pressable>
      )}
    />
  );
}
