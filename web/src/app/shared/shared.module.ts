import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

/**
 * Shared UI and pipes — import here as the app grows.
 * Feature modules should import SharedModule instead of CommonModule when they need shared widgets.
 */
@NgModule({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class SharedModule {}
