/**
 * Note service
 * Demonstrates Copilot generating Angular services with dependency injection
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note, CreateNoteDTO, UpdateNoteDTO } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes$ = new BehaviorSubject<Note[]>([]);
  private nextId = 1;

  constructor() {
    this.initializeSampleData();
  }

  /**
   * Initialize with sample data
   */
  private initializeSampleData(): void {
    const initialNotes: Note[] = [
      {
        id: 1,
        title: 'Learn Angular',
        content: 'Master Angular framework for building SPAs',
        category: 'Learning',
        isImportant: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'GitHub Copilot Demo',
        content: 'Create demo apps in multiple languages',
        category: 'Work',
        isImportant: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: 'Buy groceries',
        content: 'Milk, bread, eggs',
        category: 'Personal',
        isImportant: false,
        createdAt: new Date(),
      },
    ];
    this.notes$.next(initialNotes);
    this.nextId = 4;
  }

  /**
   * Get all notes as observable
   */
  getNotes(): Observable<Note[]> {
    return this.notes$.asObservable();
  }

  /**
   * Get note by ID
   */
  getNoteById(id: number): Note | undefined {
    return this.notes$.value.find(note => note.id === id);
  }

  /**
   * Create new note
   */
  createNote(dto: CreateNoteDTO): Note {
    const note: Note = {
      id: this.nextId++,
      ...dto,
      createdAt: new Date(),
    };
    this.notes$.next([...this.notes$.value, note]);
    return note;
  }

  /**
   * Update note
   */
  updateNote(id: number, dto: UpdateNoteDTO): Note | undefined {
    const notes = this.notes$.value;
    const note = notes.find(n => n.id === id);
    if (!note) return undefined;

    const updatedNote = {
      ...note,
      ...dto,
      updatedAt: new Date(),
    };

    const index = notes.findIndex(n => n.id === id);
    notes[index] = updatedNote;
    this.notes$.next([...notes]);
    return updatedNote;
  }

  /**
   * Delete note
   */
  deleteNote(id: number): boolean {
    const notes = this.notes$.value;
    const index = notes.findIndex(n => n.id === id);
    if (index === -1) return false;

    notes.splice(index, 1);
    this.notes$.next([...notes]);
    return true;
  }

  /**
   * Get notes by category
   */
  getNotesByCategory(category: string): Observable<Note[]> {
    return new Observable(observer => {
      const filtered = this.notes$.value.filter(n => n.category === category);
      observer.next(filtered);
    });
  }

  // DEMO 1: Type the implementation
  // Hint: Start with: return new Observable(observer =>
  // Watch Copilot suggest the filter and search logic
  searchNotes(searchTerm: string): Observable<Note[]> {
    // TODO: DEMO - Type the implementation
  }

  // DEMO 2: Type the implementation
  // Hint: Start with: return new Observable(observer =>
  // Watch Copilot suggest the isImportant filter
  getImportantNotes(): Observable<Note[]> {
    // TODO: DEMO - Type the implementation
  }

  // DEMO 3: Type the implementation
  // Hint: Start with: let sorted = [...this.notes$.value];
  // Watch Copilot suggest the switch/sort logic
  getSortedNotes(sortBy: 'date' | 'title' | 'importance'): Observable<Note[]> {
    // TODO: DEMO - Type the implementation
  }
}
