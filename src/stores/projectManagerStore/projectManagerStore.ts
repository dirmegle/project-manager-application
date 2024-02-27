import { defineStore } from 'pinia';
import { useStorage, type RemovableRef } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';

export type Project = {
  projectID: string;
  clientID: string;
  projectName: string;
  projectDescription: string;
  dateCreated: string;
  dateCompleted: string;
  completed: boolean;
  totalOfCompletedProject: number;
};

const useProjectManagerStore = defineStore('projectManager', () => {
  // States:
  const projects: RemovableRef<Project[]> = useStorage<Project[]>('projects', []);

  // Getters:
  const getProjectByID = (projectID: string): Project => {
    const projectObject = projects.value.find(obj => obj.projectID === projectID);
    if (!projectObject) {
      throw new Error(`Project with ID ${projectID} not found.`);
    }
    return projectObject;
  };

  const currentDate: string = new Date().toISOString().slice(0, 10);

  const getFilteredProjectsByNotComplete = () => {
    return projects.value.filter(project => !project.completed);
  };

  const getFilteredProjectsByComplete = () => {
    return projects.value.filter(project => project.completed);
  };

  const getFilteredProjectsByCompletionDate = (fromDate: string, toDate: string): Project[] => {
    const completedProjects = getFilteredProjectsByComplete();

    return completedProjects.filter(project => {
      const completionDate = new Date(project.dateCompleted);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return completionDate >= from && completionDate <= to;
    });
  };

  function addNewProject(projectName: string, projectDescription: string, clientID: string): void {
    const projectID: string = uuidv4();

    const project: Project = {
      projectID,
      clientID,
      projectName,
      projectDescription,
      dateCreated: currentDate,
      dateCompleted: '',
      completed: false,
      totalOfCompletedProject: 0
    };

    projects.value.push(project);
  }

  function createNewArrayWithoutProject(projectID: string): void {
    projects.value = projects.value.filter(obj => obj.projectID !== projectID);
  }

  function editProjectDescription(newDescription: string, projectID: string) {
    const projectToBeEdited = getProjectByID(projectID);

    if (projectToBeEdited) {
      projectToBeEdited.projectDescription = newDescription;
    }
  }

  function editProjectName(newName: string, projectID: string) {
    const projectToBeEdited = getProjectByID(projectID);

    if (projectToBeEdited) {
      projectToBeEdited.projectName = newName;
    }
  }

  function toggleProjectCompletionStatus(projectID: string, total: number) {
    const projectToBeEdited = getProjectByID(projectID);

    if (projectToBeEdited) {
      if (!projectToBeEdited.completed) {
        projectToBeEdited.completed = true;
        projectToBeEdited.dateCompleted = currentDate;
        projectToBeEdited.totalOfCompletedProject = total;
      } else {
        projectToBeEdited.completed = false;
        projectToBeEdited.dateCompleted = '';
        projectToBeEdited.totalOfCompletedProject = 0;
      }
    }
  }

  function getFilteredProjectsByClientID(clientID: string) {
    return projects.value.filter(project => project.clientID === clientID);
  }

  return {
    projects,
    getProjectByID,
    addNewProject,
    createNewArrayWithoutProject,
    editProjectDescription,
    editProjectName,
    getFilteredProjectsByNotComplete,
    getFilteredProjectsByComplete,
    getFilteredProjectsByClientID,
    toggleProjectCompletionStatus,
    getFilteredProjectsByCompletionDate
  };
});

export default useProjectManagerStore;
