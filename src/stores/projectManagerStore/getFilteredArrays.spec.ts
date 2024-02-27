import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect } from 'vitest'
import useProjectManagerStore from './projectManagerStore'

describe('Filter methods from Project Manager Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())

        const projectManager = useProjectManagerStore()

        projectManager.projects = [
            {
                projectID: 'AB1',
                clientID: 'DC2',
                projectName: 'Write a brief',
                projectDescription: 'For new campaign',
                dateCreated: '2024-02-10',
                dateCompleted: '',
                completed: false,
                totalOfCompletedProject: 0
            },
            {
                projectID: 'AB2',
                clientID: 'DC2',
                projectName: 'Write ad copies',
                projectDescription: 'For iterations',
                dateCreated: '2024-02-01',
                dateCompleted: '2024-02-05',
                completed: true,
                totalOfCompletedProject: 400
            },
            {
                projectID: 'AB3',
                clientID: 'DC3',
                projectName: 'Prepare an article',
                projectDescription: 'About puppies',
                dateCreated: '2024-02-07',
                dateCompleted: '',
                completed: false,
                totalOfCompletedProject: 0
            }
        ]
    })

    it('returns a new array of objects with "complete" equal to false', () => {
        const projectManager = useProjectManagerStore()
        const filteredProjects = projectManager.getFilteredProjectsByNotComplete()

        expect(filteredProjects).toEqual([
            {
                projectID: 'AB1',
                clientID: 'DC2',
                projectName: 'Write a brief',
                projectDescription: 'For new campaign',
                dateCreated: '2024-02-10',
                dateCompleted: '',
                completed: false,
                totalOfCompletedProject: 0
            },
            {
                projectID: 'AB3',
                clientID: 'DC3',
                projectName: 'Prepare an article',
                projectDescription: 'About puppies',
                dateCreated: '2024-02-07',
                dateCompleted: '',
                completed: false,
                totalOfCompletedProject: 0
            }
        ])

    })

    it('returns a new array of objects with "complete" equal to true', () => {
        const projectManager = useProjectManagerStore()
        const filteredProjects = projectManager.getFilteredProjectsByComplete()

        expect(filteredProjects).toEqual([
            {
                projectID: 'AB2',
                clientID: 'DC2',
                projectName: 'Write ad copies',
                projectDescription: 'For iterations',
                dateCreated: '2024-02-01',
                dateCompleted: '2024-02-05',
                completed: true,
                totalOfCompletedProject: 400
            }
        ])
    })

    it('returns a new array of objects with the same client ID', () => {
        const projectManager = useProjectManagerStore()
        const filteredProjects = projectManager.getFilteredProjectsByClientID('DC2')

        expect(filteredProjects).toEqual([
            {
                projectID: 'AB1',
                clientID: 'DC2',
                projectName: 'Write a brief',
                projectDescription: 'For new campaign',
                dateCreated: '2024-02-10',
                dateCompleted: '',
                completed: false,
                totalOfCompletedProject: 0
            },
            {
                projectID: 'AB2',
                clientID: 'DC2',
                projectName: 'Write ad copies',
                projectDescription: 'For iterations',
                dateCreated: '2024-02-01',
                dateCompleted: '2024-02-05',
                completed: true,
                totalOfCompletedProject: 400
            }
        ])
    })

    it('returns a new array of objects within date range', () => {
        const projectManager = useProjectManagerStore()
        const filteredProjects = projectManager.getFilteredProjectsByCompletionDate('2024-02-03', '2024-02-05')

        expect(filteredProjects).toEqual([
            {
                projectID: 'AB2',
                clientID: 'DC2',
                projectName: 'Write ad copies',
                projectDescription: 'For iterations',
                dateCreated: '2024-02-01',
                dateCompleted: '2024-02-05',
                completed: true,
                totalOfCompletedProject: 400
            }
        ])
    })
})