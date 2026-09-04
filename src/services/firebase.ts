import { initializeApp, getApps, deleteApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { getAuth, Auth, signInAnonymously, User } from 'firebase/auth';
import defaultFirebaseConfigData from '../../firebase-applet-config.json';
import { CustomerAppointment } from '../types/appointment';
import { CareerApplication } from '../types/career';

export interface FirebaseConfigObject {
  projectId: string;
  apiKey?: string;
  authDomain?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
}

const CUSTOM_FIREBASE_KEY = 'anuman_custom_firebase_config';

export let app: FirebaseApp | null = null;
export let db: Firestore | null = null;
export let auth: Auth | null = null;
export let activeFirebaseConfig: FirebaseConfigObject = defaultFirebaseConfigData;

/**
 * Retrieve current active Firebase configuration (custom user override or default)
 */
export function getActiveFirebaseConfig(): FirebaseConfigObject {
  try {
    const custom = localStorage.getItem(CUSTOM_FIREBASE_KEY);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed && parsed.projectId) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }
  return defaultFirebaseConfigData;
}

/**
 * Check if the user is currently using a custom Firebase account
 */
export function isUsingCustomFirebaseConfig(): boolean {
  try {
    const custom = localStorage.getItem(CUSTOM_FIREBASE_KEY);
    if (custom) {
      const parsed = JSON.parse(custom);
      return Boolean(parsed && parsed.projectId);
    }
  } catch {
    // fallback
  }
  return false;
}

/**
 * Initialize or re-initialize Firebase with a given or active configuration
 */
export async function setupFirebaseInstance(
  config?: FirebaseConfigObject
): Promise<{ app: FirebaseApp | null; db: Firestore | null; auth: Auth | null }> {
  const targetConfig = config || getActiveFirebaseConfig();
  activeFirebaseConfig = targetConfig;

  if (!targetConfig || !targetConfig.projectId) {
    app = null;
    db = null;
    auth = null;
    return { app, db, auth };
  }

  try {
    const existingApps = getApps();
    for (const existingApp of existingApps) {
      try {
        await deleteApp(existingApp);
      } catch {
        // continue
      }
    }

    // Clean options so empty strings are not passed to Firebase
    const cleanOptions: Record<string, string> = {
      projectId: targetConfig.projectId.trim(),
    };
    if (targetConfig.apiKey?.trim()) cleanOptions.apiKey = targetConfig.apiKey.trim();
    if (targetConfig.authDomain?.trim()) cleanOptions.authDomain = targetConfig.authDomain.trim();
    if (targetConfig.storageBucket?.trim()) cleanOptions.storageBucket = targetConfig.storageBucket.trim();
    if (targetConfig.messagingSenderId?.trim()) cleanOptions.messagingSenderId = targetConfig.messagingSenderId.trim();
    if (targetConfig.appId?.trim()) cleanOptions.appId = targetConfig.appId.trim();

    app = initializeApp(cleanOptions);

    // Initialize Firestore (support custom database ID if present)
    if (targetConfig.firestoreDatabaseId && targetConfig.firestoreDatabaseId !== '(default)') {
      db = getFirestore(app, targetConfig.firestoreDatabaseId);
    } else {
      db = getFirestore(app);
    }

    if (cleanOptions.apiKey) {
      try {
        auth = getAuth(app);
      } catch (authErr) {
        console.warn('[Firebase Auth] Notice:', authErr);
        auth = null;
      }
    } else {
      auth = null;
    }
    console.log(`[Firebase] Successfully initialized project: ${targetConfig.projectId}`);
  } catch (err) {
    console.warn('[Firebase] Initialization notice:', err);
  }

  return { app, db, auth };
}

// Initial boot
setupFirebaseInstance();

export const firebaseAppConfig = defaultFirebaseConfigData;

/**
 * Parse a raw text snippet (JSON or JS object literal from Firebase Console)
 */
