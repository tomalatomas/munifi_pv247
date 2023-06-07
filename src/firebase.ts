import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore,
	Timestamp
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyCpr1f3UcdfgjFnQilqDx7clhEsJGXkrSE',
	authDomain: 'pv247-t08-88f16.firebaseapp.com',
	projectId: 'pv247-t08-88f16',
	storageBucket: 'pv247-t08-88f16.appspot.com',
	messagingSenderId: '592289070832',
	appId: '1:592289070832:web:008016e5ef3af9ce0bcc35',
	measurementId: 'G-LPST7D9DN8'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
export const db = getFirestore();

// Reviews collection
export type Review = {
	by: string;
	stars: number;
	description?: string;
};

export const reviewsCollection = collection(
	db,
	'reviews'
) as CollectionReference<Review>;

export const reviewsDocument = (id: string) =>
	doc(db, 'reviews', id) as DocumentReference<Review>;

// Matches collection
export type Match = {
	by: string;
	duration: number;
	winner: string;
	date: Timestamp;
	board: string;
};

export const matchesCollection = collection(
	db,
	'matches'
) as CollectionReference<Match>;
