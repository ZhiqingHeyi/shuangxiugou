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

// 员工真实工作状态与投票
export interface EmployeeVoteStats {
  realDoubleWeekendRate: number; // 员工认定的真实双休率 (0 - 100)%
  avgOffWorkTime: string; // 员工平均下班时间 e.g. "18:30"
  hasStatutoryPayRate: number; // 加班费依法足额发放率
  totalEmployeeVotes: number; // 员工总票数
  anonymousComments: Array<{
    id: string;
    role: string; // e.g. "产线工人" | "研发工程师" | "职能支持" | "销售运营"
    verifiedStatus: 'internal_email' | 'badge_photo' | 'peer_attested';
    comment: string;
    date: string;
    voteType: 'supports_double' | 'reports_overtime';
  }>;
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
  // 双轨投票与员工真实评测
  employeeStats?: EmployeeVoteStats;
}
