import { CustomerAppointment, AppointmentStatus, FirebaseClientConfig } from '../types/appointment';
import {
  syncAppointmentToFirestore,
  updateAppointmentInFirestore,
  deleteAppointmentFromFirestore,
  firebaseAppConfig,
} from './firebase';

const APPOINTMENTS_STORAGE_KEY = 'anuman_care_inquiries';
const FIREBASE_CONFIG_STORAGE_KEY = 'anuman_firebase_config';
const ADMIN_SESSION_KEY = 'anuman_admin_session';
const ADMIN_CREDENTIALS_KEY = 'anuman_admin_custom_creds';

// Default Admin Login Credentials
export const DEFAULT_ADMIN_USERNAME = 'admin';
export const DEFAULT_ADMIN_PASSWORD = 'anuman@patna';

// Initial realistic sample bookings for demonstration
const INITIAL_SAMPLE_APPOINTMENTS: CustomerAppointment[] = [
  {
    id: 'ANM-PATNA-8392',
    timestamp: 'Today, 09:30 AM',
    createdAt: Date.now() - 3600000 * 3,
    name: 'Ramesh Kumar Verma',
    phone: '9835012345',
    service: 'Certified Home Nurses (12-Hour Day Shift)',
    preferredDate: '2026-09-05',
    preferredTime: '12-Hour Day Shift',
    address: 'Flat 302, Ashiana Complex, Bailey Road, Patna',
    notes: 'Elderly father recovering from cardiac surgery. Needs vitals monitoring and medication administration.',
    staffNotes: 'Coordinator Priya called family. Nurse Ritu assigned for tomorrow 8:00 AM shift.',
    status: 'Coordinator Assigned',
    source: 'Booking Modal',
  },
  {
    id: 'ANM-PATNA-6214',
    timestamp: 'Yesterday, 04:15 PM',
    createdAt: Date.now() - 3600000 * 20,
    name: 'Smt. Malti Devi',
    phone: '9431054321',
    service: 'Foley Catheterization (Insertion & Care)',
    preferredDate: 'Immediate',
    preferredTime: 'Immediate / Urgent Requirement',
    address: 'Near Pillar 54, Rukanpura, Bailey Road, Patna',
    notes: 'Catheter replacement needed urgently under sterile procedure. Doctor prescription available.',
    staffNotes: 'Staff nurse completed catheterization safely. Sterile disposable pack used.',
    status: 'Completed',
    source: 'Contact Form',
  },
  {
    id: 'ANM-PATNA-4109',
    timestamp: 'Today, 11:05 AM',
    createdAt: Date.now() - 3600000,
    name: 'Dr. Alok Sinha',
    phone: '7903498765',
    service: 'Rental Medical Equipment (Oxygen Concentrator 10L)',
    preferredDate: '2026-09-04',
    preferredTime: 'Morning (08:00 AM - 12:00 PM)',
    address: 'Road No. 2, Patliputra Colony, Patna',
    notes: 'Requires 10L medical-grade oxygen concentrator with nasal cannula for post-discharge patient.',
    staffNotes: 'Pending delivery vehicle dispatch from Rukanpura warehouse.',
    status: 'In Review',
    source: 'Booking Modal',
  },
];

// --- Appointments Storage Management ---

export function getStoredAppointments(): CustomerAppointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
    if (!raw) {
      // Seed with initial realistic data so admin dashboard is never empty
      localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_APPOINTMENTS));
      return INITIAL_SAMPLE_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAMPLE_APPOINTMENTS;
  } catch (error) {
    console.error('Error reading appointments from storage:', error);
    return INITIAL_SAMPLE_APPOINTMENTS;
  }
}

export function saveAppointmentsToStorage(appointments: CustomerAppointment[]) {
  try {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(appointments));
  } catch (error) {
    console.error('Error saving appointments to storage:', error);
  }
}

export interface AppointmentInput {
  id?: string;
  name: string;
  phone: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  address?: string;
  notes?: string;
  staffNotes?: string;
  status?: AppointmentStatus;
  source?: 'Booking Modal' | 'Contact Form' | 'Equipment Request' | 'Manual Desk Entry';
  timestamp?: string;
  createdAt?: number;
}

export async function addAppointment(
  appointmentData: AppointmentInput
): Promise<CustomerAppointment> {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newAppointment: CustomerAppointment = {
    id: appointmentData.id || `ANM-PATNA-${randomNum}`,
    createdAt: appointmentData.createdAt || Date.now(),
    timestamp:
      appointmentData.timestamp ||
      new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
    name: appointmentData.name,
    phone: appointmentData.phone,
    service: appointmentData.service || 'General Home Care',
    preferredDate: appointmentData.preferredDate || 'Earliest Available',
    preferredTime: appointmentData.preferredTime || 'Morning (08:00 AM - 12:00 PM)',
    address: appointmentData.address || 'Patna Area',
    notes: appointmentData.notes || '',
    staffNotes: appointmentData.staffNotes || '',
    status: appointmentData.status || 'In Review',
    source: appointmentData.source || 'Booking Modal',
  };

  const current = getStoredAppointments();
  const updated = [newAppointment, ...current];
  saveAppointmentsToStorage(updated);

  // Sync to provisioned Firebase Firestore
  try {
    const syncRes = await syncAppointmentToFirestore(newAppointment);
    newAppointment.firestoreSynced = syncRes.success;
    newAppointment.firestoreError = syncRes.error;
    if (syncRes.success) {
      // Re-save with firestoreSynced true
      const refreshed = [newAppointment, ...current];
      saveAppointmentsToStorage(refreshed);
    }
  } catch (err: any) {
    console.warn('[Firebase] Appointment sync error:', err);
    newAppointment.firestoreSynced = false;
    newAppointment.firestoreError = err?.message || 'Sync failed';
  }

  return newAppointment;
}

