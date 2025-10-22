/**
 * Book controller
 * Demonstrates Copilot generating Express controller methods
 */

import { Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { CreateBookDTO, UpdateBookDTO } from '../models/Book';

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  getAllBooks = (req: Request, res: Response): void => {
    try {
      const books = this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve books' });
    }
  };

  getBookById = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      const book = this.bookService.getBookById(id);

      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve book' });
    }
  };

  createBook = (req: Request, res: Response): void => {
    try {
      const dto: CreateBookDTO = req.body;

      if (!dto.title || !dto.author || !dto.isbn) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const book = this.bookService.createBook(dto);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create book' });
    }
  };

  updateBook = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      const dto: UpdateBookDTO = req.body;

      const book = this.bookService.updateBook(id, dto);

      if (!book) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update book' });
    }
  };

  deleteBook = (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id, 10);
      const success = this.bookService.deleteBook(id);

      if (!success) {
        res.status(404).json({ error: 'Book not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete book' });
    }
  };

  getBooksByAuthor = (req: Request, res: Response): void => {
    try {
      const author = req.params.author;
      const books = this.bookService.getBooksByAuthor(author);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve books' });
    }
  };

  // DEMO Step 1: Generate endpoint for available books
  getAvailableBooks = (req: Request, res: Response): void => {
    try {
      /**
       * Instructions for Copilot:
       * "Generate a handler that:
       * - Calls this.bookService.getAvailableBooks()
       * - Returns 200 status with the books array
       * - Has try/catch error handling with 500 status"
       */
      // TODO: Let Copilot suggest the implementation
      throw new Error('TODO: Implement with Copilot suggestion');
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve available books' });
    }
  };

  // DEMO Step 2: Generate endpoint for search books
  searchBooks = (req: Request, res: Response): void => {
    try {
      /**
       * Instructions for Copilot:
       * "Generate a handler that:
       * - Extracts query parameters: author, year, minYear, maxYear, isAvailable
       * - Builds filter object from provided parameters
       * - Calls this.bookService.searchBooks(filters)
       * - Returns 200 status with the results
       * - Returns 400 if both year and year range are provided
       * - Has error handling with 500 status"
       */
      // TODO: Let Copilot suggest the implementation
      throw new Error('TODO: Implement with Copilot suggestion');
    } catch (error) {
      res.status(500).json({ error: 'Failed to search books' });
    }
  };

  // DEMO Step 3: Generate endpoint for date range search
  getBooksByDateRange = (req: Request, res: Response): void => {
    try {
      /**
       * Instructions for Copilot:
       * "Generate a handler that:
       * - Gets startYear and endYear from query parameters
       * - Validates both are valid numbers
       * - Returns 400 if validation fails
       * - Calls this.bookService.getBooksByPublishedDateRange(startYear, endYear)
       * - Returns 200 with sorted results
       * - Has error handling"
       */
      // TODO: Let Copilot suggest the implementation
      throw new Error('TODO: Implement with Copilot suggestion');
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve books' });
    }
  };

  getBooksByYear = (req: Request, res: Response): void => {
    try {
      const year = parseInt(req.params.year, 10);
      const books = this.bookService.getBooksByYear(year);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve books' });
    }
  };
}
