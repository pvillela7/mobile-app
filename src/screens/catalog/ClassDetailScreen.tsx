import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';

import { getClassById } from '.../../src/modules/catalog/catalog.service';
import type { ClassDoc } from '.../../src/modules/catalog/catalog.types';

export default function ClassDetailScreen() {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const [item, setItem] = useState<ClassDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!classId) return;
      const doc = await getClassById(String(classId));
      setItem(doc);
      setLoading(false);
    })();
  }, [classId]);

  if (loading || !item) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Carregando aula…</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000' }}>
        <YoutubePlayer
          height={220}
          play={false}
          videoId={item.youtubeId}
          webViewProps={{ allowsInlineMediaPlayback: true }}
        />
      </View>

      <View style={{ padding: 16, gap: 8 }}>
        <Text style={{ fontSize: 20, fontWeight: '700' }}>{item.title}</Text>
        <Text style={{ color: '#666' }}>
          {(item.level ?? '—')} • {(item.durationMin ?? '—')} min
        </Text>
        {!!item.description && (
          <Text style={{ marginTop: 8, lineHeight: 20 }}>{item.description}</Text>
        )}
      </View>
    </ScrollView>
  );
}
