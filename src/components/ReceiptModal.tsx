import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Copy, Check, Sparkles, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { BrandItem } from '../types';

interface ReceiptCardProps {
  brand: BrandItem;
  amount: number;
  onClose: () => void;
  onComplete: () => void;
}

export const ReceiptModal: React.FC<ReceiptCardProps> = ({
  brand,
  amount,
  onClose,
  onComplete,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [customAmount, setCustomAmount] = useState(amount);

  const ticketNo = `WLB-${new Date().getTime().toString().slice(-8)}`;
  const dateStr = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const handleCopyText = () => {
    const text = `【双休购 · 反向考核小票】\n凭证编号：${ticketNo}\n考核目标：${brand.name}\n企业评级：${brand.tier} 级 (${brand.weekendPolicyLabel})\n已转移/支持消费：¥${customAmount}\n“老板考核你的KPI，你的钱包考核老板的良心”\n数据查验来自开源双休购：shuangxiugou.vercel.app`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = async () => {
    if (!receiptRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        pixelRatio: 3, // 高清视网膜长图
        backgroundColor: '#faf8f5',
      });
      const link = document.createElement('a');
      link.download = `双休购考核小票-${brand.name}-${ticketNo}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('生成图片失败，可尝试直接复制小票文本');
    } finally {
      setDownloading(false);
    }
  };

  const isBoycott = brand.tier === 'C';

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-sm w-full my-auto space-y-4">
        {/* 顶部控制栏 */}
        <div className="flex items-center justify-between text-white/80 px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            打工人反向考核凭据
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* 拟物热敏小票主体 */}
        <div
          ref={receiptRef}
          className="receipt-tear-top receipt-tear-bottom bg-[#faf8f5] text-slate-900 p-6 shadow-2xl border-x border-[#ebe5dc] relative font-mono select-none overflow-hidden"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.02) 1px, transparent 0)',
            backgroundSize: '8px 8px',
          }}
        >
          {/* 红色印章 / 绿色认证盖戳 */}
          <div className="absolute right-4 top-20 pointer-events-none opacity-85 rotate-[-14deg]">
            {isBoycott ? (
              <div className="border-2 border-rose-600 text-rose-600 rounded-lg px-2.5 py-1 text-[11px] font-black tracking-widest uppercase flex items-center gap-1 shadow-sm">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>违规避雷</span>
              </div>
            ) : (
              <div className="border-2 border-emerald-600 text-emerald-600 rounded-lg px-2.5 py-1 text-[11px] font-black tracking-widest uppercase flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>良心认证</span>
              </div>
            )}
          </div>

          {/* 抬头 */}
          <div className="text-center pb-4 border-b border-dashed border-slate-300 space-y-1">
            <div className="text-base font-black tracking-tighter text-slate-950 flex items-center justify-center gap-1">
              <span>★ 双休购 · 反向考核小票 ★</span>
            </div>
            <div className="text-[10px] text-slate-500 font-sans tracking-tight">
              SHUANGXIUGOU CONSUMER AUDIT RECEIPT
            </div>
            <div className="text-[10px] text-slate-400 font-mono pt-1">
              NO. {ticketNo} · {dateStr}
            </div>
          </div>

          {/* 考核主体信息 */}
          <div className="py-4 border-b border-dashed border-slate-300 space-y-2 text-xs">
            <div className="flex justify-between items-start">
              <span className="text-slate-500">考核执行官:</span>
              <span className="font-bold text-slate-800">清醒打工人 #7709</span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-slate-500 whitespace-nowrap">考核品牌:</span>
              <span className="font-bold text-slate-900 text-right truncate max-w-[180px]">
                {brand.name}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-slate-500 whitespace-nowrap">所属企业:</span>
              <span className="text-[11px] text-slate-600 text-right truncate max-w-[180px]">
                {brand.companyName}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-500">工时健康评级:</span>
              <span
                className={`font-black px-1.5 py-0.5 rounded text-xs ${
                  brand.tier === 'S'
                    ? 'bg-emerald-100 text-emerald-800'
                    : brand.tier === 'A'
                    ? 'bg-green-100 text-green-800'
                    : brand.tier === 'B'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {brand.tier} 级 · {brand.weekendPolicyLabel}
              </span>
            </div>
          </div>

          {/* 金额核算区 */}
          <div className="py-4 border-b border-dashed border-slate-300 space-y-2 text-xs">
            <div className="flex justify-between items-baseline">
              <span className="text-slate-600 font-semibold">
                {isBoycott ? '转移撤销消费金额:' : '注入良心企业预算:'}
              </span>
              <span
                className={`text-xl font-black font-mono ${
                  isBoycott ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {isBoycott ? '-' : '+'} ¥ {customAmount.toLocaleString()}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 leading-normal font-sans">
              {isBoycott
                ? '已从单休/严重违规企业剥离该消费额，并将订单优先转移给合规双休平替。'
                : '用每一次下单，奖励真正实行周末双休、尊重员工休息权的良心品牌。'}
            </div>
          </div>

          {/* 态度标语与条形码 */}
          <div className="pt-4 text-center space-y-3">
            <div className="text-[11px] text-slate-700 font-sans italic font-medium leading-relaxed px-2">
              “老板考核你的 KPI，
              <br />
              你的钱包考核老板的良心。”
            </div>

            {/* 仿真条形码 */}
            <div className="flex flex-col items-center justify-center pt-1">
              <div className="flex items-center gap-[2px] h-9">
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 4, 1, 2, 3, 1].map(
                  (w, i) => (
                    <div
                      key={i}
                      className="bg-slate-800 h-full"
                      style={{ width: `${w * 1.5}px` }}
                    />
                  )
                )}
              </div>
              <div className="text-[9px] text-slate-400 font-mono tracking-widest pt-1">
                SHUANGXIUGOU.VERCEL.APP
              </div>
            </div>
          </div>
        </div>

        {/* 交互调整与按钮区 */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">本次投票消费金额:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">¥</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => setCustomAmount(Math.max(1, Number(e.target.value)))}
                className="w-24 px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-800 text-right focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCopyText}
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制' : '复制文本'}</span>
            </button>

            <button
              onClick={handleDownloadImage}
              disabled={downloading}
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 shadow-md shadow-slate-900/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? '生成中...' : '保存高清图'}</span>
            </button>
          </div>

          <button
            onClick={() => onComplete()}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>确认打卡并计入全网总额</span>
          </button>
        </div>
      </div>
    </div>
  );
};
