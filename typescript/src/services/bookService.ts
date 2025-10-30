/**
 * Book service
 * Demonstrates Copilot generating service methods for data management
 */

import { Book, CreateBookDTO, UpdateBookDTO } from '../models/Book';

export class BookService {
  private books: Book[] = [];
  private nextId = 1;

  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    this.books = [
      {
        id: 1,
        title: 'The Pragmatic Programmer',
        author: 'David Thomas & Andrew Hunt',
        isbn: '978-0-201-61622-4',
        publishedYear: 1999,
        isAvailable: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '978-0-13-235088-8',
        publishedYear: 2008,
        isAvailable: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: 'Design Patterns',
        author: 'Gang of Four',
        isbn: '978-0-201-63361-0',
        publishedYear: 1994,
        isAvailable: false,
        createdAt: new Date(),
      },
    ];
    this.nextId = 4;
  }

  getAllBooks(): Book[] {
    return this.books;
  }

  getBookById(id: number): Book | undefined {
    return this.books.find(book => book.id === id);
  }

  createBook(dto: CreateBookDTO): Book {
    const book: Book = {
      id: this.nextId++,
      ...dto,
      createdAt: new Date(),
    };
    this.books.push(book);
    return book;
  }

  updateBook(id: number, dto: UpdateBookDTO): Book | undefined {
    const book = this.books.find(b => b.id === id);
    if (!book) return undefined;

    Object.assign(book, dto, { updatedAt: new Date() });
    return book;
  }

  deleteBook(id: number): boolean {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) return false;

    this.books.splice(index, 1);
    return true;
  }

  getBooksByAuthor(author: string): Book[] {
    return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  // DEMO 1: Type the implementation
  // Hint: Start with: return this.books.filter(
  // Watch Copilot suggest the property check
  getAvailableBooks(): Book[] {
    // TODO: DEMO - Type the implementation
    return this.books.filter(book => book.isAvailable);
  }

  // DEMO 2: Type the implementation
  // Hint: Start with: return this.books.filter(book =>
  // Watch Copilot suggest multiple conditions
  searchBooks(filters: {
    author?: string;
    year?: number;
    minYear?: number;
    maxYear?: number;
    isAvailable?: boolean;
  }): Book[] {
    // TODO: DEMO - Type the implementation
    return this.books.filter(book => {
      if (filters.author && !book.author.toLowerCase().includes(filters.author.toLowerCase())) {
        return false;
      }
      if (filters.year && book.publishedYear !== filters.year) {
        return false;
      }
      if (filters.minYear && book.publishedYear < filters.minYear) {
        return false;
      }
      if (filters.maxYear && book.publishedYear > filters.maxYear) {
        return false;
      }
      if (filters.isAvailable !== undefined && book.isAvailable !== filters.isAvailable) {
        return false;
      }
      return true;
    });
  }

  // DEMO 3: Type the implementation
  // Hint: Start with: if (startYear > endYear) throw new Error(
  // Watch Copilot suggest the validation and filter
  getBooksByPublishedDateRange(startYear: number, endYear: number): Book[] {
    // TODO: DEMO - Type the implementation
    if (startYear > endYear) {
      throw new Error('Start year must be less than or equal to end year');
    }
    return this.books.filter(book => 
      book.publishedYear >= startYear && book.publishedYear <= endYear
    );
  }

  getBooksByYear(year: number): Book[] {
    return this.books.filter(book => book.publishedYear === year);
  }
}
