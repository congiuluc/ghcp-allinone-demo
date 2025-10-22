/**
 * App component - main Angular component
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './components/note-list/note-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NoteListComponent],
  template: `
    <div class="app">
      <app-note-list></app-note-list>
    </div>
  `,
  styles: [`
    .app {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem 1rem;
    }
  `]
})
export class AppComponent {
  title = 'Copilot Demo - Angular';
}
