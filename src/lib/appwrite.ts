import { Client, Account, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('YOUR_APPWRITE_ENDPOINT') // Set your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID');        // Set your project ID

export const account = new Account(client);
export const databases = new Databases(client);

export { client };