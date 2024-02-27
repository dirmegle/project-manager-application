import { defineStore } from 'pinia';
import { useStorage, type RemovableRef } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';

type LineItem = {
  itemID: string;
  completed: boolean;
  itemName: string;
  unit: string;
  quantity: number;
  price: number;
  total: number;
};

type LineRecord = {
  [projectID: string]: LineItem[] | undefined;
};

const useProjectLineRecorderStore = defineStore('lineRecorder', () => {
  const lineRecords: RemovableRef<LineRecord> = useStorage<LineRecord>('lineRecords', {});

  function addNewRecordForProject(
    { itemName, unit, quantity, price, total }: Omit<LineItem, 'itemID' | 'completed'>,
    projectID: string
  ) {
    const itemID: string = uuidv4();

    const newItemToAdd = {
      itemID,
      completed: false,
      itemName,
      unit,
      quantity,
      price,
      total
    };

    if (!lineRecords.value[projectID]) {
      lineRecords.value[projectID] = [];
    }
    lineRecords.value[projectID]?.push(newItemToAdd);
  }

  function createNewArrayWithoutLineItem(projectID: string, itemID: string): void {
    if (lineRecords.value[projectID]) {
      const filteredItems = lineRecords.value[projectID]?.filter(item => item.itemID !== itemID);
      lineRecords.value[projectID] = filteredItems;
    }
  }

  function removeProjectArrayFromObject(projectID: string) {
    if (lineRecords.value[projectID]) {
      delete lineRecords.value[projectID];
    }
  }

  function getLineRecordForProject(projectID: string): LineItem[] {
    return lineRecords.value[projectID] ?? [];
  }

  function getTotalValueForProject(projectID: string): number {
    const lineRecord = getLineRecordForProject(projectID);

    let totalValue = 0;

    lineRecord.forEach(lineItem => {
      totalValue += lineItem.total;
    });

    return totalValue;
  }

  function toggleCompletedStatus(projectID: string): void {
    const lineRecord = getLineRecordForProject(projectID);
    const updatedLineRecord = lineRecord.map(lineItem => ({
      ...lineItem,
      completed: !lineItem.completed
    }));
    lineRecords.value[projectID] = updatedLineRecord;
  }

  function getTotalSumOfCompletedProjects(): number {
    return getTotalSumByStatus(true);
  }

  function getTotalSumOfOngoingProjects(): number {
    return getTotalSumByStatus(false);
  }

  function getTotalSumByStatus(status: boolean): number {
    let totalSum = 0;

    Object.values(lineRecords.value).forEach(projectLineItems => {
      if (projectLineItems) {
        const lineItemsTotal = projectLineItems
          .filter(lineItem => lineItem.completed === status)
          .reduce((acc, lineItem) => acc + lineItem.total, 0);

        totalSum += lineItemsTotal;
      }
    });

    return totalSum;
  }

  return {
    lineRecords,
    addNewRecordForProject,
    createNewArrayWithoutLineItem,
    getLineRecordForProject,
    getTotalValueForProject,
    toggleCompletedStatus,
    getTotalSumOfCompletedProjects,
    getTotalSumOfOngoingProjects,
    removeProjectArrayFromObject
  };
});

export default useProjectLineRecorderStore;
