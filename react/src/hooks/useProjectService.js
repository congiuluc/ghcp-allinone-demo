/**
 * Custom hook for project management.
 * See README.md DEMO 3 for step-by-step instructions.
 */

import { useState, useMemo, useCallback } from 'react';

const initialProjects = [
    { id: 1, name: 'Project A', status: 'active', team: ['Alice', 'Bob'], progress: 75 },
    { id: 2, name: 'Project B', status: 'pending', team: ['Charlie'], progress: 25 },
    { id: 3, name: 'Project C', status: 'completed', team: ['Alice', 'Dave'], progress: 100 },
];

export function useProjectService() {
    const [projectList, setProjectList] = useState(initialProjects);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [filterStatus, setFilterStatus] = useState('all');

    const getAllProjects = useMemo(() => {
        // TODO: Return all projects sorted by sortBy property
        return projectList;
    }, [projectList, sortBy]);

    const searchProjects = useMemo(() => {
        // TODO: Search projects by name and team members (case-insensitive)
        return projectList;
    }, [projectList, searchTerm]);

    const getProjectsByStatus = useMemo(() => {
        // TODO: Filter projects by status with sorting
        return projectList;
    }, [projectList, filterStatus, sortBy]);

    const getFilteredProjects = useMemo(() => {
        // TODO: Filter by status AND search term, then sort
        return projectList;
    }, [projectList, filterStatus, searchTerm, sortBy]);

    const updateProject = useCallback((id, updates) => {
        // TODO: Update project by id with new values
    }, []);

    const addProject = useCallback((newProject) => {
        // TODO: Add new project to list with generated ID
    }, []);

    const deleteProject = useCallback((id) => {
        // TODO: Remove project by id
    }, []);

    const getProjectStats = useMemo(() => {
        // TODO: Calculate project statistics (total, active, completion rate)
        return { total: 0, activeCount: 0, completionRate: 0 };
    }, [projectList]);

    return {
        projects: projectList,
        searchTerm,
        sortBy,
        filterStatus,
        setSearchTerm,
        setSortBy,
        setFilterStatus,
        getAllProjects,
        searchProjects,
        getProjectsByStatus,
        getFilteredProjects,
        updateProject,
        addProject,
        deleteProject,
        getProjectStats,
    };
}

