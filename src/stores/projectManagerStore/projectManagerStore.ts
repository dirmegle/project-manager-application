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
}

const useProjectManagerStore = defineStore('projectManager', () => {

    // States:
    const projects: RemovableRef<Project[]> = useStorage<Project[]>('projects', []);

    // Getters:
    const getProjectByID = (projectID: string):Project => {
        const projectObject = projects.value.find(obj => obj.projectID === projectID);
        if (!projectObject) {
            throw new Error(`Project with ID ${projectID} not found.`);
        }
        return projectObject
    }

    const currentDate: string = new Date().toISOString().slice(0, 10)

    const getFilteredProjectsByNotComplete = () => {
        return projects.value.filter(project => !project.completed)
    }

    const getFilteredProjectsByComplete = () => {
        return projects.value.filter(project => project.completed)
    }

    // Methods:
    function addNewProject(projectName: string, projectDescription: string, clientID:string):void {

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
        }

        projects.value.push(project)
    }

    function createNewArrayWithoutProject(projectID: string):void {
        projects.value = projects.value.filter((obj) => obj.projectID !== projectID)
    }

    // Need to add method to remove all projects for client ID

    function editProjectDescription(newDescription: string, projectID: string) {

        const projectToBeEdited = getProjectByID(projectID)

        if (projectToBeEdited) {
            projectToBeEdited.projectDescription = newDescription
        } // TODO: Add error handling (here and in test)
    }

    function editProjectName(newName: string, projectID: string) {

        const projectToBeEdited = getProjectByID(projectID)

        if (projectToBeEdited) {
            projectToBeEdited.projectName = newName
        } // TODO: Add error handling (here and in test)
    }

    function setTotalOfCompletedProject(projectID: string, total: number):void {

        const projectToBeEdited = getProjectByID(projectID)

        if (projectToBeEdited) {
            projectToBeEdited.totalOfCompletedProject = total
        }

    }

    function toggleProjectCompletionStatus(projectID: string) {
        const projectToBeEdited = getProjectByID(projectID)

        if(projectToBeEdited) {
            projectToBeEdited.completed = !projectToBeEdited.completed
        } // TODO: Add error handling (here and in test)
    }

    function getFilteredProjectsByClientID(clientID: string) {
        return projects.value.filter(project => project.clientID === clientID)
    }

    function getFilteredProjectsByCompletionDate(fromDate: string, toDate: string):Project[] {

        const completedProjects = getFilteredProjectsByComplete()

        return completedProjects.filter((project) => {
            const completionDate = new Date(project.dateCompleted);
            const from = new Date(fromDate);
            const to = new Date(toDate);
            return completionDate >= from && completionDate <= to;
        })
    }

    return { projects, getProjectByID, addNewProject, createNewArrayWithoutProject, editProjectDescription, editProjectName, setTotalOfCompletedProject, getFilteredProjectsByNotComplete, getFilteredProjectsByComplete, getFilteredProjectsByClientID, toggleProjectCompletionStatus, getFilteredProjectsByCompletionDate }
})

export default useProjectManagerStore