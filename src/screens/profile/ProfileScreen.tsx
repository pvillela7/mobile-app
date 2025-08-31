import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../../modules/auth/AuthProvider';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', gap:12 }}>
      <Text style={{ fontSize:16 }}>Logado como:</Text>
      <Text style={{ fontWeight:'600' }}>{user?.email}</Text>

      <Pressable onPress={logout} style={{ marginTop:16, backgroundColor:'#111', padding:12, borderRadius:10 }}>
        <Text style={{ color:'#fff' }}>Sair</Text>
      </Pressable>
    </View>
  );
}