export function parseFirebaseConfigString(raw: string): FirebaseConfigObject | null {
  const clean = raw.trim();
  if (!clean) return null;

  // 1. Try standard JSON parse
  try {
    const parsed = JSON.parse(clean);
    if (parsed && (parsed.projectId || parsed.apiKey)) {
      return {
        projectId: parsed.projectId || '',
        apiKey: parsed.apiKey || '',
        authDomain: parsed.authDomain || '',
        storageBucket: parsed.storageBucket || '',
        messagingSenderId: parsed.messagingSenderId || '',
        appId: parsed.appId || '',
        firestoreDatabaseId: parsed.firestoreDatabaseId || '',
      };
    }
  } catch {
    // Not standard JSON, try regex extraction for JS object code
  }

  // 2. Extract using regex from JS object snippet (e.g. const firebaseConfig = { apiKey: "..." })
  const extractField = (fieldName: string): string => {
    const regex = new RegExp(`${fieldName}['"\\s]*:['"\\s]*([^'"\\s,}\n]+)`, 'i');
    const match = clean.match(regex);
    return match && match[1] ? match[1].replace(/['",;]/g, '').trim() : '';
  };

  const projectId = extractField('projectId');
  const apiKey = extractField('apiKey');
  const authDomain = extractField('authDomain');
  const storageBucket = extractField('storageBucket');
  const messagingSenderId = extractField('messagingSenderId');
  const appId = extractField('appId');
  const firestoreDatabaseId = extractField('firestoreDatabaseId');

  if (projectId) {
    return {
      projectId,
      apiKey,
      authDomain,
      storageBucket,
      messagingSenderId,
      appId,
      firestoreDatabaseId,
    };
  }

  return null;
}

/**
 * Save new custom Firebase account configuration & switch immediately
 */
export async function switchFirebaseAccount(
  newConfig: FirebaseConfigObject
): Promise<{ success: boolean; message: string }> {
  if (!newConfig.projectId || !newConfig.projectId.trim()) {
    return { success: false, message: 'Please provide at least a valid Firebase Project ID.' };
  }

  const cleanConfig: FirebaseConfigObject = {
    projectId: newConfig.projectId.trim(),
    apiKey: newConfig.apiKey?.trim() || '',
    authDomain: newConfig.authDomain?.trim() || `${newConfig.projectId.trim()}.firebaseapp.com`,
    storageBucket: newConfig.storageBucket?.trim() || `${newConfig.projectId.trim()}.firebasestorage.app`,
    messagingSenderId: newConfig.messagingSenderId?.trim() || '',
    appId: newConfig.appId?.trim() || '',
    firestoreDatabaseId: newConfig.firestoreDatabaseId?.trim() || '',
  };

  try {
    localStorage.setItem(CUSTOM_FIREBASE_KEY, JSON.stringify(cleanConfig));
    await setupFirebaseInstance(cleanConfig);
    return { success: true, message: `Connected to new Firebase project: ${cleanConfig.projectId}` };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to switch Firebase configuration.' };
  }
}

/**
 * Reset back to original default Firebase account
 */
export async function resetToDefaultFirebaseAccount(): Promise<void> {
  try {
    localStorage.removeItem(CUSTOM_FIREBASE_KEY);
    await setupFirebaseInstance(defaultFirebaseConfigData);
  } catch (err) {
    console.warn('[Firebase] Reset error:', err);
  }
}

/**
 * Test the Firestore connection to verify readability/reachability
 */
export async function testFirestoreConnection(): Promise<{
  success: boolean;
  message: string;
  isRulesBlocked?: boolean;
  isNotFound?: boolean;
}> {
  if (!db) {
    return {
      success: false,
      message: 'Firestore is not initialized. Please ensure Project ID is filled correctly.',
    };
  }

  try {
    // Attempt a lightweight test write/read ping
    const testDoc = doc(db, '_connection_test', 'ping');
    await setDoc(testDoc, { ping: 'ok', timestamp: Date.now() }, { merge: true });
    const snap = await getDoc(testDoc);
    if (snap.exists()) {
      return {
        success: true,
        message: 'Storage Verified: Read and write to Firestore database "anuman-92cce" are active and operational.',
      };
    }
    return {
      success: true,
      message: 'Storage Verified: Write operation to Firestore database "anuman-92cce" succeeded.',
    };
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    if (err?.code === 'permission-denied') {
      return {
        success: false,
        isRulesBlocked: true,
        message: 'Permission Denied: Your Firestore database is reachable, but Security Rules blocked the write. In your Firebase Console, open "Firestore Database" > "Rules" tab and allow read/write or start in Test Mode.',
      };
    }
    if (err?.code === 'not-found' || errMsg.includes('does not exist') || errMsg.includes('NOT_FOUND')) {
      return {
        success: false,
        isNotFound: true,
        message: 'Database Not Found: The Firestore database has not been created yet in Firebase project "anuman-92cce". Go to Firebase Console > Build > Firestore Database > Click "Create database".',
      };
    }
    return {
      success: false,
      message: `Connection check notice: ${errMsg || 'Unable to connect to Firestore'}.`,
    };
  }
}

/**
 * Write a real test appointment into the "appointments" collection
 * and verify it exists immediately.
 */
export async function writeSampleTestAppointment(): Promise<{
  success: boolean;
  appointmentId: string;
  message: string;
}> {
  if (!db) {
    return {
      success: false,
      appointmentId: '',
      message: 'Firestore database is not initialized.',
    };
  }

  const testId = `TEST-ANUMAN-${Math.floor(1000 + Math.random() * 9000)}`;
  const sampleAppointment: CustomerAppointment = {
    id: testId,
    createdAt: Date.now(),
    timestamp: new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    name: 'Diagnostic Live Verification Test',
    phone: '9835000000',
    service: 'Clinical Verification Visit',
    preferredDate: 'Immediate',
    preferredTime: 'Immediate',
    address: 'Patna Cloud Verification',
    notes: 'Diagnostic test record created from website to verify cloud storage in Firebase console.',
    staffNotes: 'Automated test entry. Can be safely kept or deleted.',
    status: 'In Review',
    source: 'Manual Desk Entry',
  };

  try {
    const docRef = doc(db, 'appointments', testId);
    await setDoc(docRef, sampleAppointment);

    // Verify it was stored
    const fetchedSnap = await getDoc(docRef);
    if (fetchedSnap.exists()) {
      return {
        success: true,
        appointmentId: testId,
        message: `Success! Test appointment #${testId} was written and verified inside your Firestore "appointments" collection.`,
      };
    } else {
      return {
        success: true,
        appointmentId: testId,
        message: `Test appointment #${testId} sent to Firestore. Check your Firebase console under "appointments" collection!`,
      };
    }
  } catch (err: any) {
    const errMsg = err?.message || String(err);
    if (err?.code === 'permission-denied') {
      return {
        success: false,
        appointmentId: testId,
        message: `Write Denied: Firebase Security Rules blocked this write. In Firebase Console, go to Firestore Database > Rules tab, and allow create/read operations.`,
      };
    }
    if (err?.code === 'not-found' || errMsg.includes('does not exist')) {
      return {
        success: false,
        appointmentId: testId,
        message: `Database Not Created: In your Firebase Console, click "Build" > "Firestore Database" > "Create database".`,
      };
    }
    return {
      success: false,
      appointmentId: testId,
      message: `Test write failed: ${errMsg}`,
    };
  }
}

/**
 * Ensure an authenticated session for Admin Firestore operations
 */
export async function authenticateAdminWithFirebase(): Promise<User | null> {
  if (!auth) return null;
  try {
    if (auth.currentUser) {
      return auth.currentUser;
    }
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (err) {
    console.warn('[Firebase Auth] Anonymous sign-in notice (fallback active):', err);
    return auth.currentUser;
  }
}

/**
 * Real-time listener for Appointments (Admin view only)
 */
export function subscribeToAppointments(
  onData: (appointments: CustomerAppointment[]) => void,
  onError?: (err: Error) => void
): Unsubscribe | null {
  if (!db) return null;

  try {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const items: CustomerAppointment[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as CustomerAppointment);
        });
        onData(items);
      },
      (err) => {
        console.warn('[Firebase] Appointments subscription notice:', err);
        if (onError) onError(err);
      }
    );
    return unsub;
  } catch (error: any) {
    console.warn('[Firebase] Query subscription failed:', error);
    if (onError) onError(error);
    return null;
  }
}

