import { IStorage } from "../base/IStorage";

export class SessionStorage implements IStorage {
  clear(): void {
    sessionStorage.clear();
  }

  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  key(index: number): string | null {
    return sessionStorage.key(index);
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }
}
