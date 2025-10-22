/**
 * Note list component
 * Demonstrates Copilot generating Angular components
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { Note, CreateNoteDTO } from '../models/note.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, OnDestroy {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  selectedCategory = 'All';
  // TODO: DEMO Step 1 - Add search state
  // Instructions for Copilot: "Add a property for searchTerm: string = '';"
  searchTerm = '';
  newNoteTitle = '';
  newNoteContent = '';
  newNoteCategory = 'Personal';
  isImportant = false;

  private destroy$ = new Subject<void>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load notes from service
   */
  private loadNotes(): void {
    this.noteService.getNotes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(notes => {
        this.notes = notes;
        this.applyFilter();
      });
  }

  /**
   * Apply category filter
   */
  applyFilter(): void {
    if (this.selectedCategory === 'All') {
      this.filteredNotes = this.notes;
    } else {
      this.filteredNotes = this.notes.filter(n => n.category === this.selectedCategory);
    }
  }

  /**
   * Add new note
   */
  addNote(): void {
    if (!this.newNoteTitle.trim()) {
      alert('Please enter a note title');
      return;
    }

    const newNote: CreateNoteDTO = {
      title: this.newNoteTitle,
      content: this.newNoteContent,
      category: this.newNoteCategory,
      isImportant: this.isImportant,
    };

    this.noteService.createNote(newNote);
    this.resetForm();
  }

  /**
   * Delete note
   */
  deleteNote(id: number): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.noteService.deleteNote(id);
    }
  }

  /**
   * Toggle note importance
   */
  toggleImportance(note: Note): void {
    this.noteService.updateNote(note.id, { isImportant: !note.isImportant });
  }

  /**
   * Reset form fields
   */
  private resetForm(): void {
    this.newNoteTitle = '';
    this.newNoteContent = '';
    this.newNoteCategory = 'Personal';
    this.isImportant = false;
  }

  /**
   * Get unique categories
   */
  getCategories(): string[] {
    const categories = ['All', ...new Set(this.notes.map(n => n.category))];
    return categories;
  }

  /**
   * DEMO Step 1: Generate method to handle search
   * 
   * Instructions for Copilot:
   * "Generate a method handleSearch that:
   * - Calls this.noteService.searchNotes(this.searchTerm)
   * - Uses pipe(takeUntil(this.destroy$))
   * - Subscribes with .subscribe()
   * - Updates this.filteredNotes with results
   * - Return the subscription"
   */
  handleSearch(): void {
    // TODO: Let Copilot suggest the implementation
    throw new Error('TODO: Implement with Copilot suggestion');
  }

  /**
   * DEMO Step 2: Generate method to sort notes
   * 
   * Instructions for Copilot:
   * "Generate a method sortNotes that:
   * - Takes sortBy parameter: 'date' | 'title' | 'importance'
   * - Calls this.noteService.getSortedNotes(sortBy)
   * - Uses pipe(takeUntil(this.destroy$))
   * - Subscribes and updates this.filteredNotes"
   */
  sortNotes(sortBy: 'date' | 'title' | 'importance'): void {
    // TODO: Let Copilot suggest the implementation
    throw new Error('TODO: Implement with Copilot suggestion');
  }
}
