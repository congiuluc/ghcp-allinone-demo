/**
 * Book model interface
 * Demonstrates Copilot generating TypeScript interfaces and types
 */

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateBookDTO = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBookDTO = Partial<CreateBookDTO>;
