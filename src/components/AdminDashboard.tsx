import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Search,
  Filter,
  Download,
  PlusCircle,
  Database,
  CheckCircle2,
  AlertCircle,
  Trash2,
  RefreshCw,
  LogOut,
  UserCheck,
  Building,
  Edit3,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Users,
  Eye,
  GraduationCap,
  ChevronRight,
  Send,
  KeyRound,
  Copy,
  Check,
} from 'lucide-react';
import {
  CustomerAppointment,
  AppointmentStatus,
  FirebaseClientConfig,
} from '../types/appointment';
import {
  getStoredAppointments,
  updateAppointment,
  deleteAppointment,
  addAppointment,
  getFirebaseConfig,
  saveFirebaseConfig,
  clearFirebaseConfig,
  logoutAdmin,
  getAdminUser,
} from '../services/appointmentsStorage';
import {
  CareerApplication,
  CareerStatus,
} from '../types/career';
import {
  getStoredCareerApplications,
  updateCareerApplication,
  deleteCareerApplication,
} from '../services/careersStorage';
import {
  subscribeToAppointments,
  subscribeToCareerApplications,
  syncAllLocalToFirebase,
  getActiveFirebaseConfig,
  switchFirebaseAccount,
  resetToDefaultFirebaseAccount,
  testFirestoreConnection,
  writeSampleTestAppointment,
  syncAppointmentToFirestore,
  parseFirebaseConfigString,
  isUsingCustomFirebaseConfig,
  FirebaseConfigObject,
} from '../services/firebase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

