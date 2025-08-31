import { emailSignIn, emailSignUp, signOut, observeAuth } from './auth.service';

export const AuthController = {
  observeAuth,
  async login(email: string, password: string) {
    const e = email.trim().toLowerCase();
    return emailSignIn(e, password);
  },
  async register(email: string, password: string) {
    const e = email.trim().toLowerCase();
    return emailSignUp(e, password);
  },
  async logout() {
    await signOut();
  },
};
