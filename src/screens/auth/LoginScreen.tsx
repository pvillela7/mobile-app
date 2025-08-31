// app/(public)/login.tsx
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAuth } from '../../modules/auth/AuthProvider';



type Mode = 'login' | 'register';

export default function LoginRoute() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');

  // Mapeia mensagens de erro do Firebase para PT-BR
  function mapErrorMessage(e: any): string {
    const code: string | undefined = e?.code;
    if (!code) return e?.message ?? 'Ocorreu um erro. Tente novamente.';

    switch (code) {
      case 'auth/invalid-email':
        return 'E-mail inválido.';
      case 'auth/missing-password':
      case 'auth/invalid-password':
        return 'Senha inválida.';
      case 'auth/weak-password':
        return 'Senha muito fraca. Use ao menos 6 caracteres.';
      case 'auth/user-not-found':
        return 'Usuário não encontrado. Cadastre-se antes.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/email-already-in-use':
        return 'E-mail já cadastrado. Tente entrar.';
      case 'auth/network-request-failed':
        return 'Falha de rede. Verifique sua conexão.';
      default:
        return e?.message ?? 'Erro inesperado. Tente novamente.';
    }
  }

  async function handleLogin() {
    if (!email.trim()) return Alert.alert('Atenção', 'Informe seu e-mail.');
    if (pass.length < 6) return Alert.alert('Atenção', 'Senha deve ter ao menos 6 caracteres.');
    try {
      await login(email, pass);
      // Redireciona via guard automaticamente
    } catch (e: any) {
      Alert.alert('Erro ao entrar', mapErrorMessage(e));
    }
  }

  async function handleRegister() {
    if (!email.trim()) return Alert.alert('Atenção', 'Informe seu e-mail.');
    if (pass.length < 6) return Alert.alert('Atenção', 'Senha deve ter ao menos 6 caracteres.');
    if (pass !== confirm) return Alert.alert('Atenção', 'As senhas não conferem.');
    try {
      await register(email, pass);
      // Redireciona via guard automaticamente
    } catch (e: any) {
      Alert.alert('Erro ao cadastrar', mapErrorMessage(e));
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Pilates — Acesso</Text>

        {/* "Tabs" */}
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setMode('login')}
            style={[styles.tab, mode === 'login' && styles.tabActive]}
          >
            <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>Entrar</Text>
          </Pressable>
          <Pressable
            onPress={() => setMode('register')}
            style={[styles.tab, mode === 'register' && styles.tabActive]}
          >
            <Text style={[styles.tabText, mode === 'register' && styles.tabTextActive]}>
              Cadastrar
            </Text>
          </Pressable>
        </View>

        {/* Campos */}
        <View style={styles.form}>
          <TextInput
            placeholder="E-mail"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry
            value={pass}
            onChangeText={setPass}
            style={styles.input}
          />

          {mode === 'register' && (
            <TextInput
              placeholder="Confirmar senha"
              secureTextEntry
              value={confirm}
              onChangeText={setConfirm}
              style={styles.input}
            />
          )}

          {mode === 'login' ? (
            <Pressable onPress={handleLogin} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Entrar</Text>
            </Pressable>
          ) : (
            <Pressable onPress={handleRegister} style={styles.primaryButton}>
              <Text style={styles.primaryText}>Criar conta</Text>
            </Pressable>
          )}

          {/* Opcional: “Esqueci minha senha” (implementar depois) */}
          {/* <Pressable onPress={...} style={styles.linkBtn}>
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </Pressable> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 8 },

  tabs: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#111',
  },
  tabText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#fff',
  },

  form: { marginTop: 12, gap: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.select({ ios: 12, android: 10 }),
  },

  primaryButton: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 6,
  },
  primaryText: { color: '#fff', textAlign: 'center', fontWeight: '600' },

  linkBtn: { paddingVertical: 10 },
  linkText: { textAlign: 'center', color: '#007aff', fontWeight: '500' },
});
