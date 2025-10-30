/**
 * Unit tests for AuthorService
 * Tests CRUD operations and search functionality for authors
 */

import {
  getAllAuthors,
  getAuthorById,
  searchAuthors,
  getAuthorsByStatus,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  groupAuthorsByStatus,
  getAuthorStats,
  paginateAuthors,
  clearAuthors
} from '../authorService';
import { Author, AuthorStatus } from '../../models/Author';

describe('AuthorService', () => {
  // Helper function to create test author
  const createTestAuthor = (id: number, name: string, email: string, isActive: boolean = true): Author => ({
    id,
    name,
    email,
    birthDate: new Date('1970-01-01'),
    nationality: 'USA',
    isActive,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Clear authors array before each test
  beforeEach(() => {
    clearAuthors();
  });

  describe('createAuthor', () => {
    it('should create a new author', () => {
      const author = createTestAuthor(1, 'John Doe', 'john@example.com');
      const created = createAuthor(author);
      
      expect(created).toEqual(author);
      expect(getAllAuthors()).toHaveLength(1);
    });

    it('should add author to collection', () => {
      const author1 = createTestAuthor(1, 'John Doe', 'john@example.com');
      const author2 = createTestAuthor(2, 'Jane Smith', 'jane@example.com');
      
      createAuthor(author1);
      createAuthor(author2);
      
      expect(getAllAuthors()).toHaveLength(2);
    });
  });

  describe('getAllAuthors', () => {
    it('should return empty array when no authors exist', () => {
      expect(getAllAuthors()).toHaveLength(0);
    });

    it('should return all authors sorted by name', () => {
      createAuthor(createTestAuthor(1, 'Zoe', 'zoe@example.com'));
      createAuthor(createTestAuthor(2, 'Alice', 'alice@example.com'));
      createAuthor(createTestAuthor(3, 'Bob', 'bob@example.com'));
      
      const authors = getAllAuthors();
      expect(authors).toHaveLength(3);
      expect(authors[0].name).toBe('Alice');
      expect(authors[1].name).toBe('Bob');
      expect(authors[2].name).toBe('Zoe');
    });
  });

  describe('getAuthorById', () => {
    beforeEach(() => {
      createAuthor(createTestAuthor(1, 'John Doe', 'john@example.com'));
      createAuthor(createTestAuthor(2, 'Jane Smith', 'jane@example.com'));
    });

    it('should return author when found', () => {
      const author = getAuthorById(1);
      expect(author).toBeDefined();
      expect(author?.name).toBe('John Doe');
    });

    it('should return undefined when author not found', () => {
      const author = getAuthorById(999);
      expect(author).toBeUndefined();
    });
  });

  describe('searchAuthors', () => {
    beforeEach(() => {
      createAuthor(createTestAuthor(1, 'John Doe', 'john@example.com'));
      createAuthor(createTestAuthor(2, 'Jane Smith', 'jane@example.com'));
      createAuthor(createTestAuthor(3, 'Bob Johnson', 'bob@test.com'));
    });

    it('should find authors by name (case insensitive)', () => {
      const results = searchAuthors('john');
      expect(results).toHaveLength(2); // John Doe and Bob Johnson
    });

    it('should find authors by email (case insensitive)', () => {
      const results = searchAuthors('example.com');
      expect(results).toHaveLength(2); // John and Jane
    });

    it('should return empty array when no match', () => {
      const results = searchAuthors('xyz');
      expect(results).toHaveLength(0);
    });

    it('should handle case insensitive search', () => {
      const results = searchAuthors('JANE');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Jane Smith');
    });
  });

  describe('getAuthorsByStatus', () => {
    beforeEach(() => {
      createAuthor(createTestAuthor(1, 'Active Author', 'active@example.com', true));
      createAuthor(createTestAuthor(2, 'Inactive Author', 'inactive@example.com', false));
      createAuthor(createTestAuthor(3, 'Another Active', 'active2@example.com', true));
    });

    it('should return active authors', () => {
      const activeAuthors = getAuthorsByStatus(AuthorStatus.Active);
      expect(activeAuthors).toHaveLength(2);
      expect(activeAuthors.every(a => a.isActive)).toBe(true);
    });

    it('should return inactive authors', () => {
      const inactiveAuthors = getAuthorsByStatus(AuthorStatus.Retired);
      expect(inactiveAuthors).toHaveLength(1);
      expect(inactiveAuthors[0].isActive).toBe(false);
    });
  });

  describe('updateAuthor', () => {
    beforeEach(() => {
      createAuthor(createTestAuthor(1, 'John Doe', 'john@example.com'));
    });

    it('should update existing author', () => {
      const updated = updateAuthor(1, { name: 'John Updated' });
      
      expect(updated).toBeDefined();
      expect(updated?.name).toBe('John Updated');
      expect(updated?.email).toBe('john@example.com'); // unchanged
    });

    it('should return undefined when author not found', () => {
      const result = updateAuthor(999, { name: 'Test' });
      expect(result).toBeUndefined();
    });

    it('should update timestamp', () => {
      const before = new Date();
      const updated = updateAuthor(1, { name: 'Updated' });
      
      expect(updated?.updatedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    });
  });

  describe('deleteAuthor', () => {
    beforeEach(() => {
      createAuthor(createTestAuthor(1, 'John Doe', 'john@example.com'));
      createAuthor(createTestAuthor(2, 'Jane Smith', 'jane@example.com'));
    });

    it('should delete existing author', () => {
      const result = deleteAuthor(1);
      
      expect(result).toBe(true);
      expect(getAllAuthors()).toHaveLength(1);
      expect(getAuthorById(1)).toBeUndefined();
    });

    it('should return false when author not found', () => {
      const result = deleteAuthor(999);
      expect(result).toBe(false);
    });
  });

  describe('groupAuthorsByStatus', () => {
    beforeEach(() => {
      createAuthor(createTestAuthor(1, 'Active 1', 'a1@example.com', true));
      createAuthor(createTestAuthor(2, 'Active 2', 'a2@example.com', true));
      createAuthor(createTestAuthor(3, 'Inactive', 'i1@example.com', false));
    });

    it('should group authors by status', () => {
      const grouped = groupAuthorsByStatus();
      
      expect(grouped).toBeInstanceOf(Map);
      expect(grouped.get(AuthorStatus.Active)).toHaveLength(2);
    });

    it('should include all status types', () => {
      const grouped = groupAuthorsByStatus();
      
      expect(grouped.has(AuthorStatus.Active)).toBe(true);
      expect(grouped.has(AuthorStatus.Retired)).toBe(true);
      expect(grouped.has(AuthorStatus.Emerging)).toBe(true);
    });
  });

  describe('getAuthorStats', () => {
    beforeEach(() => {
      createAuthor(createTestAuthor(1, 'Active 1', 'a1@example.com', true));
      createAuthor(createTestAuthor(2, 'Active 2', 'a2@example.com', true));
      createAuthor(createTestAuthor(3, 'Inactive', 'i1@example.com', false));
    });

    it('should return correct total count', () => {
      const stats = getAuthorStats();
      expect(stats.total).toBe(3);
    });

    it('should return counts by status', () => {
      const stats = getAuthorStats();
      
      expect(stats.byStatus).toBeDefined();
      expect(stats.byStatus[AuthorStatus.Active]).toBe(2);
      expect(stats.byStatus[AuthorStatus.Retired]).toBe(1);
    });
  });

  describe('paginateAuthors', () => {
    beforeEach(() => {
      for (let i = 1; i <= 10; i++) {
        createAuthor(createTestAuthor(i, `Author ${i}`, `author${i}@example.com`));
      }
    });

    it('should return first page', () => {
      const page1 = paginateAuthors(1, 3);
      expect(page1).toHaveLength(3);
    });

    it('should return second page', () => {
      const page2 = paginateAuthors(2, 3);
      expect(page2).toHaveLength(3);
    });

    it('should return partial last page', () => {
      const lastPage = paginateAuthors(4, 3);
      expect(lastPage).toHaveLength(1);
    });

    it('should return empty array for page beyond data', () => {
      const emptyPage = paginateAuthors(10, 3);
      expect(emptyPage).toHaveLength(0);
    });
  });
});
