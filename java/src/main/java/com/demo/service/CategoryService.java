package com.demo.service;

import com.demo.model.Category;
import com.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for Category business logic.
 * See README.md DEMO 3 for step-by-step instructions.
 */
@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    public List<Category> getAllCategories() {
        // TODO: Implement
    }
    
    public Optional<Category> getCategoryById(int id) {
        // TODO: Implement
    }
    
    public Category createCategory(Category category) {
        // TODO: Implement
    }
    
    public Optional<Category> updateCategory(int id, Category category) {
        // TODO: Implement
    }
    
    public boolean deleteCategory(int id) {
        // TODO: Implement
    }
    
    public List<Category> searchCategories(String searchTerm) {
        // TODO: Implement
    }
    
    public List<Category> getActiveCategories() {
        // TODO: Implement
    }
}
