export type ClassDoc = {
  id: string;
  title: string;
  description?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  durationMin?: number;
  tags?: string[];
  focus?: string[];
  equipment?: string[];
  youtubeId: string;       // sempre obrigatório
  published: boolean;
  createdAt?: any;
};
