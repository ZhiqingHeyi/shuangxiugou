import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  UserCheck, 
  BadgeCheck, 
  Sparkles,
  Lock
} from 'lucide-react';
import type { BrandItem } from '../types';

interface EmployeeVoteModalProps {
  brand: BrandItem;
  onClose: () => void;
  onSubmit: (brandId: string, voteData: {
    role: string;
    weekendRating: number;
    offWorkTime: string;
    statutoryPay: boolean;
    comment: string;
  }) => void;
}

export const EmployeeVoteModal: React.FC<EmployeeVoteModalProps> = ({
  brand,
  onClose,
  onSubmit,
}) => {
  const [role, setRole] = useState('研发技术');
  const [weekendRating, setWeekendRating] = useState(100);
  const [offWorkTime, setOffWorkTime] = useState('18:30');
  const [statutoryPay, setStatutoryPay] = useState(true);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(brand.id, {
        role,
        weekendRating,
        offWorkTime,
        statutoryPay,
        comment,
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-auto text-slate-900">
        {/* 标题栏 */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                内部员工匿名信标·真实工时公证
              </div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2 pt-1">
                <span>投出你在 {brand.name} 的真实工时</span>
              </h2>
              <p className="text-xs text-slate-400">
                保护隐私：全程端对端匿名，打破企业公关滤镜，还所有打工人以知情权。
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-sm font-bold transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 投票表单 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          {/* 1. 角色岗位 */}
          <div className="space-y-2">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              你的部门/岗位类型:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['研发技术', '产线工人', '职能/人事/财务', '一线门店/骑手/销售'].map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setRole(item)}
                  className={`p-2.5 rounded-xl border text-center font-medium transition ${
                    role === item
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 2. 真实双休落实度 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center font-bold text-slate-700">
              <label className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                周末休息真实情况 (选最符合的一项):
              </label>
              <span className="text-emerald-700 font-mono text-sm">{weekendRating}% 双休指数</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '严格双休从不打折', rate: 100, desc: '周末系统静音/不占用' },
                { label: '大小周或冲刺加班', rate: 60, desc: '阶段性或隔周单休' },
                { label: '常态单休/连轴转', rate: 15, desc: '月休4天或更少' },
              ].map((lvl) => (
                <button
                  type="button"
                  key={lvl.rate}
                  onClick={() => setWeekendRating(lvl.rate)}
                  className={`p-3 rounded-xl border text-left transition ${
                    weekendRating === lvl.rate
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-[11px]">{lvl.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. 平常实际离岗时间 & 加班费 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                平时平均下班时间:
              </label>
              <select
                value={offWorkTime}
                onChange={(e) => setOffWorkTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="17:30">17:30 之前 (神仙外企)</option>
                <option value="18:00">18:00 准点 (标准965)</option>
                <option value="19:00">19:00 左右 (温和弹性)</option>
                <option value="20:30">20:30 左右 (晚间加班)</option>
                <option value="22:00">22:00 以后 (高压连轴转)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                法定加班报酬/福利:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatutoryPay(true)}
                  className={`p-2.5 rounded-xl border text-center transition font-semibold ${
                    statutoryPay
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  ✓ 依法足额发放
                </button>
                <button
                  type="button"
                  onClick={() => setStatutoryPay(false)}
                  className={`p-2.5 rounded-xl border text-center transition font-semibold ${
                    !statutoryPay
                      ? 'border-rose-600 bg-rose-50 text-rose-900 ring-2 ring-rose-500/20'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  ✕ 克扣/强制自愿
                </button>
              </div>
            </div>
          </div>

          {/* 4. 真实证言 (可选) */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              一句话给求职者和消费者的真心话 (匿名展示):
            </label>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="例如：直属老板挺开明，基本到点走 / 赶项目时周末必来，别听HR瞎忽悠..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs leading-relaxed"
            />
          </div>

          {/* 安全隐私保障承诺条 */}
          <div className="p-3 bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-start gap-2 text-[11px] text-slate-500">
            <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              双休购采用零知识客户端混淆：不记录 IP，不关联任何真实账户。你的选票将直接参与计算该企业的综合 WLB 评级。
            </span>
          </div>

          {/* 提交按钮 */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold transition"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition shadow-lg shadow-slate-900/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{isSubmitting ? '入库公证中...' : '提交我的真实工时票'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
