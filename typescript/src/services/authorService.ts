/**
 * Author service for book management.
 * See README.md DEMO 3 for step-by-step instructions.
 */

import { Author, AuthorStatus } from '../models/Author';

const authors: Author[] = [];

// Test helper to clear authors
export function clearAuthors(): void {
    authors.length = 0;
}

export function getAllAuthors(): Author[] {
    // TODO: Return all authors sorted by name
    return [...authors].sort((a, b) => a.name.localeCompare(b.name));
}

export function getAuthorById(id: number): Author | undefined {
    // TODO: Find author by ID
    return authors.find(author => author.id === id);
}

export function searchAuthors(searchTerm: string): Author[] {
    // TODO: Search authors by name or email (case-insensitive)
    const term = searchTerm.toLowerCase();
    return authors.filter(author => 
        author.name.toLowerCase().includes(term) || 
        author.email.toLowerCase().includes(term)
    );
}

export function getAuthorsByStatus(status: AuthorStatus): Author[] {
    // TODO: Filter authors by status
    // For this demo, we'll use isActive to determine status
    if (status === AuthorStatus.Active) {
        return authors.filter(author => author.isActive);
    }
    return authors.filter(author => !author.isActive);
}

export function createAuthor(author: Author): Author {
    // TODO: Add author to collection
    authors.push(author);
    return author;
}

export function updateAuthor(id: number, author: Partial<Author>): Author | undefined {
    // TODO: Update author
    const existingAuthor = authors.find(a => a.id === id);
    if (!existingAuthor) return undefined;
    
    Object.assign(existingAuthor, author, { updatedAt: new Date() });
    return existingAuthor;
}

export function deleteAuthor(id: number): boolean {
    // TODO: Delete author
    const index = authors.findIndex(a => a.id === id);
    if (index === -1) return false;
    
    authors.splice(index, 1);
    return true;
}

export function groupAuthorsByStatus(): Map<AuthorStatus, Author[]> {
    // TODO: Group authors by status
    const grouped = new Map<AuthorStatus, Author[]>();
    
    for (const status of Object.values(AuthorStatus)) {
        grouped.set(status, getAuthorsByStatus(status));
    }
    
    return grouped;
}

export function getAuthorStats(): { total: number; byStatus: Record<string, number> } {
    // TODO: Calculate author statistics
    const byStatus: Record<string, number> = {};
    
    for (const status of Object.values(AuthorStatus)) {
        byStatus[status] = getAuthorsByStatus(status).length;
    }
    
    return {
        total: authors.length,
        byStatus
    };
}

export function paginateAuthors(page: number, pageSize: number): Author[] {
    // TODO: Return paginated authors
    const startIndex = (page - 1) * pageSize;
    return authors.slice(startIndex, startIndex + pageSize);
}
