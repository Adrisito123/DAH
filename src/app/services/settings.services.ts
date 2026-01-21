// src/app/services/settings.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private storageReady = false;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Crear instancia de Storage
    await this.storage.create();
    this.storageReady = true;

    // Aplicar modo oscuro al iniciar
    const darkMode = await this.storage.get('darkMode');
    if (darkMode !== null) {
      document.body.classList.toggle('dark', darkMode);
    }
  }

  async setDarkMode(isDark: boolean) {
    if (!this.storageReady) return;
    document.body.classList.toggle('dark', isDark);
    await this.storage.set('darkMode', isDark);
  }

  async loadDarkMode(): Promise<boolean | null> {
    if (!this.storageReady) return null;
    const dark = await this.storage.get('darkMode');
    return dark;
  }
}
