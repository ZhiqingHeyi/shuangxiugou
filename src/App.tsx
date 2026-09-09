import { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  Heart, 
  ThumbsDown, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  Building, 
  Receipt, 
  CheckCircle2,
  Filter,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_BRANDS, CATEGORIES } from './data';
import type { BrandItem, WlbTier } from './types';
import { AnimatedCounter } from './components/AnimatedCounter';
import { ReceiptModal } from './components/ReceiptModal';

export function App() {
  const [brands, setBrands] = useState<BrandItem[]>(INITIAL_BRANDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedTier, setSelectedTier] = useState<string>('全部');
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);

  // 互动数据
  const [transferredAmount, setTransferredAmount] = useState(268490);
  const [userVoteHistory, setUserVoteHistory] = useState<Record<string, 'up' | 'down'>>({});
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketBrand, setTicketBrand] = useState<BrandItem | null>(null);
  const [ticketAmount] = useState(199);
  const [showContributeModal, setShowContributeModal] = useState(false);

  // 筛选过滤
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = 
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.keyProducts.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === '全部' || brand.category === selectedCategory;
    const matchesTier = selectedTier === '全部' || brand.tier === selectedTier;

    return matchesSearch && matchesCategory && matchesTier;
  });

  const handleUpvote = (id: string) => {
    if (userVoteHistory[id] === 'up') return;
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, upvotes: b.upvotes + 1 } : b))
    );
    setUserVoteHistory((prev) => ({ ...prev, [id]: 'up' }));
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
  };

  const handleBoycott = (id: string) => {
    if (userVoteHistory[id] === 'down') return;
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, boycotts: b.boycotts + 1 } : b))
    );
    setUserVoteHistory((prev) => ({ ...prev, [id]: 'down' }));
  };

  const openTicketGenerator = (brand: BrandItem) => {
    setTicketBrand(brand);
    setShowTicketModal(true);
  };

  const completeTicketVote = () => {
    setTransferredAmount((prev) => prev + Number(ticketAmount));
    setShowTicketModal(false);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  const getTierBadge = (tier: WlbTier) => {
    switch (tier) {
      case 'S':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black tracking-wide bg-emerald-50 text-emerald-800 border-2 border-emerald-500 shadow-xs uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> S级 · 标杆模范
          </span>
        );
      case 'A':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black tracking-wide bg-teal-50 text-teal-800 border-2 border-teal-500 shadow-xs uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> A级 · 合规双休
          </span>
        );
      case 'B':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black tracking-wide bg-amber-50 text-amber-900 border-2 border-amber-500 shadow-xs uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" /> B级 · 存疑/大小周
          </span>
        );
      case 'C':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black tracking-wide bg-rose-50 text-rose-900 border-2 border-rose-500 shadow-xs uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" /> C级 · 避雷预警
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col bg-noise selection:bg-emerald-500 selection:text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/20">
              休
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900">双休购 · ShuangxiuGo</span>
              <span className="hidden sm:inline-block ml-2 text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium border border-emerald-200">
                反向考核企业
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowContributeModal(true)}
              className="text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg font-medium transition"
            >
              + 提交爆料 / 推荐
            </button>
            <a
              href="https://github.com/ZhiqingHeyi/shuangxiugou"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm transition"
            >
              <span>★ Star on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* 主体大标语与统计看板 */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            把老板考核你的 KPI，变成打工人考核老板的货币选票
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            用每一次下单，支持真正双休的良心企业
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            汇聚官方劳动仲裁记录、ESG 公开报告与全网打工人真实交叉印证。
            <br className="hidden sm:inline" />
            买东西前查一眼，避开单休血汗工厂，把订单留给尊重员工的守法品牌。
          </p>

          {/* 实时转移消费计数看板 */}
          <div className="pt-4 max-w-xl mx-auto space-y-3">
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs text-slate-400 font-medium">全网打工人已转移消费额 (脚投币票)</div>
                <div className="text-2xl sm:text-3xl font-mono font-black text-emerald-400">
                  <AnimatedCounter value={transferredAmount} />
                </div>
              </div>
              <button
                onClick={() => {
                  setTicketBrand(brands[0]);
                  setShowTicketModal(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl transition text-sm shadow-md"
              >
                <Receipt className="w-4 h-4" />
                打卡并生成小票
              </button>
            </div>

            {/* 数据收录统计指标 */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs">
                <div className="font-bold text-slate-900 text-base">{brands.length}</div>
                <div className="text-slate-400 text-[11px]">收录品牌</div>
              </div>
              <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200 shadow-xs">
                <div className="font-bold text-emerald-700 text-base">{brands.filter(b => b.tier === 'S' || b.tier === 'A').length}</div>
                <div className="text-emerald-700/70 text-[11px]">双休红榜</div>
              </div>
              <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200 shadow-xs">
                <div className="font-bold text-amber-700 text-base">{brands.filter(b => b.tier === 'B').length}</div>
                <div className="text-amber-700/70 text-[11px]">大小周观察</div>
              </div>
              <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-200 shadow-xs">
                <div className="font-bold text-rose-700 text-base">{brands.filter(b => b.tier === 'C').length}</div>
                <div className="text-rose-700/70 text-[11px]">避雷预警</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 搜索与分类导航 */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索品牌名称（如：蜂花、星宇、迪卡侬）、公司主体或商品品类（如：车灯、洗发水、机械键盘）..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition text-sm"
            />
          </div>

          {/* 品类选择 */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> 品类:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 评级筛选 */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">评级过滤:</span>
            {['全部', 'S', 'A', 'B', 'C'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition ${
                  selectedTier === tier
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tier === '全部' ? '全部评级' : `${tier} 级`}
              </button>
            ))}
          </div>
        </div>

        {/* 品牌列表卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBrands.map((brand) => {
            const hasBoycotted = userVoteHistory[brand.id] === 'down';
            const hasUpvoted = userVoteHistory[brand.id] === 'up';

            return (
              <div
                key={brand.id}
                className={`bg-white rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between overflow-hidden relative group ${
                  brand.tier === 'C'
                    ? 'border-rose-300 bg-gradient-to-b from-rose-50/40 to-white shadow-rose-500/5'
                    : brand.tier === 'S'
                    ? 'border-emerald-300 bg-gradient-to-b from-emerald-50/30 to-white shadow-emerald-500/5'
                    : 'border-slate-200/80 shadow-slate-900/5'
                }`}
              >
                <div className="p-5 space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                        {brand.logoText}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base leading-snug">{brand.name}</h3>
                        <p className="text-xs text-slate-400 truncate max-w-[180px]">{brand.companyName}</p>
                      </div>
                    </div>
                    {getTierBadge(brand.tier)}
                  </div>

                  {/* 工时状态标签 */}
                  <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-400">工时政策：</span>
                      <span className="font-semibold">{brand.weekendPolicyLabel}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-400">加班对待：</span>
                      <span className="font-semibold">{brand.overtimeLabel}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {brand.summary}
                  </p>

                  {/* 核心产品品类标签 */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {brand.keyProducts.map((p, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* 如果是避雷企业，高亮展示平替推荐 */}
                  {brand.tier === 'C' && brand.alternatives && brand.alternatives.length > 0 && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1.5">
                      <div className="font-bold flex items-center gap-1 text-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        打工人推荐双休平替：
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {brand.alternatives.map((altId) => {
                          const alt = brands.find((b) => b.id === altId);
                          if (!alt) return null;
                          return (
                            <button
                              key={alt.id}
                              onClick={() => setSelectedBrand(alt)}
                              className="bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center gap-1"
                            >
                              <span>{alt.name}</span>
                              <ChevronRight className="w-3 h-3 text-emerald-500" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* 底部交互区 */}
                <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpvote(brand.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border transition ${
                        hasUpvoted
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                      title="我支持这家良心品牌"
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-emerald-600 text-emerald-600' : 'text-slate-400'}`} />
                      <span>{brand.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleBoycott(brand.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border transition ${
                        hasBoycotted
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                      title="用脚投票抵制单休"
                    >
                      <ThumbsDown className={`w-3.5 h-3.5 ${hasBoycotted ? 'fill-rose-600 text-rose-600' : 'text-slate-400'}`} />
                      <span>{brand.boycotts}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openTicketGenerator(brand)}
                      className="text-slate-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                      <span>打卡</span>
                    </button>
                    <button
                      onClick={() => setSelectedBrand(brand)}
                      className="text-emerald-600 hover:text-emerald-700 font-bold inline-flex items-center gap-0.5"
                    >
                      <span>详情证据</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
            <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <div className="text-slate-600 font-medium">未找到匹配的品牌信息</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              库里还没有收录你查的品牌？欢迎点击右上角提交爆料或发起“求扒求证”。
            </p>
            <button
              onClick={() => setShowContributeModal(true)}
              className="inline-flex items-center gap-1 text-xs bg-emerald-600 text-white px-3.5 py-2 rounded-lg font-bold hover:bg-emerald-500 transition"
            >
              + 我来提供这家企业信息
            </button>
          </div>
        )}
      </main>

      {/* 品牌详情与法律证据弹窗 */}
      {selectedBrand && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-6 space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">{selectedBrand.name}</h2>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building className="w-3.5 h-3.5" />
                    {selectedBrand.companyName}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-2">
                {getTierBadge(selectedBrand.tier)}
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {selectedBrand.category}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
                <div className="font-semibold text-slate-800">制度与背景概要：</div>
                <p className="text-slate-600 leading-relaxed">{selectedBrand.summary}</p>
              </div>

              {/* 核心证据链 */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  公开查验与事实证据链 (Timeline)
                </div>
                <div className="space-y-2 border-l-2 border-slate-200 pl-3 ml-1">
                  {selectedBrand.evidence.map((ev) => (
                    <div key={ev.id} className="relative p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                      <div className="absolute -left-[19px] top-3.5 w-2 h-2 rounded-full bg-slate-400 ring-4 ring-white" />
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {ev.date}
                        </span>
                        <span className="bg-slate-200/80 px-2 py-0.5 rounded text-slate-700 font-medium">
                          {ev.type === 'official_punishment' ? '官方处罚/通报' : ev.type === 'judicial_record' ? '司法裁判文书' : 'ESG报告/众包'}
                        </span>
                      </div>
                      <div className="font-bold text-slate-900">{ev.title}</div>
                      <p className="text-slate-600 leading-relaxed">{ev.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 替代品引导 */}
              {selectedBrand.tier === 'C' && selectedBrand.alternatives && (
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-300 text-xs space-y-2.5">
                  <div className="font-black text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>打工人用脚投票推荐：良心双休平替品牌</span>
                  </div>
                  <div className="text-slate-600 leading-normal">
                    不给违法违规与高压单休企业贡献利润，建议优先将消费预算转向以下落实双休的替代品牌：
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {selectedBrand.alternatives.map((altId) => {
                      const alt = brands.find((b) => b.id === altId);
                      if (!alt) return null;
                      return (
                        <button
                          key={alt.id}
                          onClick={() => setSelectedBrand(alt)}
                          className="bg-white hover:bg-emerald-50/80 border border-emerald-300/80 p-2.5 rounded-xl text-left transition flex items-center justify-between group shadow-xs"
                        >
                          <div>
                            <div className="font-bold text-slate-900 text-xs group-hover:text-emerald-700 transition">
                              {alt.name}
                            </div>
                            <div className="text-[11px] text-emerald-700 font-medium">
                              {alt.tier}级 · {alt.weekendPolicyLabel}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    openTicketGenerator(selectedBrand);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <Receipt className="w-4 h-4" /> 生成我的投票小票
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 社交小票生成器 Modal */}
      {showTicketModal && ticketBrand && (
        <ReceiptModal
          brand={ticketBrand}
          amount={ticketAmount}
          onClose={() => setShowTicketModal(false)}
          onComplete={completeTicketVote}
        />
      )}

      {/* 提交推荐/爆料 Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-base">推荐双休品牌 / 提交工时爆料</h3>
              <button
                onClick={() => setShowContributeModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              数据全部依托 GitHub 开源仓库进行公证式治理。你可以通过下方表单提交线索，或直接前往 GitHub 发起 Pull Request。
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('感谢提交！你的线索已被记录，社区审核员将通过裁判文书与公开记录进行交叉核验后入库。');
                setShowContributeModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 font-semibold mb-1">品牌名称 / 常见商品</label>
                <input
                  required
                  placeholder="例如：某个洗发水品牌、键盘品牌"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">所属母公司主体 (选填)</label>
                <input
                  placeholder="例如：企查查/天眼查可搜到的企业全称"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">工时与休假实情</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option value="strict_double">严格双休 / 极少加班 (值得推荐)</option>
                  <option value="alternate">大小周 / 有偿加班</option>
                  <option value="single">单休 / 严重超时加班 (提醒避雷)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">佐证材料 (脱敏截图链接/通报文号/新闻来源)</label>
                <textarea
                  rows={3}
                  placeholder="提供可信公开线索，例如官方通报链接、裁判文书号或员工社区交叉讨论地址"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowContributeModal(false)}
                  className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow-sm"
                >
                  提交审核
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 底部 Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">双休购 · ShuangxiuGo</span>
            <span>- 守护劳动法与打工人休息权</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="https://github.com/ZhiqingHeyi/shuangxiugou" target="_blank" rel="noreferrer" className="hover:text-emerald-600">GitHub 仓库</a>
            <button onClick={() => setShowContributeModal(true)} className="hover:text-emerald-600">提供数据</button>
            <span className="text-slate-300">|</span>
            <span>数据完全开源免责声明：仅作为消费参考</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
