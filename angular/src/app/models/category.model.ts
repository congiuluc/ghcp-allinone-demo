/**
 * Category model for notes.
 * See README.md DEMO 3 for step-by-step instructions.
 */

export interface Category {
    readonly id: number;
    name: string;
    color: string;
    count: number;
    createdAt: Date;
    updatedAt?: Date;
}

export interface CategoryStats {
    totalCount: number;
    activeCount: number;
    recentCount: number;
}

export interface CategoryFilter {
    name?: string;
    colorRange?: string[];
    minCount?: number;
}

export function isRecent(category: Category, days: number = 7): boolean {
    // TODO: Check if category was created within specified days
    return false;
}

export function validateCategory(category: Category): boolean {
    // TODO: Validate category data
    return false;
}

export function getCategoryStats(categories: Category[]): CategoryStats {
    // TODO: Calculate category statistics
    return { totalCount: 0, activeCount: 0, recentCount: 0 };
}
