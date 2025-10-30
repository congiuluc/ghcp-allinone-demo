package com.demo.repository;

import com.demo.model.Category;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

/**
 * Repository for Category entity (in-memory implementation for demo)
 */
@Repository
public class CategoryRepository {
    private final Map<Integer, Category> categories = new ConcurrentHashMap<>();
    private final AtomicInteger idCounter = new AtomicInteger(1);

    public List<Category> findAll() {
        return new ArrayList<>(categories.values());
    }

    public Optional<Category> findById(int id) {
        return Optional.ofNullable(categories.get(id));
    }

    public Category save(Category category) {
        if (category.getId() == 0) {
            category.setId(idCounter.getAndIncrement());
        }
        categories.put(category.getId(), category);
        return category;
    }

    public void deleteById(int id) {
        categories.remove(id);
    }

    public boolean existsById(int id) {
        return categories.containsKey(id);
    }

    public List<Category> findByIsActiveTrue() {
        return categories.values().stream()
                .filter(Category::isActive)
                .collect(Collectors.toList());
    }

    public List<Category> searchByName(String searchTerm) {
        return categories.values().stream()
                .filter(c -> c.getName().toLowerCase().contains(searchTerm.toLowerCase()))
                .collect(Collectors.toList());
    }
}
