import { Client, Account, Databases, Functions } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')  // Update with your Appwrite endpoint
    .setProject('YOUR_PROJECT_ID');               // Update with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

// Collection IDs
export const COLLECTIONS = {
    USERS: 'users',
    EVENTS: 'events',
    USER_POINTS: 'user_points',
    ACHIEVEMENTS: 'achievements',
};

// Database ID
export const DATABASE_ID = 'YOUR_DATABASE_ID';