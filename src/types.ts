export type WlbTier = 'S' | 'A' | 'B' | 'C';

export type WeekendPolicy = 'strict_double' | 'alternate' | 'single' | 'overtime';

export type OvertimeComp = 'statutory_paid' | 'swap_leave' | 'unpaid' | 'rarely_overtime';

export type AuditStatus = 'official_verified' | 'community_verified' | 'disputed' | 'under_review';

export interface EvidenceRecord {
  id: string;
  date: string;
  type: 'judicial_record' | 'official_punishment' | 'esg_report' | 'crowdsource';
  title: string;
  summary: string;
  sourceUrl?: string;
  caseNumber?: string;
}

export interface BrandItem {
  id: string;
  name: string;
  companyName: string;
  logoText: string;
  category: string;
  tier: WlbTier;
  weekendPolicy: WeekendPolicy;
  weekendPolicyLabel: string;
  overtimeComp: OvertimeComp;
  overtimeLabel: string;
  summary: string;
  keyProducts: string[];
  alternatives?: string[];
  reasons: string[];
  evidence: EvidenceRecord[];
  auditStatus: AuditStatus;
  upvotes: number;
  boycotts: number;
}
