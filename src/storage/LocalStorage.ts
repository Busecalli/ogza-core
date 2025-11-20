import { IStorage } from "../base/IStorage";
export class LocalStorage implements IStorage {
  localStorageSupported: boolean;

  constructor() {
    this.localStorageSupported =
      typeof window.localStorage !== "undefined" &&
      window.localStorage !== null;
  }

  clear(): void {
    if (this.localStorageSupported) {
      localStorage.clear();
    }
  }

  getItem(key: string): string | null {
    if (this.localStorageSupported) {
      return localStorage.getItem(key);
    }
    return null;
  }

  key(index: number): string | null {
    if (this.localStorageSupported) {
      return localStorage.key(index);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.localStorageSupported) {
      localStorage.removeItem(key);
    }
  }

  setItem(key: string, value: string): void {
    if (this.localStorageSupported) {
      localStorage.setItem(key, value);
    }
  }
}