type ActiveTab = 'appointments' | 'careers' | 'intake' | 'firebase';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('appointments');

  // Appointments State
  const [appointments, setAppointments] = useState<CustomerAppointment[]>(() =>
    getStoredAppointments()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [editingStaffNoteId, setEditingStaffNoteId] = useState<string | null>(null);
  const [tempStaffNote, setTempStaffNote] = useState('');

  // Careers State
  const [careerApps, setCareerApps] = useState<CareerApplication[]>(() =>
    getStoredCareerApplications()
  );
  const [careerSearch, setCareerSearch] = useState('');
  const [careerStatusFilter, setCareerStatusFilter] = useState<string>('All');

  // Quick Patient Intake Form State
  const [manualForm, setManualForm] = useState({
    name: '',
    phone: '',
    service: 'Certified Home Nurses',
    preferredDate: '',
    preferredTime: 'Morning (08:00 AM - 12:00 PM)',
    address: '',
    notes: '',
  });
  const [intakeSuccessMsg, setIntakeSuccessMsg] = useState('');

  // Firebase Config State
  const [activeConfig, setActiveConfig] = useState<FirebaseConfigObject>(() => getActiveFirebaseConfig());
  const [isCustomAccount, setIsCustomAccount] = useState<boolean>(() => isUsingCustomFirebaseConfig());
  const [rawConfigSnippet, setRawConfigSnippet] = useState('');
  const [testConnectionStatus, setTestConnectionStatus] = useState<{ testing: boolean; message: string; success?: boolean } | null>(null);
  const [firebaseStatusMsg, setFirebaseStatusMsg] = useState('');
  const [isSyncingFirebase, setIsSyncingFirebase] = useState(false);
  const [isWritingTestRecord, setIsWritingTestRecord] = useState(false);
  const [testRecordResult, setTestRecordResult] = useState<{
    success: boolean;
    message: string;
    appointmentId?: string;
  } | null>(null);

  const adminUser = getAdminUser();

  // Reload data when dashboard opens & subscribe to live Firestore updates
  useEffect(() => {
    if (isOpen) {
      setAppointments(getStoredAppointments());
      setCareerApps(getStoredCareerApplications());

      // Live Firestore synchronization
      const unsubApts = subscribeToAppointments((liveApts) => {
        if (liveApts && liveApts.length > 0) {
          setAppointments(liveApts);
        }
      });

      const unsubCareers = subscribeToCareerApplications((liveCareers) => {
        if (liveCareers && liveCareers.length > 0) {
          setCareerApps(liveCareers);
        }
      });

      return () => {
        if (unsubApts) unsubApts();
        if (unsubCareers) unsubCareers();
      };
    }
  }, [isOpen]);

  const handleRefresh = () => {
    setAppointments(getStoredAppointments());
    setCareerApps(getStoredCareerApplications());
  };

  // Appointment Status Changer
  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    const updated = await updateAppointment(id, { status: newStatus });
    setAppointments(updated);
  };

  // Staff Note Save
  const handleSaveStaffNote = async (id: string) => {
    const updated = await updateAppointment(id, { staffNotes: tempStaffNote });
    setAppointments(updated);
    setEditingStaffNoteId(null);
    setTempStaffNote('');
  };

  // Appointment Delete
  const handleDeleteAppointment = (id: string) => {
    if (window.confirm(`Are you sure you want to delete appointment ${id}? This action cannot be undone.`)) {
      const updated = deleteAppointment(id);
      setAppointments(updated);
    }
  };

  // Career Status Changer
  const handleCareerStatusChange = (id: string, newStatus: CareerStatus) => {
    const updated = updateCareerApplication(id, { status: newStatus });
    setCareerApps(updated);
  };

  // Career Delete
  const handleDeleteCareerApp = (id: string) => {
    if (window.confirm(`Are you sure you want to delete this job applicant?`)) {
      const updated = deleteCareerApplication(id);
      setCareerApps(updated);
    }
  };

  // Save Quick Intake Form
  const handleManualIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name.trim() || !manualForm.phone.trim()) {
      alert('Patient name and phone number are required.');
      return;
    }

    const newApt = await addAppointment({
      name: manualForm.name,
      phone: manualForm.phone,
      service: manualForm.service,
      preferredDate: manualForm.preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: manualForm.preferredTime,
      address: manualForm.address || 'Patna Walk-in / Phone Call',
      notes: manualForm.notes,
      status: 'Coordinator Assigned',
      source: 'Manual Desk Entry',
    });

    setAppointments((prev) => [newApt, ...prev]);
    setIntakeSuccessMsg(`Patient booking logged successfully! Ticket: ${newApt.id}`);
    setManualForm({
      name: '',
      phone: '',
      service: 'Certified Home Nurses',
      preferredDate: '',
      preferredTime: 'Morning (08:00 AM - 12:00 PM)',
      address: '',
      notes: '',
    });

    setTimeout(() => {
      setIntakeSuccessMsg('');
      setActiveTab('appointments');
    }, 1500);
  };

  // Firebase Account Switch & Management
  const handlePasteSnippet = (rawText: string) => {
    setRawConfigSnippet(rawText);
    const parsed = parseFirebaseConfigString(rawText);
    if (parsed) {
      setActiveConfig((prev) => ({
        ...prev,
        ...parsed,
      }));
      setFirebaseStatusMsg(`Auto-detected Firebase credentials for project "${parsed.projectId}"!`);
      setTimeout(() => setFirebaseStatusMsg(''), 3500);
    }
  };

  const handleConnectNewAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConfig.projectId?.trim()) {
      setFirebaseStatusMsg('Please enter a valid Firebase Project ID.');
      return;
    }

    setIsSyncingFirebase(true);
    setTestConnectionStatus({ testing: true, message: 'Validating & connecting to new Firebase account...' });

    try {
      const res = await switchFirebaseAccount(activeConfig);
      if (res.success) {
        setIsCustomAccount(true);
        setFirebaseStatusMsg(res.message);

        // Run diagnostic ping
        const testRes = await testFirestoreConnection();
        setTestConnectionStatus({
          testing: false,
          message: testRes.message,
          success: testRes.success,
        });
      } else {
        setFirebaseStatusMsg(`Error: ${res.message}`);
        setTestConnectionStatus({ testing: false, message: res.message, success: false });
      }
    } catch (err: any) {
      setFirebaseStatusMsg(`Connection error: ${err?.message || 'Check config'}`);
    } finally {
      setIsSyncingFirebase(false);
    }
  };

  const handleTestConnection = async () => {
    setTestConnectionStatus({ testing: true, message: 'Pinging Firestore...' });
    const res = await testFirestoreConnection();
    setTestConnectionStatus({ testing: false, message: res.message, success: res.success });
  };

  const handleWriteLiveTestRecord = async () => {
    setIsWritingTestRecord(true);
    setTestRecordResult(null);
    try {
      const res = await writeSampleTestAppointment();
      setTestRecordResult(res);
      if (res.success) {
        setAppointments(getStoredAppointments());
      }
    } finally {
      setIsWritingTestRecord(false);
    }
  };

  const handleResetToDefaultAccount = async () => {
    setIsSyncingFirebase(true);
    try {
      await resetToDefaultFirebaseAccount();
      const def = getActiveFirebaseConfig();
      setActiveConfig(def);
      setIsCustomAccount(false);
      setRawConfigSnippet('');
      setTestConnectionStatus(null);
      setFirebaseStatusMsg('Reverted back to default primary Firebase project.');
      setTimeout(() => setFirebaseStatusMsg(''), 3500);
    } finally {
      setIsSyncingFirebase(false);
    }
  };

  const [copiedRules, setCopiedRules] = useState(false);

  const handleCopyRules = () => {
    const rulesText = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;
    navigator.clipboard.writeText(rulesText);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 3000);
  };

  const handleSyncSingleAppointment = async (apt: CustomerAppointment) => {
    try {
      const res = await syncAppointmentToFirestore(apt);
      if (res.success) {
        apt.firestoreSynced = true;
        apt.firestoreError = undefined;
        setAppointments([...getStoredAppointments()]);
        setFirebaseStatusMsg(`Appointment ${apt.id} successfully synced to Firestore!`);
        setTimeout(() => setFirebaseStatusMsg(''), 4000);
      } else {
        setFirebaseStatusMsg(`Sync error for ${apt.id}: ${res.error || 'Permission Denied'}`);
      }
    } catch (err: any) {
      setFirebaseStatusMsg(`Sync failed: ${err?.message}`);
    }
  };

  const handleSyncAllToFirebase = async () => {
    setIsSyncingFirebase(true);
    setFirebaseStatusMsg('');
    try {
      const res = await syncAllLocalToFirebase(appointments, careerApps);
      if (res.appointmentsCount > 0 || res.careersCount > 0) {
        setFirebaseStatusMsg(`Successfully synced ${res.appointmentsCount} appointments & ${res.careersCount} job applications to Google Firebase Firestore!`);
        setAppointments([...getStoredAppointments()]);
      } else if (res.lastError) {
        setFirebaseStatusMsg(`Sync blocked: ${res.lastError}`);
      } else {
        setFirebaseStatusMsg('All records already synced or no records to push.');
      }
      setTimeout(() => setFirebaseStatusMsg(''), 6000);
    } catch (err: any) {
      setFirebaseStatusMsg(`Firebase sync notice: ${err?.message || 'Check connection'}`);
    } finally {
      setIsSyncingFirebase(false);
    }
  };

  // Export Appointments to CSV
  const handleExportAppointmentsCSV = () => {
    if (appointments.length === 0) {
      alert('No appointments to export.');
      return;
    }

    const headers = [
      'Ticket ID',
      'Created At',
      'Patient Name',
      'Phone',
      'Requested Service',
      'Preferred Date',
      'Preferred Time',
      'Address',
      'Patient Notes',
      'Staff Assignment Note',
      'Status',
      'Source',
    ];

    const rows = appointments.map((a) => [
      `"${a.id}"`,
      `"${a.timestamp}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.phone}"`,
      `"${a.service.replace(/"/g, '""')}"`,
      `"${a.preferredDate || ''}"`,
      `"${a.preferredTime || ''}"`,
      `"${(a.address || '').replace(/"/g, '""')}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
      `"${(a.staffNotes || '').replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.source || 'Booking Modal'}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Anuman_Appointments_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Careers to CSV
  const handleExportCareersCSV = () => {
    if (careerApps.length === 0) {
      alert('No job applications to export.');
      return;
    }

    const headers = [
      'Application ID',
      'Applied On',
      'Applicant Name',
      'Phone',
      'Email',
      'Role Applied',
      'Qualification',
      'Experience',
      'Preferred Shift',
      'Patna Locality',
      'Notes',
      'Status',
    ];

    const rows = careerApps.map((c) => [
      `"${c.id}"`,
      `"${c.timestamp}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.email || ''}"`,
      `"${c.role.replace(/"/g, '""')}"`,
      `"${c.qualification.replace(/"/g, '""')}"`,
      `"${c.experience}"`,
      `"${c.preferredShift}"`,
      `"${(c.preferredLocality || '').replace(/"/g, '""')}"`,
      `"${(c.about || '').replace(/"/g, '""')}"`,
      `"${c.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Anuman_Career_Applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchesStatus =
        selectedStatusFilter === 'All' ? true : apt.status === selectedStatusFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        apt.name.toLowerCase().includes(q) ||
        apt.phone.toLowerCase().includes(q) ||
        apt.service.toLowerCase().includes(q) ||
        apt.id.toLowerCase().includes(q) ||
        (apt.address && apt.address.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [appointments, selectedStatusFilter, searchQuery]);

  // Filtered Careers
  const filteredCareers = useMemo(() => {
    return careerApps.filter((app) => {
      const matchesStatus =
        careerStatusFilter === 'All' ? true : app.status === careerStatusFilter;

      const q = careerSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.phone.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        app.id.toLowerCase().includes(q) ||
        (app.preferredLocality && app.preferredLocality.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [careerApps, careerStatusFilter, careerSearch]);

  // Summary Metrics
  const totalInquiries = appointments.length;
  const inReviewCount = appointments.filter((a) => a.status === 'In Review').length;
  const assignedCount = appointments.filter((a) => a.status === 'Coordinator Assigned').length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const totalApplicants = careerApps.length;
  const newApplicantsCount = careerApps.filter((c) => c.status === 'New Applicant').length;

  const isCloudConfigured = Boolean(activeConfig.projectId?.trim());

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-100 flex flex-col w-screen h-screen overflow-hidden animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Executive Top Navigation Bar */}
      <header className="bg-slate-950 text-white px-4 sm:px-6 py-3 flex items-center justify-between border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold font-heading text-white tracking-wide">
                Anuman Health Care Centre
              </h1>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Staff Operations Portal
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Patna HQ • Bailey Road, Rukanpura | Logged in as: <strong className="text-slate-200">{adminUser?.username || 'Administrator'}</strong>
            </p>
          </div>
        </div>

        {/* Right Side Header Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="Refresh Database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Switch back to public website */}
          <button
            onClick={onClose}
            id="admin-view-website-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors border border-slate-700"
            title="Minimize portal and browse live website"
          >
            <Eye className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>

          {/* Log Out */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to sign out from the Staff Desk?')) {
                onLogout();
              }
            }}
            id="admin-logout-btn"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/60 rounded-xl text-xs font-semibold transition-colors"
            title="Sign out of Staff Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Tab Navigation Ribbon */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-2 overflow-x-auto flex-shrink-0 shadow-2xs">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Tab 1: Patient Appointments */}
          <button
            onClick={() => setActiveTab('appointments')}
            className={`inline-flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Patient Appointments</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                inReviewCount > 0 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {totalInquiries}
            </span>
          </button>

          {/* Tab 2: Career & Staff Applications */}
          <button
            onClick={() => setActiveTab('careers')}
            className={`inline-flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'careers'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Career Applicants (Hiring)</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                newApplicantsCount > 0 ? 'bg-teal-100 text-teal-900' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {totalApplicants}
            </span>
          </button>

          {/* Tab 3: Quick Patient Intake */}
          <button
            onClick={() => setActiveTab('intake')}
            className={`inline-flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'intake'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Phone / Walk-in Intake</span>
          </button>

          {/* Tab 4: Firebase Sync */}
          <button
            onClick={() => setActiveTab('firebase')}
            className={`inline-flex items-center gap-2 py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'firebase'
                ? 'border-teal-700 text-teal-800 bg-teal-50/50'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Cloud Database (Firebase)</span>
            {isCloudConfigured && (
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Cloud Sync Active" />
            )}
          </button>
        </div>

        {/* Database Status indicator */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500">
          <span
            className={`w-2 h-2 rounded-full ${
              isCloudConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span>{isCloudConfigured ? 'Synced with Firestore' : 'Local Storage Mode'}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100">
        <div className="max-w-7xl mx-auto space-y-5">
          
          {/* ======================= TAB 1: PATIENT APPOINTMENTS ======================= */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {/* Metric KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-slate-500 text-xs font-semibold">Total Bookings</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1 font-heading">{totalInquiries}</div>
                  <div className="text-[11px] text-teal-700 mt-0.5">Patna home visits</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-amber-800 text-xs font-semibold">In Review (Pending Call)</div>
                  <div className="text-2xl font-bold text-amber-900 mt-1 font-heading">{inReviewCount}</div>
                  <div className="text-[11px] text-amber-700 mt-0.5">Needs immediate follow-up</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-blue-800 text-xs font-semibold">Staff Assigned</div>
                  <div className="text-2xl font-bold text-blue-900 mt-1 font-heading">{assignedCount}</div>
                  <div className="text-[11px] text-blue-700 mt-0.5">Nurse / attendant rostered</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-emerald-800 text-xs font-semibold">Confirmed & Completed</div>
                  <div className="text-2xl font-bold text-emerald-900 mt-1 font-heading">{confirmedCount + completedCount}</div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Active or safely delivered</div>
                </div>
              </div>

              {/* Search, Filter & Export Toolbar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search patient, phone, ticket ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700 focus:border-teal-700"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="flex items-center gap-1.5 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-slate-500" />
                    <select
                      value={selectedStatusFilter}
                      onChange={(e) => setSelectedStatusFilter(e.target.value)}
                      className="py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                    >
                      <option value="All">All Statuses ({totalInquiries})</option>
                      <option value="In Review">In Review ({inReviewCount})</option>
                      <option value="Coordinator Assigned">Coordinator Assigned ({assignedCount})</option>
                      <option value="Confirmed">Confirmed ({confirmedCount})</option>
                      <option value="Completed">Completed ({completedCount})</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Right Actions: Export & New Intake */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={handleExportAppointmentsCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('intake')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Log Patient Call</span>
                  </button>
                </div>
              </div>

              {/* Appointments List / Table */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                {filteredAppointments.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 space-y-3">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-bold text-slate-700 font-heading">
                      No appointments match your search or filter
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Try clearing your search query or selecting "All Statuses" to see all patient requests.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedStatusFilter('All');
                      }}
                      className="px-4 py-2 bg-teal-50 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold"
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-200">
                    {filteredAppointments.map((apt) => {
                      const isEditingNote = editingStaffNoteId === apt.id;
                      return (
                        <div key={apt.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
                          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                            
                            {/* Patient Info Column */}
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                  {apt.id}
                                </span>
                                <h3 className="text-base font-bold text-slate-900 font-heading">
                                  {apt.name}
                                </h3>
                                <span className="text-xs text-slate-400">
                                  • {apt.timestamp}
                                </span>
                                {apt.source && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                                    {apt.source}
                                  </span>
                                )}
                                {apt.firestoreSynced ? (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-medium border border-emerald-200 inline-flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    Cloud Synced
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleSyncSingleAppointment(apt)}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-medium border border-amber-200 inline-flex items-center gap-1 hover:bg-amber-100 transition-colors"
                                    title="Click to push this appointment to Firebase"
                                  >
                                    <AlertCircle className="w-3 h-3 text-amber-600" />
                                    Local Only &bull; Sync to Cloud &rarr;
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                                <div className="flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                                  <span className="font-bold text-slate-900">{apt.phone}</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                                  <span className="font-semibold text-teal-900">{apt.service}</span>
                                </div>

                                {(apt.preferredDate || apt.preferredTime) && (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                    <span>
                                      {apt.preferredDate || 'Immediate'} ({apt.preferredTime || 'Standard Shift'})
                                    </span>
                                  </div>
                                )}

                                {apt.address && (
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                    <span className="truncate max-w-xs">{apt.address}</span>
                                  </div>
                                )}
                              </div>

                              {/* Patient Clinical Notes */}
                              {apt.notes && (
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                                  <strong className="text-slate-900">Patient Notes:</strong> {apt.notes}
                                </div>
                              )}

                              {/* Coordinator Staff Notes */}
                              <div className="pt-1">
                                {isEditingNote ? (
                                  <div className="space-y-2">
                                    <textarea
                                      rows={2}
                                      value={tempStaffNote}
                                      onChange={(e) => setTempStaffNote(e.target.value)}
                                      placeholder="Assign nurse/attendant name, shift timing, special equipment dispatched..."
                                      className="w-full p-2 bg-white border border-teal-600 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-700"
                                    />
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => handleSaveStaffNote(apt.id)}
                                        className="px-3 py-1 bg-teal-700 hover:bg-teal-800 text-white rounded-md text-xs font-bold"
                                      >
                                        Save Note
                                      </button>
                                      <button
                                        onClick={() => setEditingStaffNoteId(null)}
                                        className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-xs font-semibold"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 text-xs">
                                    <span className="text-slate-500">Coordinator Internal Log:</span>
                                    <span className="italic text-slate-800 font-medium">
                                      {apt.staffNotes || 'No internal note yet'}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setEditingStaffNoteId(apt.id);
                                        setTempStaffNote(apt.staffNotes || '');
                                      }}
                                      className="text-teal-700 hover:text-teal-900 text-[11px] font-bold underline inline-flex items-center gap-0.5"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      <span>Edit</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Status & Immediate Action Buttons */}
                            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                              {/* Status Dropdown */}
                              <div className="w-full sm:w-auto">
                                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                                  Update Status
                                </label>
                                <select
                                  value={apt.status}
                                  onChange={(e) =>
                                    handleStatusChange(apt.id, e.target.value as AppointmentStatus)
                                  }
                                  className={`w-full sm:w-auto text-xs font-bold py-1.5 px-3 rounded-lg border focus:outline-none ${
                                    apt.status === 'In Review'
                                      ? 'bg-amber-50 text-amber-900 border-amber-300'
                                      : apt.status === 'Coordinator Assigned'
                                      ? 'bg-blue-50 text-blue-900 border-blue-300'
                                      : apt.status === 'Confirmed'
                                      ? 'bg-teal-50 text-teal-900 border-teal-300'
                                      : apt.status === 'Completed'
                                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                                      : 'bg-slate-100 text-slate-700 border-slate-300'
                                  }`}
                                >
                                  <option value="In Review">In Review</option>
                                  <option value="Coordinator Assigned">Coordinator Assigned</option>
                                  <option value="Confirmed">Confirmed</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </div>

                              {/* Direct Contact & Delete Actions */}
                              <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                                <a
                                  href={`tel:${apt.phone}`}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-bold transition-colors"
                                  title="Call Patient"
                                >
                                  <Phone className="w-3 h-3 text-teal-700" />
                                  <span>Call</span>
                                </a>

                                <a
                                  href={`https://wa.me/91${apt.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                    `Namaste ${apt.name}, this is regarding your home care inquiry (${apt.id}) at Anuman Home Health Care Centre Patna for ${apt.service}.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-colors"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                                  <span>WhatsApp</span>
                                </a>

                                <button
                                  onClick={() => handleDeleteAppointment(apt.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================= TAB 2: CAREER & STAFF APPLICANTS ======================= */}
          {activeTab === 'careers' && (
            <div className="space-y-4">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-slate-500 text-xs font-semibold">Total Applicants</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1 font-heading">{totalApplicants}</div>
                  <div className="text-[11px] text-teal-700 mt-0.5">Applied via bottom portal</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-amber-800 text-xs font-semibold">New Applications</div>
                  <div className="text-2xl font-bold text-amber-900 mt-1 font-heading">{newApplicantsCount}</div>
                  <div className="text-[11px] text-amber-700 mt-0.5">Awaiting interview call</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-blue-800 text-xs font-semibold">Interview Scheduled</div>
                  <div className="text-2xl font-bold text-blue-900 mt-1 font-heading">
                    {careerApps.filter((c) => c.status === 'Interview Scheduled').length}
                  </div>
                  <div className="text-[11px] text-blue-700 mt-0.5">Candidate document verification</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-emerald-800 text-xs font-semibold">Hired Staff</div>
                  <div className="text-2xl font-bold text-emerald-900 mt-1 font-heading">
                    {careerApps.filter((c) => c.status === 'Hired').length}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-0.5">Active on home rosters</div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search applicant, phone, role..."
                      value={careerSearch}
                      onChange={(e) => setCareerSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                    />
                  </div>

                  <select
                    value={careerStatusFilter}
                    onChange={(e) => setCareerStatusFilter(e.target.value)}
                    className="py-2 px-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                  >
                    <option value="All">All Applicant Statuses ({totalApplicants})</option>
                    <option value="New Applicant">New Applicant ({newApplicantsCount})</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <button
                  onClick={handleExportCareersCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Applicants CSV</span>
                </button>
              </div>

              {/* Applicants List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                {filteredCareers.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 space-y-3">
                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-base font-bold text-slate-700 font-heading">
                      No career applicants match this search
                    </h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Whenever someone applies using the bottom Careers link on the website, their full profile and contact details appear here immediately.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-200">
                    {filteredCareers.map((app) => (
                      <div key={app.id} className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                                {app.id}
                              </span>
                              <h3 className="text-base font-bold text-slate-900 font-heading">
                                {app.name}
                              </h3>
                              <span className="text-xs text-slate-400">• Applied {app.timestamp}</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                              <div className="flex items-center gap-1.5">
                                <Briefcase className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                                <span className="font-bold text-teal-900">{app.role}</span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
                                <span className="font-bold text-slate-900">{app.phone}</span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                <span>{app.qualification} ({app.experience})</span>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                <span>Shift: {app.preferredShift}</span>
                              </div>

                              {app.preferredLocality && (
                                <div className="flex items-center gap-1.5 sm:col-span-2">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                  <span>Preferred Area in Patna: {app.preferredLocality}</span>
                                </div>
                              )}
                            </div>

                            {app.about && (
                              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                                <strong className="text-slate-900">Experience & Skills:</strong> {app.about}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">
                                Candidate Status
                              </label>
                              <select
                                value={app.status}
                                onChange={(e) =>
                                  handleCareerStatusChange(app.id, e.target.value as CareerStatus)
                                }
                                className="text-xs font-bold py-1.5 px-3 rounded-lg border bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-700"
                              >
                                <option value="New Applicant">New Applicant</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Interview Scheduled">Interview Scheduled</option>
                                <option value="Shortlisted">Shortlisted</option>
                                <option value="Hired">Hired</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <a
                                href={`tel:${app.phone}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-bold transition-colors"
                              >
                                <Phone className="w-3 h-3 text-teal-700" />
                                <span>Call</span>
                              </a>

                              <a
                                href={`https://wa.me/91${app.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                  `Hello ${app.name}, this is Anuman Home Health Care Centre Patna HR regarding your application for ${app.role}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold transition-colors"
                              >
                                <MessageCircle className="w-3 h-3 text-emerald-600" />
                                <span>WhatsApp Interview</span>
                              </a>

                              <button
                                onClick={() => handleDeleteCareerApp(app.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Applicant"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================= TAB 3: LOG INTAKE (PHONE CALL / WALK-IN) ======================= */}
          {activeTab === 'intake' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs max-w-3xl mx-auto">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Log Inbound Patient Call / Walk-in Request
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Use this form when a patient's family calls the Patna helpline (7463091878) or visits the Bailey Road office in person.
                </p>
              </div>

              {intakeSuccessMsg && (
                <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{intakeSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleManualIntakeSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Patient / Attendant Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smt. Manju Srivastava"
                      value={manualForm.name}
                      onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Contact Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile (e.g. 9835012345)"
                      value={manualForm.phone}
                      onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Service Requested
                    </label>
                    <select
                      value={manualForm.service}
                      onChange={(e) => setManualForm({ ...manualForm, service: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900"
                    >
                      <option>Certified Home Nurses</option>
                      <option>Experienced GDA Staff</option>
                      <option>Foley Catheterization</option>
                      <option>Ryles Tube Insertion</option>
                      <option>Wound Dressing (Major / Minor)</option>
                      <option>On Call Doctors</option>
                      <option>Rental Medical Equipment (Oxygen / Bed)</option>
                      <option>Laboratory Tests (Free Home Collection)</option>
                      <option>Visiting Physiotherapy</option>
                      <option>Emergency 24x7 Ambulance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Preferred Date & Shift
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={manualForm.preferredDate}
                        onChange={(e) => setManualForm({ ...manualForm, preferredDate: e.target.value })}
                        className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 text-xs"
                      />
                      <select
                        value={manualForm.preferredTime}
                        onChange={(e) => setManualForm({ ...manualForm, preferredTime: e.target.value })}
                        className="w-full px-2 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 text-xs"
                      >
                        <option>Morning (08:00 AM - 12:00 PM)</option>
                        <option>Evening (04:00 PM - 08:00 PM)</option>
                        <option>12-Hour Day Shift</option>
                        <option>12-Hour Night Shift</option>
                        <option>24-Hour Residential Stay</option>
                        <option>Immediate / Urgent</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Patna Address / Colony Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Pillar 54, Bailey Road, Rukanpura, Patna"
                    value={manualForm.address}
                    onChange={(e) => setManualForm({ ...manualForm, address: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Clinical Notes & Coordinator Plan
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Patient is bedridden post-hip surgery. Needs GDA for sponge bath & vitals, plus Nurse every alternate day for sterile dressing."
                    value={manualForm.notes}
                    onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Save Patient Booking</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ======================= TAB 4: FIREBASE SYNC & CLOUD SETTINGS ======================= */}
          {activeTab === 'firebase' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs max-w-3xl mx-auto space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Firebase Cloud Database & Account Switcher
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
                    isCustomAccount
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isCustomAccount ? 'bg-purple-600' : 'bg-emerald-600'} animate-pulse`}></span>
                    <span>{isCustomAccount ? 'Custom Firebase Connected' : 'Primary Firebase Connected'}</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Easily link and store all patient bookings and nurse applications into your personal or company Google Firebase account.
                </p>
              </div>

              {/* Active Firebase Connection Status Card */}
              <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Database className="w-5 h-5 text-teal-400" />
                    <div>
                      <div className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Active Database Instance</div>
                      <div className="font-bold text-base text-white font-mono">{activeConfig.projectId || 'None configured'}</div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                    isCustomAccount
                      ? 'bg-purple-900/60 text-purple-200 border-purple-700'
                      : 'bg-teal-900/60 text-teal-200 border-teal-700'
                  }`}>
                    {isCustomAccount ? 'Your Custom Google Account' : 'Default Provisioned Account'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-700/80">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Database Mode</span>
                    <span className="font-mono text-slate-200">
                      {activeConfig.firestoreDatabaseId || '(default)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">API Key Status</span>
                    <span className="font-mono text-slate-200">
                      {activeConfig.apiKey ? `${activeConfig.apiKey.substring(0, 8)}...` : 'Using Default'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Cloud Sync</span>
                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active & Live
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testConnectionStatus?.testing}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testConnectionStatus?.testing ? 'animate-spin text-teal-400' : ''}`} />
                    <span>{testConnectionStatus?.testing ? 'Testing...' : 'Test Connection / Ping'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWriteLiveTestRecord}
                    disabled={isWritingTestRecord}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors disabled:opacity-50 shadow-xs"
                  >
                    <Send className={`w-3.5 h-3.5 ${isWritingTestRecord ? 'animate-spin' : ''}`} />
                    <span>{isWritingTestRecord ? 'Writing Test Record...' : 'Write Live Test Record to Firestore'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncAllToFirebase}
                    disabled={isSyncingFirebase}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSyncingFirebase ? 'Syncing...' : 'Push Local Data to this Firebase'}</span>
                  </button>

                  {isCustomAccount && (
                    <button
                      type="button"
                      onClick={handleResetToDefaultAccount}
                      disabled={isSyncingFirebase}
                      className="text-xs text-rose-300 hover:text-rose-200 underline font-medium ml-auto"
                    >
                      Revert to default account
                    </button>
                  )}
                </div>

                {/* Direct Firebase Console Shortcuts */}
                <div className="pt-1 flex flex-wrap items-center gap-3 text-[11px]">
                  <span className="text-slate-400">Open in Firebase:</span>
                  <a
                    href={`https://console.firebase.google.com/project/${activeConfig.projectId || 'anuman-92cce'}/firestore/databases/-default-/data`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-300 hover:text-teal-200 underline flex items-center gap-1 font-mono"
                  >
                    <Database className="w-3 h-3" />
                    View Firestore Data Table &rarr;
                  </a>
                  <a
                    href={`https://console.firebase.google.com/project/${activeConfig.projectId || 'anuman-92cce'}/firestore/rules`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-teal-300 hover:text-teal-200 underline flex items-center gap-1 font-mono"
                  >
                    <KeyRound className="w-3 h-3" />
                    View Security Rules &rarr;
                  </a>
                </div>

                {testConnectionStatus && (
                  <div className={`p-3 rounded-lg text-xs font-medium border flex items-start gap-2.5 ${
                    testConnectionStatus.success
                      ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-700 text-rose-200'
                  }`}>
                    {testConnectionStatus.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{testConnectionStatus.message}</span>
                  </div>
                )}

                {testRecordResult && (
                  <div className={`p-3 rounded-lg text-xs font-medium border flex items-start gap-2.5 ${
                    testRecordResult.success
                      ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
                      : 'bg-amber-950/80 border-amber-700 text-amber-200'
                  }`}>
                    {testRecordResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold">{testRecordResult.message}</div>
                      {testRecordResult.appointmentId && testRecordResult.success && (
                        <div className="mt-1 text-[11px] text-emerald-300">
                          Document ID in Firestore: <span className="font-mono font-bold">{testRecordResult.appointmentId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {firebaseStatusMsg && (
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0" />
                  <span>{firebaseStatusMsg}</span>
                </div>
              )}

              {/* Security Rules Fix Guide Card */}
              <div className="border-2 border-amber-300 bg-amber-50/70 rounded-xl p-5 space-y-3.5 shadow-xs">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-slate-900 text-sm">
                        Why is data not showing in your Firestore Database yet?
                      </h4>
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-amber-200 text-amber-950 rounded-md">
                        403: PERMISSION_DENIED
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Your database exists in project <strong className="font-mono text-slate-900">{activeConfig.projectId || 'anuman-92cce'}</strong>, but Google blocks write requests by default until you publish Security Rules. To see inquiries appear live in your Firebase Console, update the rules:
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3 bg-white rounded-lg border border-amber-200 shadow-2xs space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black flex items-center justify-center">1</span>
                      <span>Open Rules Tab</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Go to Firestore Database &gt; Rules in Firebase Console.
                    </p>
                    <div className="pt-1">
                      <a
                        href={`https://console.firebase.google.com/project/${activeConfig.projectId || 'anuman-92cce'}/firestore/rules`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-teal-800 hover:text-teal-900 font-bold underline text-[11px]"
                      >
                        <span>Open Rules Console</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-amber-200 shadow-2xs space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black flex items-center justify-center">2</span>
                      <span>Paste & Publish</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Paste the rules below into the editor, then click the blue <strong>"Publish"</strong> button.
                    </p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleCopyRules}
                        className="inline-flex items-center gap-1 text-teal-800 hover:text-teal-900 font-bold underline text-[11px]"
                      >
                        {copiedRules ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedRules ? 'Copied to Clipboard!' : 'Copy Rules to Clipboard'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-amber-200 shadow-2xs space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black flex items-center justify-center">3</span>
                      <span>Push Local Data</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Click <strong>"Push Local Data to this Firebase"</strong> above. All appointments will instantly appear!
                    </p>
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={handleSyncAllToFirebase}
                        disabled={isSyncingFirebase}
                        className="inline-flex items-center gap-1 text-teal-800 hover:text-teal-900 font-bold underline text-[11px] disabled:opacity-50"
                      >
                        <span>Push All Pending Now &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Code block */}
                <div className="relative bg-slate-900 rounded-lg p-3.5 text-slate-100 font-mono text-xs overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span>firestore.rules</span>
                    <button
                      type="button"
                      onClick={handleCopyRules}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-sans font-semibold transition-colors"
                    >
                      {copiedRules ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedRules ? 'Copied!' : 'Copy Rules'}</span>
                    </button>
                  </div>
                  <pre className="text-emerald-400 font-mono text-[11px] leading-relaxed select-all">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`}
                  </pre>
                </div>
              </div>

              {/* Form to connect another Firebase Account */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-teal-700" />
                      <span>Switch to Another Firebase Account</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Paste your Web App config snippet from your Firebase Console, or enter your Project ID below.
                    </p>
                  </div>
                </div>

                {/* Quick Paste Snippet Area */}
                <div>
                  <label className="block font-bold text-slate-700 text-xs mb-1">
                    Quick Paste: Firebase Config snippet from Firebase Console (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder={`e.g. const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  projectId: "my-custom-account-123",\n  authDomain: "my-custom-account-123.firebaseapp.com"\n};`}
                    value={rawConfigSnippet}
                    onChange={(e) => handlePasteSnippet(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 font-mono text-xs"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Pasting code automatically extracts your Project ID, API Key, and Auth Domain into the fields below.
                  </p>
                </div>

                <form onSubmit={handleConnectNewAccount} className="space-y-3 text-xs pt-1">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Firebase Project ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. my-custom-firebase-project"
                      value={activeConfig.projectId || ''}
                      onChange={(e) =>
                        setActiveConfig({ ...activeConfig, projectId: e.target.value })
                      }
                      className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 font-mono text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Web API Key
                      </label>
                      <input
                        type="text"
                        placeholder="AIzaSy..."
                        value={activeConfig.apiKey || ''}
                        onChange={(e) =>
                          setActiveConfig({ ...activeConfig, apiKey: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Auth Domain
                      </label>
                      <input
                        type="text"
                        placeholder="your-project.firebaseapp.com"
                        value={activeConfig.authDomain || ''}
                        onChange={(e) =>
                          setActiveConfig({ ...activeConfig, authDomain: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        App ID (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="1:123456789:web:abcdef..."
                        value={activeConfig.appId || ''}
                        onChange={(e) =>
                          setActiveConfig({ ...activeConfig, appId: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Firestore Database ID (Optional, defaults to (default))
                      </label>
                      <input
                        type="text"
                        placeholder="(default)"
                        value={activeConfig.firestoreDatabaseId || ''}
                        onChange={(e) =>
                          setActiveConfig({ ...activeConfig, firestoreDatabaseId: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-700 text-slate-900 font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200">
                    <button
                      type="submit"
                      disabled={isSyncingFirebase}
                      className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Save & Connect This Firebase Account</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Instructions on how to get config from Firebase Console */}
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200/80 text-xs text-teal-950 space-y-2">
                <div className="font-bold text-teal-900 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-teal-700" />
                  <span>How to find your credentials on console.firebase.google.com</span>
                </div>
                <ol className="list-decimal list-inside space-y-1 text-teal-900/90 leading-relaxed text-[11px]">
                  <li>Log in to <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-teal-700">console.firebase.google.com</a> with your other Google Account.</li>
                  <li>Click your project &gt; click the <strong>Gear icon</strong> (Project Settings) &gt; <strong>General</strong> tab.</li>
                  <li>Scroll down to <strong>Your apps</strong> &gt; select your Web App (or click <strong>&lt;/&gt; Add web app</strong>).</li>
                  <li>Select <strong>Config</strong>, then copy the snippet and paste it into the box above, or reply with it in this chat!</li>
                </ol>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
