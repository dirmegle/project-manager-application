import { setActivePinia, createPinia } from 'pinia';
import { describe, beforeEach, it, expect, vitest, afterAll } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import useProjectManagerStore from './projectManagerStore';

vitest.mock('uuid');

describe('Mutate project array in project manager store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    vitest.useFakeTimers().setSystemTime('2024-02-10');

    const projectManager = useProjectManagerStore();

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
    ];
  });

  afterAll(() => {
    vitest.useRealTimers();
  });

  it('adds a new item to array', () => {
    const mockUuid = vitest.mocked(uuidv4);
    mockUuid.mockReturnValue('AB4');

    const projectManager = useProjectManagerStore();

    const projectName = 'Write press release';
    const projectDescription = 'On new feature';
    const clientID = 'DC3';

    projectManager.addNewProject(projectName, projectDescription, clientID);

    expect(projectManager.projects).toEqual([
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
      },
      {
        projectID: 'AB4',
        clientID: 'DC3',
        projectName: 'Write press release',
        projectDescription: 'On new feature',
        dateCreated: '2024-02-10',
        dateCompleted: '',
        completed: false,
        totalOfCompletedProject: 0
      }
    ]);
  });

  it('removes an item from array', () => {
    const projectManager = useProjectManagerStore();

    projectManager.createNewArrayWithoutProject('AB2');

    expect(projectManager.projects).toEqual([
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
    ]);
  });

  it('edits description and name of an item', () => {
    const projectManager = useProjectManagerStore();

    projectManager.editProjectDescription('For new ad campaign', 'AB1');
    projectManager.editProjectName('Write a good brief', 'AB1');

    expect(projectManager.projects).toEqual([
      {
        projectID: 'AB1',
        clientID: 'DC2',
        projectName: 'Write a good brief',
        projectDescription: 'For new ad campaign',
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
    ]);
  });

  it('toggles status of a project', () => {
    vitest.useFakeTimers().setSystemTime('2024-02-12');

    const projectManager = useProjectManagerStore();

    projectManager.toggleProjectCompletionStatus('AB1', 500);

    expect(projectManager.projects).toEqual([
      {
        projectID: 'AB1',
        clientID: 'DC2',
        projectName: 'Write a brief',
        projectDescription: 'For new campaign',
        dateCreated: '2024-02-10',
        dateCompleted: '2024-02-10',
        completed: true,
        totalOfCompletedProject: 500
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
    ]);
  });
});
