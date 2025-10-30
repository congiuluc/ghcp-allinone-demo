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
        return categoryRepository.findAll();
    }
    
    public Optional<Category> getCategoryById(int id) {
        // TODO: Implement
        return categoryRepository.findById(id);
    }
    
    public Category createCategory(Category category) {
        // TODO: Implement
        return categoryRepository.save(category);
    }
    
    public Optional<Category> updateCategory(int id, Category category) {
        // TODO: Implement
        return categoryRepository.findById(id).map(existing -> {
            existing.setName(category.getName());
            existing.setDescription(category.getDescription());
            existing.setActive(category.isActive());
            existing.setUpdatedAt(java.time.LocalDateTime.now());
            return categoryRepository.save(existing);
        });
    }
    
    public boolean deleteCategory(int id) {
        // TODO: Implement
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Category> searchCategories(String searchTerm) {
        // TODO: Implement
        return categoryRepository.searchByName(searchTerm);
    }
    
    public List<Category> getActiveCategories() {
        // TODO: Implement
        return categoryRepository.findByIsActiveTrue();
    }
}
