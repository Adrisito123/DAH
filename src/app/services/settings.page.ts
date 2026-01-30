import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingsService } from './settings.services'; 
import { addIcons } from 'ionicons';
import { personOutline, moonOutline } from 'ionicons/icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {
  isDark: boolean = false;
  nombreUsuario: string = '';

  constructor(private settingsService: SettingsService) {
    addIcons({ personOutline, moonOutline });
  }

  async ngOnInit() {
    this.isDark = this.settingsService.isDarkMode();
    this.nombreUsuario = await this.settingsService.getNombre();
  }

  toggleChange(event: any) {
    this.settingsService.applyDarkMode(event.detail.checked);
  }

  guardarNombre() {
    this.settingsService.saveNombre(this.nombreUsuario);
  }
}