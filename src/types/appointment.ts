export type AppointmentStatus =
  | 'In Review'
  | 'Coordinator Assigned'
  | 'Confirmed'
  | 'Completed'
  | 'Cancelled';

export interface CustomerAppointment {
  id: string;
  timestamp: string;
  createdAt?: number;
  name: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  address?: string;
  notes?: string;
  staffNotes?: string;
  status: AppointmentStatus;
  source?: 'Booking Modal' | 'Contact Form' | 'Equipment Request' | 'Manual Desk Entry';
  firestoreSynced?: boolean;
  firestoreError?: string;
}

// Backwards compatibility alias with existing components
export type CareInquiry = CustomerAppointment;

export interface FirebaseClientConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}
