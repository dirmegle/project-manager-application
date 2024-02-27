import { setActivePinia, createPinia } from 'pinia'
import { describe, beforeEach, it, expect, vitest } from 'vitest'
import { v4 as uuidv4 } from 'uuid';
import useProjectLineRecorderStore from './projectLineRecorderStore'

vitest.mock('uuid')

describe('Methods that mutate Line Records object', () => {
    beforeEach(() => {
        setActivePinia(createPinia())

        const projectLineRecorder = useProjectLineRecorderStore()

        projectLineRecorder.lineRecords = {
            'aaa1': [
                {
                itemID: 'aaa1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                },
                {
                itemID: 'aaa1-2',
                completed: false,
                itemName: 'Writing',
                unit: 'hour',
                quantity: 7,
                price: 40,
                total: 280,
                }
            ],
            'bbb1': [
                {
                itemID: 'bbb1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                }
            ]
            }
        }
    )

    it('adds new line item to record for project ID already in array', () => {
        const mockUuid = vitest.mocked(uuidv4)
        mockUuid.mockReturnValue('bbb1-2')

        const projectLineRecorder = useProjectLineRecorderStore()
        const newLineItem = {
            itemName: 'Creating a brandbook',
            completed: false,
            unit: 'hour',
            quantity: 5,
            price: 40,
            total: 200
        }

        projectLineRecorder.addNewRecordForProject(newLineItem, 'bbb1')

        expect(projectLineRecorder.lineRecords).toEqual({
            'aaa1': [
                {
                itemID: 'aaa1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                },
                {
                itemID: 'aaa1-2',
                completed: false,
                itemName: 'Writing',
                unit: 'hour',
                quantity: 7,
                price: 40,
                total: 280,
                }
            ],
            'bbb1': [
                {
                itemID: 'bbb1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                },
                {
                itemID: 'bbb1-2',
                itemName: 'Creating a brandbook',
                completed: false,
                unit: 'hour',
                quantity: 5,
                price: 40,
                total: 200
                }
            ]
        })

    })

    it('adds new line item to record for project ID that is not in array', () => {
        const mockUuid = vitest.mocked(uuidv4)
        mockUuid.mockReturnValue('ccc1-1')

        const projectLineRecorder = useProjectLineRecorderStore()

        const newLineItem = {
            itemName: 'Write an ad brief',
            completed: false,
            unit: 'hour',
            quantity: 8,
            price: 40,
            total: 320
        }

        projectLineRecorder.addNewRecordForProject(newLineItem, 'ccc1')

        expect(projectLineRecorder.lineRecords).toEqual({
            'aaa1': [
                {
                itemID: 'aaa1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                },
                {
                itemID: 'aaa1-2',
                completed: false,
                itemName: 'Writing',
                unit: 'hour',
                quantity: 7,
                price: 40,
                total: 280,
                }
            ],
            'bbb1': [
                {
                itemID: 'bbb1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                }
            ],
            'ccc1': [
                {
                itemID: 'ccc1-1',
                itemName: 'Write an ad brief',
                completed: false,
                unit: 'hour',
                quantity: 8,
                price: 40,
                total: 320
                }
            ]
        })
    })

    it('creates a new array in object without the line', () => {
        const projectLineRecorder = useProjectLineRecorderStore()

        projectLineRecorder.createNewArrayWithoutLineItem('aaa1', 'aaa1-2')
        expect(projectLineRecorder.lineRecords).toEqual({
            'aaa1': [
                {
                itemID: 'aaa1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                }
            ],
            'bbb1': [
                {
                itemID: 'bbb1-1',
                completed: false,
                itemName: 'Research',
                unit: 'hour',
                quantity: 2,
                price: 40,
                total: 80
                }
            ]
        })
    })
})