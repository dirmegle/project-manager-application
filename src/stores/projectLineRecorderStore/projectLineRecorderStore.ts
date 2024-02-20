import { defineStore } from 'pinia';
import { useStorage, type RemovableRef } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';

type LineItem = {
    itemID: string;
    name: string;
    unit: string;
    quantity: number;
    price: number
}

type LineRecord = {
    [projectID: string]: LineItem[] | undefined;
}

const useProjectLineRecorderStore = defineStore('lineRecorder', () => {

    // States:
    const lineRecords: RemovableRef<LineRecord> = useStorage<LineRecord>('lineRecords', {});

    // Getters:
    // Sum all amounts * quantity per project ID

    // Methods:

    function addNewRecordForProject({ name, unit, quantity, price }: Omit<LineItem, 'itemID'>, projectID: string) {

        const itemID: string = uuidv4()

        const newItemToAdd = {
            itemID,
            name,
            unit,
            quantity,
            price
        }

        if (!lineRecords.value[projectID]) {
            lineRecords.value[projectID] = []
        }
        lineRecords.value[projectID]?.push(newItemToAdd)
    }

    function createNewArrayWithoutLineItem(projectID: string, itemID: string):void {
       if (lineRecords.value[projectID]) {
        const filteredItems = lineRecords.value[projectID]?.filter(item => item.itemID !== itemID)
        lineRecords.value[projectID] = filteredItems
       }
    }

    // Probably need to add removal by project as well

    function getLineRecordForProject(projectID: string): LineItem[] {
        return lineRecords.value[projectID] ?? []
    }

    return { lineRecords, addNewRecordForProject, createNewArrayWithoutLineItem, getLineRecordForProject }
})

export default useProjectLineRecorderStore
