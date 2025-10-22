/**
 * Note model interface
 * Demonstrates Copilot generating TypeScript interfaces
 */

export interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  isImportant: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateNoteDTO = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateNoteDTO = Partial<CreateNoteDTO>;
