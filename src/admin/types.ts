export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

export interface EnquiryActivity {
  id: string;
  enquiryId: string;
  adminUserId?: string | null;
  adminUser?: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  action: string;
  description: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  enquiryNumber: string;
  fullName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  service: string;
  budgetRange?: string | null;
  message: string;
  source: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'CLOSED';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  internalNotes?: string | null;
  assignedTo?: string | null;
  createdAt: string;
  updatedAt: string;
  activities?: EnquiryActivity[];
}

export interface DashboardStats {
  totalEnquiries: number;
  newToday: number;
  statusCounts: Record<string, number>;
  serviceCounts: Record<string, number>;
  priorityCounts: Record<string, number>;
  conversionRate: number;
  recentEnquiries: Enquiry[];
}
