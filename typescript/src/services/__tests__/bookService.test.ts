/**
 * Unit tests for BookService
 * Tests CRUD operations and search functionality for books
 */

import { BookService } from '../bookService';
import { Book, CreateBookDTO, UpdateBookDTO } from '../../models/Book';

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(() => {
    bookService = new BookService();
  });

  describe('getAllBooks', () => {
    it('should return all books', () => {
      const books = bookService.getAllBooks();
      expect(books).toHaveLength(3);
      expect(books[0].title).toBe('The Pragmatic Programmer');
    });

    it('should return an array', () => {
      const books = bookService.getAllBooks();
      expect(Array.isArray(books)).toBe(true);
    });
  });

  describe('getBookById', () => {
    it('should return a book when valid id is provided', () => {
      const book = bookService.getBookById(1);
      expect(book).toBeDefined();
      expect(book?.title).toBe('The Pragmatic Programmer');
      expect(book?.author).toBe('David Thomas & Andrew Hunt');
    });

    it('should return undefined when book is not found', () => {
      const book = bookService.getBookById(999);
      expect(book).toBeUndefined();
    });

    it('should return correct book for each valid id', () => {
      const book1 = bookService.getBookById(1);
      const book2 = bookService.getBookById(2);
      const book3 = bookService.getBookById(3);

      expect(book1?.title).toBe('The Pragmatic Programmer');
      expect(book2?.title).toBe('Clean Code');
      expect(book3?.title).toBe('Design Patterns');
    });
  });

  describe('createBook', () => {
    it('should create a new book with all fields', () => {
      const newBookDTO: CreateBookDTO = {
        title: 'Refactoring',
        author: 'Martin Fowler',
        isbn: '978-0-201-48567-7',
        publishedYear: 1999,
        isAvailable: true
      };

      const createdBook = bookService.createBook(newBookDTO);
      
      expect(createdBook.id).toBe(4);
      expect(createdBook.title).toBe('Refactoring');
      expect(createdBook.author).toBe('Martin Fowler');
      expect(createdBook.isbn).toBe('978-0-201-48567-7');
      expect(createdBook.publishedYear).toBe(1999);
      expect(createdBook.isAvailable).toBe(true);
      expect(createdBook.createdAt).toBeInstanceOf(Date);
    });

    it('should increment book id for each new book', () => {
      const book1 = bookService.createBook({
        title: 'Book 1',
        author: 'Author 1',
        isbn: '123',
        publishedYear: 2020,
        isAvailable: true
      });

      const book2 = bookService.createBook({
        title: 'Book 2',
        author: 'Author 2',
        isbn: '456',
        publishedYear: 2021,
        isAvailable: true
      });

      expect(book2.id).toBe(book1.id + 1);
    });

    it('should add created book to the collection', () => {
      const initialCount = bookService.getAllBooks().length;
      
      bookService.createBook({
        title: 'New Book',
        author: 'New Author',
        isbn: '789',
        publishedYear: 2022,
        isAvailable: true
      });

      expect(bookService.getAllBooks()).toHaveLength(initialCount + 1);
    });
  });

  describe('updateBook', () => {
    it('should update existing book', () => {
      const updateDTO: UpdateBookDTO = {
        title: 'Clean Code - Updated',
        isAvailable: false
      };

      const updatedBook = bookService.updateBook(2, updateDTO);
      
      expect(updatedBook).toBeDefined();
      expect(updatedBook?.title).toBe('Clean Code - Updated');
      expect(updatedBook?.isAvailable).toBe(false);
      expect(updatedBook?.updatedAt).toBeInstanceOf(Date);
    });

    it('should return undefined when updating non-existent book', () => {
      const result = bookService.updateBook(999, { title: 'Test' });
      expect(result).toBeUndefined();
    });

    it('should preserve unchanged fields', () => {
      const updateDTO: UpdateBookDTO = {
        title: 'New Title'
      };

      const updatedBook = bookService.updateBook(1, updateDTO);
      
      expect(updatedBook?.title).toBe('New Title');
      expect(updatedBook?.author).toBe('David Thomas & Andrew Hunt');
      expect(updatedBook?.isbn).toBe('978-0-201-61622-4');
    });
  });

  describe('deleteBook', () => {
    it('should delete existing book', () => {
      const initialCount = bookService.getAllBooks().length;
      const result = bookService.deleteBook(1);
      
      expect(result).toBe(true);
      expect(bookService.getAllBooks()).toHaveLength(initialCount - 1);
      expect(bookService.getBookById(1)).toBeUndefined();
    });

    it('should return false when deleting non-existent book', () => {
      const result = bookService.deleteBook(999);
      expect(result).toBe(false);
    });

    it('should not affect other books when deleting', () => {
      bookService.deleteBook(1);
      
      expect(bookService.getBookById(2)).toBeDefined();
      expect(bookService.getBookById(3)).toBeDefined();
    });
  });

  describe('getBooksByAuthor', () => {
    it('should return books by exact author name match', () => {
      const books = bookService.getBooksByAuthor('Robert C. Martin');
      expect(books).toHaveLength(1);
      expect(books[0].title).toBe('Clean Code');
    });

    it('should return books by partial author name match (case insensitive)', () => {
      const books = bookService.getBooksByAuthor('martin');
      expect(books).toHaveLength(1);
      expect(books[0].author).toContain('Martin');
    });

    it('should return empty array when no books match author', () => {
      const books = bookService.getBooksByAuthor('Unknown Author');
      expect(books).toHaveLength(0);
    });

    it('should handle case-insensitive search', () => {
      const books = bookService.getBooksByAuthor('MARTIN');
      expect(books).toHaveLength(1);
    });
  });

  describe('getAvailableBooks', () => {
    it('should return only available books', () => {
      const availableBooks = bookService.getAvailableBooks();
      expect(availableBooks.every(book => book.isAvailable)).toBe(true);
    });

    it('should not include unavailable books', () => {
      const availableBooks = bookService.getAvailableBooks();
      expect(availableBooks).toHaveLength(2);
      expect(availableBooks.find(b => b.id === 3)).toBeUndefined();
    });
  });

  describe('searchBooks', () => {
    it('should filter by author', () => {
      const results = bookService.searchBooks({ author: 'martin' });
      expect(results).toHaveLength(1);
      expect(results[0].author).toContain('Martin');
    });

    it('should filter by exact year', () => {
      const results = bookService.searchBooks({ year: 1999 });
      expect(results).toHaveLength(1);
      expect(results[0].publishedYear).toBe(1999);
    });

    it('should filter by year range', () => {
      const results = bookService.searchBooks({ minYear: 1999, maxYear: 2008 });
      expect(results).toHaveLength(2);
      expect(results.every(b => b.publishedYear >= 1999 && b.publishedYear <= 2008)).toBe(true);
    });

    it('should filter by availability', () => {
      const results = bookService.searchBooks({ isAvailable: true });
      expect(results).toHaveLength(2);
      expect(results.every(b => b.isAvailable)).toBe(true);
    });

    it('should filter by multiple criteria', () => {
      const results = bookService.searchBooks({ 
        minYear: 1990, 
        maxYear: 2000,
        isAvailable: true 
      });
      expect(results).toHaveLength(1);
      expect(results[0].title).toBe('The Pragmatic Programmer');
    });

    it('should return all books when no filters provided', () => {
      const results = bookService.searchBooks({});
      expect(results).toHaveLength(3);
    });

    it('should return empty array when no books match filters', () => {
      const results = bookService.searchBooks({ 
        author: 'Nonexistent',
        year: 3000 
      });
      expect(results).toHaveLength(0);
    });
  });

  describe('getBooksByPublishedDateRange', () => {
    it('should return books within date range', () => {
      const books = bookService.getBooksByPublishedDateRange(1999, 2008);
      expect(books).toHaveLength(2);
    });

    it('should include books at boundary years', () => {
      const books = bookService.getBooksByPublishedDateRange(1999, 1999);
      expect(books).toHaveLength(1);
      expect(books[0].publishedYear).toBe(1999);
    });

    it('should throw error when start year is greater than end year', () => {
      expect(() => {
        bookService.getBooksByPublishedDateRange(2010, 2000);
      }).toThrow('Start year must be less than or equal to end year');
    });

    it('should return empty array when no books in range', () => {
      const books = bookService.getBooksByPublishedDateRange(2020, 2025);
      expect(books).toHaveLength(0);
    });
  });

  describe('getBooksByYear', () => {
    it('should return books published in specific year', () => {
      const books = bookService.getBooksByYear(1999);
      expect(books).toHaveLength(1);
      expect(books[0].publishedYear).toBe(1999);
    });

    it('should return empty array when no books published in year', () => {
      const books = bookService.getBooksByYear(2025);
      expect(books).toHaveLength(0);
    });
  });
});
