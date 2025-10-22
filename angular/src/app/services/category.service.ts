import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category.model';

/**
 * Service for Category business logic.
 * See README.md DEMO 3 for step-by-step instructions.
 */
@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    
    private categoriesSubject = new BehaviorSubject<Category[]>([
        { id: 1, name: 'Work', color: '#FF6B6B', count: 5, createdAt: new Date() },
        { id: 2, name: 'Personal', color: '#4ECDC4', count: 3, createdAt: new Date() },
        { id: 3, name: 'Archive', color: '#95E1D3', count: 1, createdAt: new Date() }
    ]);
    
    public categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
    
    constructor() {}
    
    getAllCategories(): Observable<Category[]> {
        // TODO: Return all categories
        return this.categories$;
    }
    
    searchCategories(searchTerm: string): Observable<Category[]> {
        // TODO: Search categories by name (case-insensitive)
        return this.categories$;
    }
    
    getCategoriesByColor(color: string): Observable<Category[]> {
        // TODO: Filter categories by color
        return this.categories$;
    }
    
    getPopularCategories(minCount: number = 3): Observable<Category[]> {
        // TODO: Get categories with count >= minCount, sorted by count
        return this.categories$;
    }
    
    getCategoryStats(): Observable<{ total: number; averageCount: number }> {
        // TODO: Calculate category statistics
        const stats = this.categoriesSubject.value;
        return this.categories$.pipe();
    }
    
    addCategory(category: Category): void {
        // TODO: Add new category to collection
    }
    
    updateCategory(id: number, updates: Partial<Category>): void {
        // TODO: Update category by id
    }
    
    deleteCategory(id: number): void {
        // TODO: Delete category by id
    }
    
    getPaginatedCategories(page: number, size: number): Observable<Category[]> {
        // TODO: Return paginated categories
        return this.categories$;
    }
}