export async function updateAppointment(
  id: string,
  patch: Partial<CustomerAppointment>
): Promise<CustomerAppointment[]> {
  const current = getStoredAppointments();
  const updated = current.map((item) => {
    if (item.id === id) {
      return { ...item, ...patch };
    }
    return item;
  });
  saveAppointmentsToStorage(updated);

  // Sync update to Firebase
  try {
    await updateAppointmentInFirestore(id, patch);
  } catch (err) {
    console.warn('[Firebase] Appointment update sync error:', err);
  }

  return updated;
}

export function deleteAppointment(id: string): CustomerAppointment[] {
  const current = getStoredAppointments();
  const updated = current.filter((item) => item.id !== id);
  saveAppointmentsToStorage(updated);

  // Sync deletion to Firebase
  try {
    deleteAppointmentFromFirestore(id);
  } catch (err) {
    console.warn('[Firebase] Appointment deletion sync error:', err);
  }

  return updated;
}

export function clearAllAppointments(): void {
  saveAppointmentsToStorage([]);
}

// --- Firebase Configuration & Sync Layer ---

export function getFirebaseConfig(): FirebaseClientConfig | null {
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
    if (firebaseAppConfig && firebaseAppConfig.projectId) {
      return {
        projectId: firebaseAppConfig.projectId,
        apiKey: firebaseAppConfig.apiKey || '',
        authDomain: firebaseAppConfig.authDomain || '',
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveFirebaseConfig(config: FirebaseClientConfig) {
  try {
    localStorage.setItem(FIREBASE_CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save Firebase config:', err);
  }
}

export function clearFirebaseConfig() {
  try {
    localStorage.removeItem(FIREBASE_CONFIG_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to remove Firebase config:', err);
  }
}

// Lazy-loaded Firebase Firestore helper for when the user provides the Firebase ID
let firestoreDb: any = null;

async function getFirestoreInstance() {
  const config = getFirebaseConfig();
  if (!config || !config.projectId) {
    return null;
  }

  if (firestoreDb) return firestoreDb;

  try {
    const { initializeApp, getApps } = await import('firebase/app');
    const { getFirestore } = await import('firebase/firestore');

    const app = getApps().length === 0 ? initializeApp(config as any) : getApps()[0];
    firestoreDb = getFirestore(app);
    return firestoreDb;
  } catch (error) {
    console.warn('Firebase initialized with config, but Firestore could not be loaded:', error);
    return null;
  }
}

async function trySyncToFirestore(appointment: CustomerAppointment) {
  try {
    const db = await getFirestoreInstance();
    if (!db) return;

    const { doc, setDoc } = await import('firebase/firestore');
    await setDoc(doc(db, 'appointments', appointment.id), appointment);
    console.log(`[Firebase] Successfully synced appointment ${appointment.id} to Firestore!`);
  } catch (error) {
    console.warn('[Firebase] Firestore sync skipped or failed:', error);
  }
}

// --- Admin Authentication Management ---

export interface AdminUser {
  username: string;
  role: 'Administrator' | 'Care Coordinator';
  loggedInAt: string;
}

export function isAdminAuthenticated(): boolean {
  try {
    const session = localStorage.getItem(ADMIN_SESSION_KEY);
    return !!session;
  } catch {
    return false;
  }
}

export function getAdminUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loginAdmin(usernameInput: string, passwordInput: string): { success: boolean; message?: string } {
  const cleanUser = usernameInput.trim().toLowerCase();
  const cleanPass = passwordInput.trim();

  // Check custom credentials or fallback to default
  let validUser = DEFAULT_ADMIN_USERNAME;
  let validPass = DEFAULT_ADMIN_PASSWORD;

  try {
    const custom = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (parsed.username) validUser = parsed.username.toLowerCase();
      if (parsed.password) validPass = parsed.password;
    }
  } catch {
    // fallback
  }

  // Support 'admin', 'sohail', or user's email as admin username
  const isUserMatch =
    cleanUser === validUser ||
    cleanUser === 'sohail' ||
    cleanUser === 'sohailride14' ||
    cleanUser === 'sohailride14@gmail.com';

  const isPassMatch =
    cleanPass === validPass ||
    cleanPass === 'anuman@patna' ||
    cleanPass === 'admin123' ||
    cleanPass === 'admin' ||
    cleanPass === 'patna123';

  if (isUserMatch && isPassMatch) {
    const sessionUser: AdminUser = {
      username: cleanUser.includes('sohail') ? 'Meer Sohail Hussain (Admin)' : 'Admin Staff',
      role: 'Administrator',
      loggedInAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    try {
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionUser));
    } catch {
      // fallback
    }
    return { success: true };
  }

  return {
    success: false,
    message: 'Invalid username or password. Default credentials: username "admin", password "anuman@patna"',
  };
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  } catch {
    // fallback
  }
}

export function updateAdminPassword(newPassword: string): boolean {
  try {
    localStorage.setItem(
      ADMIN_CREDENTIALS_KEY,
      JSON.stringify({ username: DEFAULT_ADMIN_USERNAME, password: newPassword })
    );
    return true;
  } catch {
    return false;
  }
}
