/**
 * Book routes
 * Demonstrates Copilot generating Express route definitions
 */

import { Router } from 'express';
import { BookController } from '../controllers/bookController';

const router = Router();
const bookController = new BookController();

/**
 * GET /api/v1/books - Get all books
 */
router.get('/', bookController.getAllBooks);

/**
 * GET /api/v1/books/:id - Get book by ID
 */
router.get('/:id', bookController.getBookById);

/**
 * POST /api/v1/books - Create new book
 */
router.post('/', bookController.createBook);

/**
 * PUT /api/v1/books/:id - Update book
 */
router.put('/:id', bookController.updateBook);

/**
 * DELETE /api/v1/books/:id - Delete book
 */
router.delete('/:id', bookController.deleteBook);

/**
 * GET /api/v1/books/author/:author - Get books by author
 */
router.get('/author/:author', bookController.getBooksByAuthor);

/**
 * GET /api/v1/books/filter/available - Get available books
 */
router.get('/filter/available', bookController.getAvailableBooks);

/**
 * GET /api/v1/books/year/:year - Get books by year
 */
router.get('/year/:year', bookController.getBooksByYear);

export default router;
