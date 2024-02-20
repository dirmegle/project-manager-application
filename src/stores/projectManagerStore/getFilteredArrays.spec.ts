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
                name: 'Write a brief',
                description: 'For new campaign',
                dateCreated: '2024-02-10',
                dateCompleted: '',
                completed: false
            },
            {
                projectID: 'AB2',
                clientID: 'DC2',
                name: 'Write ad copies',
                description: 'For iterations',
                dateCreated: '2024-02-01',
                dateCompleted: '2024-02-05',
                completed: true
            },
            {
                projectID: 'AB3',
                clientID: 'DC3',
                name: 'Prepare an article',
                description: 'About puppies',
                dateCreated: '2024-02-07',
                dateCompleted: '',
                completed: false
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
                name: 'Write a brief',
                description: 'For new campaign',
                dateCreated: '2024-02-10',
                dateCompleted: '',
                completed: false
            },
            {
                projectID: 'AB3',
                clientID: 'DC3',
                name: 'Prepare an article',
                description: 'About puppies',
                dateCreated: '2024-02-07',
                dateCompleted: '',
                completed: false
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
                name: 'Write ad copies',
                description: 'For iterations',
                dateCreated: '2024-02-01',
                dateCompleted: '2024-02-05',
                completed: true
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
                name: 'Write a brief',
                description: 'For new campaign',
                dateCreated: '2024-02-10',
                dateCompleted: '',
                completed: false
            },
            {
                projectID: 'AB2',
                clientID: 'DC2',
                name: 'Write ad copies',
                description: 'For iterations',
                dateCreated: '2024-02-01',
                dateCompleted: '2024-02-05',
                completed: true
            }
        ])
    })
})