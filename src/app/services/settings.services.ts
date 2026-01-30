import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private _storage: Storage | null = null;
  private darkMode = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadSettings();
  }

  async loadSettings() {
    if (!this._storage) return;
    const savedDarkMode = await this._storage.get('darkMode');
    this.darkMode = savedDarkMode || false;
    this.applyDarkMode(this.darkMode);
  }

  applyDarkMode(isDark: boolean) {
    this.darkMode = isDark;
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
    this._storage?.set('darkMode', isDark);
  }

  isDarkMode() {
    return this.darkMode;
  }

  // MEJORA 1: Gestión del nombre
  async saveNombre(nombre: string) {
    await this._storage?.set('userName', nombre);
  }

  async getNombre(): Promise<string> {
    if (!this._storage) await this.init();
    return await this._storage?.get('userName') || '';
  }
}