import { Client, Account, Databases, Storage, Functions, Avatars, ID } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('YOUR_PROJECT_ID');

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);
export const avatars = new Avatars(client);

// Database and collection constants
export const DATABASE_ID = 'YOUR_DATABASE_ID';
export const COLLECTIONS = {
    EVENTS: 'events',
    USER_PROFILES: 'user_profiles',
    TICKETS: 'tickets',
    ACHIEVEMENTS: 'achievements',
    USER_POINTS: 'user_points',
};

// Helper functions for authentication
export const createUserSession = async (email: string, password: string) => {
    return await account.createEmailSession(email, password);
};

export const createOAuthSession = async () => {
    try {
        const currentLocation = window.location.href;
        return await account.createOAuth2Session(
            'google',
            currentLocation,
            `${currentLocation}?error=auth-failed`,
            ['profile', 'email']
        );
    } catch (error) {
        console.error('OAuth error:', error);
        throw error;
    }
};

// Types for our data models
export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    imageUrl: string;
    category: string;
    capacity: number;
    registered: number;
    organizerId: string;
    price: number;
    status: 'upcoming' | 'ongoing' | 'completed';
}

export interface UserProfile {
    id: string;
    userId: string;
    name: string;
    email: string;
    avatar?: string;
    bio?: string;
    points: number;
    achievements: string[];
}

export interface Ticket {
    id: string;
    eventId: string;
    userId: string;
    purchaseDate: string;
    status: 'active' | 'used' | 'cancelled';
    qrCode?: string;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    points: number;
}

export interface UserPoints {
    total: number;
    level: number;
    nextLevelPoints: number;
}

// Helper functions for database operations
export const createDocument = async (
    collectionId: string,
    data: any,
    permissions: string[] = []
) => {
    return await databases.createDocument(
        DATABASE_ID,
        collectionId,
        ID.unique(),
        data,
        permissions
    );
};

export const listDocuments = async (collectionId: string, queries: string[] = []) => {
    return await databases.listDocuments(
        DATABASE_ID,
        collectionId,
        queries
    );
};

// Helper functions for file storage
export const uploadFile = async (file: File) => {
    return await storage.createFile(
        'YOUR_BUCKET_ID',
        ID.unique(),
        file
    );
};

export const getFilePreview = (fileId: string) => {
    return storage.getFilePreview(
        'YOUR_BUCKET_ID',
        fileId
    );
};