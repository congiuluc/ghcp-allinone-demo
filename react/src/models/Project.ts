/**
 * Project model for project management.
 * See README.md DEMO 3 for step-by-step instructions.
 */

export interface Project {
    readonly id: number;
    name: string;
    description: string;
    status: 'active' | 'pending' | 'completed';
    team: string[];
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt?: Date;
}

export interface ProjectStats {
    totalProjects: number;
    activeCount: number;
    completionRate: number;
}

export function isProjectOverdue(project: Project): boolean {
    // TODO: Check if project end date has passed
    return false;
}

export function getProjectProgress(project: Project): number {
    // TODO: Calculate project progress percentage
    return 0;
}

export function validateProject(project: Project): boolean {
    // TODO: Validate project data
    return false;
}

export function getProjectStats(projects: Project[]): ProjectStats {
    // TODO: Calculate project statistics
    return { totalProjects: 0, activeCount: 0, completionRate: 0 };
}
