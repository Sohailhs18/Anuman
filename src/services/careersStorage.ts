import { CareerApplication, CareerStatus } from '../types/career';
import {
  syncCareerApplicationToFirestore,
  updateCareerApplicationInFirestore,
  deleteCareerApplicationFromFirestore,
} from './firebase';

const CAREERS_STORAGE_KEY = 'anuman_career_applications';

const INITIAL_CAREER_APPLICANTS: CareerApplication[] = [
  {
    id: 'CAREER-PATNA-3091',
    name: 'Sunita Kumari',
    phone: '9123456780',
    email: 'sunita.nursing@gmail.com',
    role: 'Certified Home Nurse (GNM / B.Sc Nursing)',
    qualification: 'GNM from PMCH Patna (Bihar Nurses Registration Council)',
    experience: '3 Years Experience (ICU & Post-Op Home Care)',
    preferredShift: '12-Hour Day Shift',
    preferredLocality: 'Bailey Road, Boring Road, Patliputra',
    about: 'Experienced in tracheostomy, Foley catheter, IV infusions, and elderly vitals monitoring.',
    status: 'New Applicant',
    timestamp: 'Today, 10:15 AM',
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'CAREER-PATNA-2184',
    name: 'Vikram Yadav',
    phone: '8210987654',
    role: 'Patient Care Attendant / GDA (Male)',
    qualification: '12th Pass + Certified General Duty Assistant (GDA)',
    experience: '2 Years Experience in Home Patient Care',
    preferredShift: '12-Hour Night Shift or 24-Hour Residential Care',
    preferredLocality: 'Danapur, Rukanpura, Khagaul',
    about: 'Skilled in patient mobility, sponge bath, diaper change, feeding, and wheelchair transfer.',
    status: 'Contacted',
    timestamp: 'Yesterday, 03:40 PM',
    createdAt: Date.now() - 3600000 * 18,
  },
  {
    id: 'CAREER-PATNA-1402',
    name: 'Dr. Priya Ranjan (PT)',
    phone: '7004123456',
    email: 'priyapt.patna@gmail.com',
    role: 'Home Physiotherapist (BPT / MPT)',
    qualification: 'Bachelor of Physiotherapy (BPT), Magadh University',
    experience: '4 Years Clinical Practice in Neuro & Ortho Rehab',
    preferredShift: 'Visiting / Per-Session Home Visits',
    preferredLocality: 'Kankarbagh, Rajendra Nagar, Bailey Road',
    about: 'Specialist in stroke rehabilitation, knee replacement mobilization, and chest physiotherapy.',
    status: 'Interview Scheduled',
    timestamp: '2 days ago',
    createdAt: Date.now() - 3600000 * 48,
  },
];

export function getStoredCareerApplications(): CareerApplication[] {
  try {
    const saved = localStorage.getItem(CAREERS_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(CAREERS_STORAGE_KEY, JSON.stringify(INITIAL_CAREER_APPLICANTS));
      return INITIAL_CAREER_APPLICANTS;
    }
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : INITIAL_CAREER_APPLICANTS;
  } catch {
    return INITIAL_CAREER_APPLICANTS;
  }
}

export function saveCareerApplications(applications: CareerApplication[]): void {
  try {
    localStorage.setItem(CAREERS_STORAGE_KEY, JSON.stringify(applications));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Failed to save career applications to localStorage', err);
  }
}

export interface CareerInput {
  name: string;
  phone: string;
  email?: string;
  role: string;
  qualification: string;
  experience: string;
  preferredShift: string;
  preferredLocality?: string;
  about?: string;
}

export async function addCareerApplication(data: CareerInput): Promise<CareerApplication> {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const newApp: CareerApplication = {
    id: `CAREER-PATNA-${randomNum}`,
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email?.trim() || '',
    role: data.role,
    qualification: data.qualification.trim(),
    experience: data.experience,
    preferredShift: data.preferredShift,
    preferredLocality: data.preferredLocality?.trim() || 'Patna Area',
    about: data.about?.trim() || '',
    status: 'New Applicant',
    timestamp: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }),
    createdAt: Date.now(),
  };

  const existing = getStoredCareerApplications();
  const updated = [newApp, ...existing];
  saveCareerApplications(updated);

  // Sync to provisioned Firebase Firestore
  try {
    await syncCareerApplicationToFirestore(newApp);
  } catch (err) {
    console.warn('[Firebase] Career application sync error:', err);
  }

  return newApp;
}

export function updateCareerApplication(
  id: string,
  updates: Partial<CareerApplication>
): CareerApplication[] {
  const current = getStoredCareerApplications();
  const updated = current.map((app) => (app.id === id ? { ...app, ...updates } : app));
  saveCareerApplications(updated);

  // Sync update to Firebase
  try {
    updateCareerApplicationInFirestore(id, updates);
  } catch (err) {
    console.warn('[Firebase] Career update sync error:', err);
  }

  return updated;
}

export function deleteCareerApplication(id: string): CareerApplication[] {
  const current = getStoredCareerApplications();
  const updated = current.filter((app) => app.id !== id);
  saveCareerApplications(updated);

  // Sync deletion to Firebase
  try {
    deleteCareerApplicationFromFirestore(id);
  } catch (err) {
    console.warn('[Firebase] Career deletion sync error:', err);
  }

  return updated;
}
