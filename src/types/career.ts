export type CareerStatus =
  | 'New Applicant'
  | 'Contacted'
  | 'Interview Scheduled'
  | 'Shortlisted'
  | 'Hired'
  | 'Rejected';

export interface CareerApplication {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: string;
  qualification: string;
  experience: string;
  preferredShift: string;
  preferredLocality?: string;
  about?: string;
  status: CareerStatus;
  timestamp: string;
  createdAt: number;
}
