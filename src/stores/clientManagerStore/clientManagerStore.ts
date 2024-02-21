import { defineStore } from 'pinia';
import { useStorage, type RemovableRef } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';
import { computed } from 'vue'

export type Client = {
    clientID: string;
    name: string;
    description: string;
    notes: string;
    logo: string;
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

    const getClientIDByName = (name: string): string => {
        const clientObject = clients.value.find(obj => obj.name === name);
        if (!clientObject) {
            throw new Error(`Client with name ${name} not found.`);
        }
        return clientObject.clientID;
    }

    const arrayOfClientNames = computed(() => {
        const clientNames: string[] = []
        clients.value.forEach((obj) => clientNames.push(obj.name))
        return clientNames
    })

    // Methods:
    function addNewClient(name: string, description: string, notes:string, logo:string) {

        const clientID:string = uuidv4()

        const client: Client = {
            clientID,
            name,
            description,
            notes,
            logo,
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
            clientToBeEdited.name = newName
            clientToBeEdited.description = newDescription
            clientToBeEdited.notes = newNotes
            clientToBeEdited.logo = newLogo
        } // TODO: Add error handling (here and in test)
    }

    return { clients, getClientByID, getClientIDByName, arrayOfClientNames, addNewClient, createNewArrayWithoutClient, editClientInformation }
})

export default useClientManagerStore