/**
 * Save or sync an appointment to Firestore
 */
export async function syncAppointmentToFirestore(appointment: CustomerAppointment): Promise<boolean> {
  if (!db) return false;
  try {
    const aptRef = doc(db, 'appointments', appointment.id);
    await setDoc(aptRef, appointment, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase] Could not save appointment to Firestore:', err);
    return false;
  }
}

/**
 * Update an appointment in Firestore
 */
export async function updateAppointmentInFirestore(
  id: string,
  patch: Partial<CustomerAppointment>
): Promise<boolean> {
  if (!db) return false;
  try {
    const aptRef = doc(db, 'appointments', id);
    await updateDoc(aptRef, patch);
    return true;
  } catch (err) {
    console.warn('[Firebase] Could not update appointment in Firestore:', err);
    return false;
  }
}

/**
 * Delete an appointment from Firestore
 */
export async function deleteAppointmentFromFirestore(id: string): Promise<boolean> {
  if (!db) return false;
  try {
    const aptRef = doc(db, 'appointments', id);
    await deleteDoc(aptRef);
    return true;
  } catch (err) {
    console.warn('[Firebase] Could not delete appointment from Firestore:', err);
    return false;
  }
}

/**
 * Real-time listener for Career Applications (Admin view only)
 */
export function subscribeToCareerApplications(
  onData: (careers: CareerApplication[]) => void,
  onError?: (err: Error) => void
): Unsubscribe | null {
  if (!db) return null;

  try {
    const q = query(collection(db, 'careerApplications'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const items: CareerApplication[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as CareerApplication);
        });
        onData(items);
      },
      (err) => {
        console.warn('[Firebase] Career applications subscription notice:', err);
        if (onError) onError(err);
      }
    );
    return unsub;
  } catch (error: any) {
    console.warn('[Firebase] Query subscription failed:', error);
    if (onError) onError(error);
    return null;
  }
}

