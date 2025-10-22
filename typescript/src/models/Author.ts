/**
 * Author model for books.
 * See README.md DEMO 3 for step-by-step instructions.
 */

export interface Author {
    id: number;
    name: string;
    email: string;
    birthDate: Date;
    nationality?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export enum AuthorStatus {
    Active = 'Active',
    Retired = 'Retired',
    Emerging = 'Emerging'
}

export interface AuthorStats {
    // TODO: Add stats properties
}

export function getAuthorAge(author: Author): number {
    // TODO: Calculate author age
    return 0;
}

export function getYearsActive(author: Author, startYear: number): number {
    // TODO: Calculate years active
    return 0;
}

export function isProductive(author: Author, booksPerYear: number = 2): boolean {
    // TODO: Check if author is productive
    return false;
}
