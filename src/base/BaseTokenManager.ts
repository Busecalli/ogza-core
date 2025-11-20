export interface BaseTokenManager {
  getToken(): string | null;
  saveToken(token: string): void;
  destroyToken(): void;
}