/**
 * Save or sync a career application to Firestore
 */
export async function syncCareerApplicationToFirestore(career: CareerApplication): Promise<boolean> {
  if (!db) return false;
  try {
    const careerRef = doc(db, 'careerApplications', career.id);
    await setDoc(careerRef, career, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase] Could not save career application to Firestore:', err);
    return false;
  }
}

/**
 * Update a career application in Firestore
 */
export async function updateCareerApplicationInFirestore(
  id: string,
  patch: Partial<CareerApplication>
): Promise<boolean> {
  if (!db) return false;
  try {
    const careerRef = doc(db, 'careerApplications', id);
    await updateDoc(careerRef, patch);
    return true;
  } catch (err) {
    console.warn('[Firebase] Could not update career application in Firestore:', err);
    return false;
  }
}

/**
 * Delete a career application from Firestore
 */
export async function deleteCareerApplicationFromFirestore(id: string): Promise<boolean> {
  if (!db) return false;
  try {
    const careerRef = doc(db, 'careerApplications', id);
    await deleteDoc(careerRef);
    return true;
  } catch (err) {
    console.warn('[Firebase] Could not delete career application from Firestore:', err);
    return false;
  }
}

/**
 * Batch upload/sync local data into Firebase Firestore
 */
export async function syncAllLocalToFirebase(
  appointments: CustomerAppointment[],
  careers: CareerApplication[]
): Promise<{ appointmentsCount: number; careersCount: number }> {
  if (!db) throw new Error('Firebase Firestore is not initialized.');

  let aptsCount = 0;
  let carCount = 0;

  for (const apt of appointments) {
    const success = await syncAppointmentToFirestore(apt);
    if (success) aptsCount++;
  }

  for (const car of careers) {
    const success = await syncCareerApplicationToFirestore(car);
    if (success) carCount++;
  }

  return { appointmentsCount: aptsCount, careersCount: carCount };
}
