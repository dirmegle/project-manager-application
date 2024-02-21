import { defineStore } from 'pinia';
import { useStorage, type RemovableRef } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue'

export type Client = {
    clientID: string;
    clientName: string;
    clientDescription: string;
    clientNotes: string;
    clientLogo: string;
    isLogoURLValid: boolean
}

const useClientManagerStore = defineStore('clientManager', () => {

    // States:
    const clients: RemovableRef<Client[]> = useStorage<Client[]>('clients', []);

    // Getters:
    const getClientByID = (clientID: string):Client => {
        const clientObject = clients.value.find(obj => obj.clientID === clientID)
        if (!clientObject) {
            throw new Error(`Client with ID ${clientID} not found.`);
        }
        return clientObject
    }

    const getClientNameByID = (clientID:string):string => {
        const clientObject = getClientByID(clientID)
        if (!clientObject) {
            throw new Error(`Client with ID ${clientID} not found.`);
        }
        return clientObject.clientName
    }

    const getClientIDByName = (clientName: string): string => {
        const clientObject = clients.value.find(obj => obj.clientName === clientName);
        if (!clientObject) {
            throw new Error(`Client with name ${clientName} not found.`);
        }
        return clientObject.clientID;
    }

    const arrayOfClientNames = computed(() => {
        const clientNames: string[] = []
        clients.value.forEach((obj) => clientNames.push(obj.clientName))
        return clientNames
    })

    // Methods:
    function addNewClient(clientName: string, clientDescription: string, clientNotes:string, clientLogo:string, isLogoURLValid: boolean) {

        const clientID:string = uuidv4()

        const client: Client = {
            clientID,
            clientName,
            clientDescription,
            clientNotes,
            clientLogo,
            isLogoURLValid
        }

        clients.value.push(client)
    }

    function createNewArrayWithoutClient(clientID: string):void {
        clients.value = clients.value.filter((obj) => obj.clientID !== clientID)
    }

    // Edit client info(name, description, notes, logo)
    function editClientInformation(newName: string, newDescription: string, newNotes:string, newLogo:string, clientID: string) {
        const clientToBeEdited = getClientByID(clientID)

        if (clientToBeEdited) {
            clientToBeEdited.clientName = newName
            clientToBeEdited.clientDescription = newDescription
            clientToBeEdited.clientNotes = newNotes
            clientToBeEdited.clientLogo = newLogo
        } // TODO: Add error handling (here and in test)
    }

    return { clients, getClientByID, getClientNameByID, getClientIDByName, arrayOfClientNames, addNewClient, createNewArrayWithoutClient, editClientInformation }
})

export default useClientManagerStore