'use client';
import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  X as CloseIcon, // Rename X to avoid conflict with X Brand Logo
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Copy, 
  ExternalLink,
  Plus,
  ShieldCheck,
  RefreshCw,
  LogOut,
  Zap,
  Eye,
  EyeOff,
  Lock,
  Filter,
  Sparkles,
  UserPlus,
  BookOpen,
  Send,
  Lightbulb,
  Award,
  Crown,
  Compass,
  GraduationCap,
  Share2,
  Bookmark,
  MessageSquarePlus,
  ArrowRight,
  QrCode,
  Github,
  Globe,
  Image as ImageIcon,
  Menu, // Import Menu icon for mobile
  MessageCircle
} from 'lucide-react';

// --- Custom Brand Icons (SVG) ---

// 1. Official X Logo (The new Twitter)
const XBrandLogo = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// 2. Official Telegram Logo (Paper Plane)
const TelegramLogo = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Custom App Logo Component (Your Gold Pickaxe Image) ---
const AppLogo = ({ className = "w-8 h-8" }) => (
  <div className={`${className} relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 shadow-lg group`}>
    <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    {/* ⚠️ 真实开发替换指南: 确保 logo.png 在 public 文件夹中 */}
    <img 
      src="/logo.png" 
      alt="X-GoldRush Logo" 
      className="w-[80%] h-[80%] object-contain relative z-10"
      onError={(e) => {
        e.target.style.display = 'none';
        e.target.nextSibling.style.display = 'flex';
      }}
    />
    <div className="hidden absolute inset-0 flex-col items-center justify-center bg-slate-900 text-slate-500">
      <ImageIcon size={12} />
      <span className="text-[6px] font-bold mt-0.5 tracking-tighter">LOGO</span>
    </div>
  </div>
);

// --- Internationalization Data ---
const TRANSLATIONS = {
  zh: {
    app_name: 'X-GoldRush',
    app_slogan: '推特掘金站',
    nav_tools: '掘金罗盘',
    nav_mutual: '创作者联盟',
    nav_resources: '变现学院',
    login_btn: '连接 X 账号',
    login_loading: '连接中...',
    logout: '退出登录',
    footer_desc: '专为 X (推特) 创作者打造的变现加速器。',
    footer_privacy: '隐私保护',
    footer_api: '不调用 Write API',
    footer_scam: '防骗指南',
    footer_collab: '项目共建',
    footer_donate: '捐赠支持',
    
    // Tools Section
    hero_title_1: 'X 掘金，',
    hero_title_2: '从这里开始',
    hero_desc_guest: '一站式评估账号价值，规避限流风险，加速获取收益资格。',
    hero_desc_user: '欢迎回来，{name}。这是您的专属变现仪表盘。',
    calc_title: '收益计算器',
    calc_sync: '已同步您的近期流量',
    calc_niche_label: '账号赛道 (影响 RPM 单价)',
    calc_impressions_label: '月展示量 (Impressions)',
    calc_est_revenue: '预估月广告分成',
    calc_breakeven: '只需 {amount} 万流量即可赚回蓝标费($8)',
    calc_share_btn: '生成战报并分享引流',
    calc_share_text: '💰 我用 X-GoldRush 测算了我的账号潜力！\n\n📊 月流量估算: {impressions}万\n💸 潜在月收入: ${revenue}\n🎯 赛道: {niche}\n\n👉 快来测测你的推特账号值多少钱：\nhttps://x-goldrush.vercel.app/ #XRevenue #Monetization',

    check_title: '收益开通资格自检',
    check_sync: '数据已同步',
    check_progress: '达成进度',
    check_item_verified: '订阅 Premium (蓝标)',
    check_desc_verified: '必须是会员才能开启收益',
    check_badge_verified: '硬门槛',
    check_item_followers: '拥有 {count} 名关注者',
    check_desc_followers_guest: '真实活跃粉丝',
    check_desc_followers_user: '当前: {count}',
    check_badge_followers: '社群可解',
    check_badge_followers_insufficient: '不足',
    check_action_followers: '去联盟互助 >',
    check_item_impressions: '3个月内 500万 展示量',
    check_desc_impressions: '包含回复区的展示量',
    check_badge_impressions: '最难点',
    check_auto: 'Auto',

    sens_title: '推文限流检测 (Demo)',
    sens_placeholder: '粘贴您的推文内容检测是否包含降权词汇...',
    sens_btn: '检测',
    sens_safe: '未发现明显高危词汇',
    sens_danger: '发现高危词：{words} (可能导致被隐藏)',
    
    // Mutual Hub
    hub_title: '创作者联盟',
    hub_desc: '连接行业头部与同频伙伴，摆脱单机运营',
    hub_btn_join_guest: '加入联盟 (需登录)',
    hub_btn_join_user: '发布我的名片',
    hub_alert_msg: '列表包含 行业KOL (推荐关注学习) 与 社区成员 (寻找互助)。所有关注行为均跳转至 X 官方平台进行。',
    hub_alert_kol: '行业KOL',
    hub_alert_member: '社区成员',
    hub_refresh: '发现更多创作者',
    hub_badge_kol: '行业精选',
    hub_btn_view: '查看',
    hub_btn_follow: '关注',
    hub_btn_mutual: '互关',
    hub_cat_all: '全部',
    hub_cat_crypto: 'Web3 & 币圈',
    hub_cat_ai_tech: 'AI & 独立开发',
    hub_cat_invest: '美股 & 宏观',
    hub_cat_growth: '运营 & 增长',
    hub_cat_lifestyle: '生活 & 搞笑',

    // Resources
    res_tips_title: '每日运营精选',
    res_tips_desc: '筛选全网最优质的实战经验，每天进步一点点',
    res_tips_btn: '投稿推荐',
    res_academy_title: '变现学院 (新手必读)',
    res_tools_title: '必备工具箱',
    res_read_time: '阅读 {time}',
    res_hot: 'HOT',
    res_ad: '推荐',
    
    // Mock Data Text
    rpm_crypto_label: 'Web3 / 金融 / 币圈', rpm_crypto_desc: '广告主预算高，单价最高',
    rpm_tech_label: 'AI / Tech / 独立开发', rpm_tech_desc: '优质技术受众',
    rpm_business_label: '商业 / 投资 / 搞钱', rpm_business_desc: '高净值人群',
    rpm_general_label: '生活 / 搞笑 / 搬运', rpm_general_desc: '流量大但单价低',
    rpm_adult_label: '擦边 / 敏感内容', rpm_adult_desc: '极难变现，容易被限流',
  },
  en: {
    app_name: 'X-GoldRush',
    app_slogan: 'Monetization Hub',
    nav_tools: 'Compass',
    nav_mutual: 'Alliance',
    nav_resources: 'Academy',
    login_btn: 'Connect X',
    login_loading: 'Connecting...',
    logout: 'Logout',
    footer_desc: 'The ultimate accelerator for X content creators.',
    footer_privacy: 'Privacy',
    footer_api: 'No Write API',
    footer_scam: 'Anti-Scam',
    footer_collab: 'Contribute',
    footer_donate: 'Donate',

    // Tools Section
    hero_title_1: 'Monetize X, ',
    hero_title_2: 'Start Here',
    hero_desc_guest: 'Evaluate account value, avoid shadowbans, and accelerate your monetization eligibility.',
    hero_desc_user: 'Welcome back, {name}. Here is your monetization dashboard.',
    calc_title: 'Revenue Calc',
    calc_sync: 'Synced with recent stats',
    calc_niche_label: 'Account Niche (Affects RPM)',
    calc_impressions_label: 'Monthly Impressions',
    calc_est_revenue: 'Est. Monthly Revenue',
    calc_breakeven: 'Need {amount}0k views to cover X Premium($8)',
    calc_share_btn: 'Generate Report & Share',
    calc_share_text: '💰 I checked my X account potential with X-GoldRush!\n\n📊 Est. Impressions: {impressions}0k\n💸 Potential Revenue: ${revenue}/mo\n🎯 Niche: {niche}\n\n👉 Check yours now:\nhttps://x-goldrush.vercel.app/ #XRevenue #Monetization',

    check_title: 'Eligibility Check',
    check_sync: 'Data Synced',
    check_progress: 'Progress',
    check_item_verified: 'Subscribe Premium (Blue)',
    check_desc_verified: 'Required for revenue sharing',
    check_badge_verified: 'Hard Rule',
    check_item_followers: 'Have {count} Followers',
    check_desc_followers_guest: 'Active real followers',
    check_desc_followers_user: 'Current: {count}',
    check_badge_followers: 'Easy Fix',
    check_badge_followers_insufficient: 'Low',
    check_action_followers: 'Join Alliance >',
    check_item_impressions: '5M Impressions in 3 Months',
    check_desc_impressions: 'Includes reply views',
    check_badge_impressions: 'Hardest',
    check_auto: 'Auto',

    sens_title: 'Shadowban Check (Demo)',
    sens_placeholder: 'Paste your tweet content here to check for risky keywords...',
    sens_btn: 'Check',
    sens_safe: 'No risky keywords found',
    sens_danger: 'Risky words found: {words} (May limit reach)',

    // Mutual Hub
    hub_title: 'Creator Alliance',
    hub_desc: 'Connect with industry leaders and like-minded creators.',
    hub_btn_join_guest: 'Join Alliance (Login)',
    hub_btn_join_user: 'Publish My Card',
    hub_alert_msg: 'List includes Industry KOLs (For learning) and Community Members (For mutuals). All actions redirect to X official site.',
    hub_alert_kol: 'Industry KOLs',
    hub_alert_member: 'Community Members',
    hub_refresh: 'Discover More',
    hub_badge_kol: 'Featured',
    hub_btn_view: 'View',
    hub_btn_follow: 'Follow',
    hub_btn_mutual: 'Mutual',
    hub_cat_all: 'All',
    hub_cat_crypto: 'Web3 & Crypto',
    hub_cat_ai_tech: 'AI & Tech',
    hub_cat_invest: 'Stocks & Macro',
    hub_cat_growth: 'Growth',
    hub_cat_lifestyle: 'Lifestyle',

    // Resources
    res_tips_title: 'Daily Tips',
    res_tips_desc: 'Curated practical experience from top creators.',
    res_tips_btn: 'Submit Tip',
    res_academy_title: 'Academy (Beginner)',
    res_tools_title: 'Essential Tools',
    res_read_time: '{time} read',
    res_hot: 'HOT',
    res_ad: 'Ad',

    // Mock Data Text
    rpm_crypto_label: 'Web3 / Finance / Crypto', rpm_crypto_desc: 'High budget ads, highest RPM',
    rpm_tech_label: 'AI / Tech / Indie Dev', rpm_tech_desc: 'Tech-savvy audience',
    rpm_business_label: 'Business / Invest / Money', rpm_business_desc: 'High net worth',
    rpm_general_label: 'Lifestyle / Fun / Meme', rpm_general_desc: 'High volume, low RPM',
    rpm_adult_label: 'NSFW / Sensitive', rpm_adult_desc: 'Hard to monetize, shadowban risk',
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('tools');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('zh'); // 'zh' or 'en'
  const [isWeChatOpen, setIsWeChatOpen] = useState(false); // State for WeChat QR Modal
  
  // 模拟用户登录状态
  const [user, setUser] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Helper to get translation
  const t = (key, params = {}) => {
    let text = TRANSLATIONS[lang][key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const toggleLang = () => {
    setLang(prev => prev === 'zh' ? 'en' : 'zh');
  };

  const handleLogin = () => {
    setIsLoginLoading(true);
    // 模拟 API 请求延迟
    setTimeout(() => {
      setUser({
        id: 999,
        name: 'Elon Fan',
        handle: '@elon_fan_2025',
        avatar: 'EF',
        followers_count: 850,
        verified: false,
        verified_type: 'none',
        recent_impressions_avg: 15000,
        tweets_per_month: 60,
        tags: ['Web3', '科技'],
        // 模拟已关注列表
        following_ids: [101, 102] 
      });
      setIsLoginLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-yellow-500/30 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('tools')}>
              {/* Replace old logo div with new AppLogo Component */}
              <div className="hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                <AppLogo className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
                  {t('app_name')}
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-medium tracking-wide">
                  {t('app_slogan')}
                </span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-1">
              <NavButton 
                active={activeTab === 'tools'} 
                onClick={() => setActiveTab('tools')} 
                icon={<Compass size={16}/>} 
                text={t('nav_tools')} 
              />
              <NavButton 
                active={activeTab === 'mutual'} 
                onClick={() => setActiveTab('mutual')} 
                icon={<Users size={16}/>} 
                text={t('nav_mutual')} 
              />
              <NavButton 
                active={activeTab === 'resources'} 
                onClick={() => setActiveTab('resources')} 
                icon={<GraduationCap size={16}/>} 
                text={t('nav_resources')} 
              />
            </div>

            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <button 
                onClick={toggleLang}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-bold transition-all"
              >
                <Globe size={14} />
                <span>{lang === 'zh' ? 'EN' : 'CN'}</span>
              </button>

              {!user ? (
                <button 
                  onClick={handleLogin}
                  disabled={isLoginLoading}
                  className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-full text-sm font-medium transition-all border border-slate-700 hover:border-slate-600"
                >
                  {isLoginLoading ? <RefreshCw className="animate-spin" size={16}/> : <XBrandLogo className="w-4 h-4" />}
                  <span>{isLoginLoading ? t('login_loading') : t('login_btn')}</span>
                </button>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold text-white">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.handle}</p>
                  </div>
                  <div className="w-9 h-9 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold border-2 border-slate-800 cursor-pointer hover:scale-105 transition-transform">
                    {user.avatar}
                  </div>
                  <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 ml-2 transition-colors" title={t('logout')}>
                    <LogOut size={18} />
                  </button>
                </div>
              )}

              {/* Mobile Menu Button - CHANGED to Menu icon from Search icon */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-300 p-2 hover:bg-slate-800 rounded-lg transition-colors">
                {isMobileMenuOpen ? <CloseIcon /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav - IMPROVED VISIBILITY */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-4 shadow-2xl relative z-50">
             {!user ? (
                <button onClick={() => {handleLogin(); setIsMobileMenuOpen(false)}} className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-bold mb-4 shadow-lg active:scale-95 transition-transform">
                  <XBrandLogo className="w-5 h-5" /> {t('login_btn')}
                </button>
             ) : (
               <div className="flex items-center gap-3 mb-4 p-4 bg-slate-900 rounded-xl border border-slate-800">
                 <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold">{user.avatar}</div>
                 <div>
                   <p className="text-white font-bold">{user.name}</p>
                   <button onClick={handleLogout} className="text-xs text-red-400 font-medium flex items-center gap-1 mt-1"><LogOut size={12}/> {t('logout')}</button>
                 </div>
               </div>
             )}
            <div className="space-y-1">
              <button onClick={() => {setActiveTab('tools'); setIsMobileMenuOpen(false)}} className={`w-full text-left py-3 px-4 font-medium rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'tools' ? 'bg-slate-800 text-yellow-400' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                <Compass size={20}/> {t('nav_tools')}
              </button>
              <button onClick={() => {setActiveTab('mutual'); setIsMobileMenuOpen(false)}} className={`w-full text-left py-3 px-4 font-medium rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'mutual' ? 'bg-slate-800 text-yellow-400' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                <Users size={20}/> {t('nav_mutual')}
              </button>
              <button onClick={() => {setActiveTab('resources'); setIsMobileMenuOpen(false)}} className={`w-full text-left py-3 px-4 font-medium rounded-xl flex items-center gap-3 transition-colors ${activeTab === 'resources' ? 'bg-slate-800 text-yellow-400' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                <GraduationCap size={20}/> {t('nav_resources')}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl w-full mx-auto px-4 py-8 flex-1">
        {activeTab === 'tools' && <ToolsSection user={user} t={t} lang={lang} />}
        {activeTab === 'mutual' && <MutualHubSection user={user} t={t} lang={lang} />}
        {activeTab === 'resources' && <ResourcesSection t={t} lang={lang} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <AppLogo className="w-8 h-8" />
                <span className="text-lg font-bold text-white">{t('app_name')}</span>
              </div>
              <p className="text-slate-400 text-sm">{t('footer_desc')}</p>
            </div>

            {/* Social Links - Persistent */}
            <div className="flex items-center gap-4">
              <a 
                href="https://x.com/Xiaojing_AI" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all group" 
                title="Follow Author"
              >
                <XBrandLogo className="w-5 h-5 group-hover:text-white" />
              </a>
              
              {/* Telegram Hidden as requested, but keeping component available */}
              {/* <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all group" title="Join Telegram">
                <TelegramLogo className="w-5 h-5 group-hover:text-[#229ED9]" />
              </a> 
              */}

              <button 
                onClick={() => setIsWeChatOpen(true)}
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all group" 
                title="WeChat Contact"
              >
                <QrCode size={18} className="group-hover:text-[#07C160]" />
              </button>
            </div>
          </div>
          
          <div className="border-t border-slate-900 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
             <div className="flex gap-4">
               <span>© 2025 X-GoldRush</span>
               <span>{t('footer_privacy')}</span>
               <span>{t('footer_api')}</span>
             </div>
             <div className="flex gap-4">
               <span className="cursor-pointer hover:text-slate-400">{t('footer_scam')}</span>
               <span className="cursor-pointer hover:text-slate-400">{t('footer_collab')}</span>
               <span className="cursor-pointer hover:text-slate-400">{t('footer_donate')}</span>
             </div>
          </div>
        </div>
      </footer>

      {/* WeChat QR Code Modal */}
      {isWeChatOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setIsWeChatOpen(false)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-sm w-full text-center relative shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsWeChatOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <CloseIcon size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">扫码加我微信</h3>
            <div className="bg-white p-2 rounded-xl mb-4">
               {/* ⚠️ REPLACEMENT GUIDE: Name your QR image 'wechat.png' and put in public/ folder */}
               <img 
                 src="/wechat.png" 
                 alt="WeChat QR Code" 
                 className="w-full h-auto rounded-lg"
                 onError={(e) => {
                   e.target.style.display = 'none'; 
                   e.target.nextSibling.style.display = 'block';
                 }} 
               />
               <div className="hidden py-8 text-slate-500 text-sm">
                 二维码图片未找到<br/>请上传 wechat.png 到 public 目录
               </div>
            </div>
            <p className="text-slate-400 text-sm">微信号: Xiaojingfuye</p>
          </div>
        </div>
      )}
    </div>
  );
};

const NavButton = ({ active, onClick, icon, text }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
      active 
        ? 'text-yellow-400 bg-yellow-500/10' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    {icon}
    <span>{text}</span>
  </button>
);

// --- Sub Components ---

const ToolsSection = ({ user, t, lang }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="text-center mb-10 pt-4">
        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {t('hero_title_1')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{t('hero_title_2')}</span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          {user 
            ? t('hero_desc_user', { name: user.name })
            : t('hero_desc_guest')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <RevenueCalculator user={user} t={t} lang={lang} />
        <MonetizationChecklist user={user} t={t} />
      </div>

      <div className="grid md:grid-cols-1 gap-6 mt-6">
        <SensitiveWordCheck t={t} />
      </div>
    </div>
  );
};

const RevenueCalculator = ({ user, t, lang }) => {
  const [impressions, setImpressions] = useState(100); // Unit: 10k
  const [niche, setNiche] = useState('tech'); // default niche
  const [blueCost, setBlueCost] = useState(8); 
  const [isAutoCalculated, setIsAutoCalculated] = useState(false);

  const rpmRates = {
    crypto: { label: t('rpm_crypto_label'), value: 0.025, desc: t('rpm_crypto_desc') },
    tech: { label: t('rpm_tech_label'), value: 0.015, desc: t('rpm_tech_desc') },
    business: { label: t('rpm_business_label'), value: 0.012, desc: t('rpm_business_desc') },
    general: { label: t('rpm_general_label'), value: 0.003, desc: t('rpm_general_desc') },
    adult: { label: t('rpm_adult_label'), value: 0.001, desc: t('rpm_adult_desc') },
  };

  useEffect(() => {
    if (user) {
      const estimatedImpressions = (user.recent_impressions_avg * user.tweets_per_month) / 10000;
      setImpressions(Math.round(estimatedImpressions));
      setIsAutoCalculated(true);
    }
  }, [user]);
  
  const currentRpm = rpmRates[niche].value;
  const estimatedRevenue = (impressions * 10000 / 1000) * currentRpm;
  const breakEvenImpressions = (blueCost / currentRpm) * 1000;

  // 分享功能
  const handleShare = () => {
    const text = t('calc_share_text', { 
        impressions: impressions, 
        revenue: estimatedRevenue.toFixed(2), 
        niche: rpmRates[niche].label 
    });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-colors">
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
            <Calculator size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{t('calc_title')}</h2>
            {isAutoCalculated && (
              <span className="text-[10px] text-green-400 flex items-center gap-1">
                <Zap size={10} /> {t('calc_sync')}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        
        {/* Niche Selector */}
        <div>
          <label className="block text-slate-400 text-sm mb-2">{t('calc_niche_label')}</label>
          <select 
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-yellow-500"
          >
            {Object.entries(rpmRates).map(([key, data]) => (
              <option key={key} value={key}>{data.label}</option>
            ))}
          </select>
          <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
             <Lightbulb size={10} /> {rpmRates[niche].desc} (~RPM: ${currentRpm})
          </p>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-2 flex justify-between">
            <span>{t('calc_impressions_label')}</span>
            <span className="text-white font-mono">{impressions} {lang === 'zh' ? '万' : '0k'}</span>
          </label>
          <input 
            type="range" 
            min="10" 
            max="5000" 
            step="10"
            value={impressions}
            onChange={(e) => {
              setImpressions(parseInt(e.target.value));
              setIsAutoCalculated(false); 
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
        </div>

        <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-20"></div>
          <p className="text-slate-400 text-sm mb-1">{t('calc_est_revenue')}</p>
          <div className="text-4xl font-black text-white font-mono tracking-tight flex items-center justify-center gap-1">
            <span className="text-yellow-500 text-2xl">$</span>
            {estimatedRevenue.toFixed(2)}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {t('calc_breakeven', { amount: (breakEvenImpressions / 10000).toFixed(1) })}
          </p>
        </div>

        {/* 分享引流按钮 */}
        <button 
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/20 flex items-center justify-center gap-2"
        >
          <Share2 size={18} />
          <span>{t('calc_share_btn')}</span>
        </button>
      </div>
    </div>
  );
};

const MonetizationChecklist = ({ user, t }) => {
  const [checks, setChecks] = useState({
    verified: false,
    followers: false,
    impressions: false
  });

  const FOLLOWER_THRESHOLD = 500; 

  useEffect(() => {
    if (user) {
      setChecks({
        verified: user.verified,
        followers: user.followers_count >= FOLLOWER_THRESHOLD,
        impressions: false
      });
    } else {
      setChecks({ verified: false, followers: false, impressions: false });
    }
  }, [user]);

  const progress = Object.values(checks).filter(Boolean).length * 33.33;
  const toggleCheck = (key) => setChecks(prev => ({...prev, [key]: !prev[key]}));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col hover:border-slate-700 transition-colors">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{t('check_title')}</h2>
          {user && <span className="text-[10px] text-blue-400 flex items-center gap-1"><XBrandLogo className="w-3 h-3" /> {t('check_sync')}</span>}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">{t('check_progress')}</span>
          <span className="text-white font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3 flex-1">
        <CheckItem 
          checked={checks.verified} 
          onClick={() => toggleCheck('verified')}
          title={t('check_item_verified')}
          desc={t('check_desc_verified')}
          badge={t('check_badge_verified')}
          autoVerified={user && user.verified === checks.verified}
          t={t}
        />
        <CheckItem 
          checked={checks.followers} 
          onClick={() => toggleCheck('followers')}
          title={t('check_item_followers', { count: FOLLOWER_THRESHOLD })}
          desc={user ? t('check_desc_followers_user', { count: user.followers_count }) : t('check_desc_followers_guest')}
          badge={user && !checks.followers ? t('check_badge_followers_insufficient') : t('check_badge_followers')}
          actionText={t('check_action_followers')}
          autoVerified={user && (user.followers_count >= FOLLOWER_THRESHOLD) === checks.followers}
          t={t}
        />
        <CheckItem 
          checked={checks.impressions} 
          onClick={() => toggleCheck('impressions')}
          title={t('check_item_impressions')}
          desc={t('check_desc_impressions')}
          badge={t('check_badge_impressions')}
          t={t}
        />
      </div>
    </div>
  );
};

const CheckItem = ({ checked, onClick, title, desc, badge, actionText, autoVerified, t }) => (
  <div 
    onClick={onClick}
    className={`p-3 rounded-xl border cursor-pointer transition-all ${checked ? 'bg-slate-800/50 border-blue-500/30' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
  >
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${checked ? 'bg-blue-500 border-blue-500' : 'border-slate-600'}`}>
        {checked && <CheckCircle2 size={12} className="text-white" />}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className={`text-sm font-bold ${checked ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
          <div className="flex gap-2">
             {autoVerified && <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">{t('check_auto')}</span>}
             {badge && <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full">{badge}</span>}
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1">{desc}</p>
        {!checked && actionText && (
          <p className="text-xs text-yellow-400 mt-1 font-medium hover:underline">{actionText}</p>
        )}
      </div>
    </div>
  </div>
);

const SensitiveWordCheck = ({ t }) => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const checkText = () => {
    if (!text) return;
    const riskyWords = ['杀', '死', '互粉', 'shua', '刷量', '资金盘', 'follow4follow', 'f4f'];
    const found = riskyWords.filter(w => text.includes(w));
    setResult({ safe: found.length === 0, words: found });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-500/20 rounded-lg text-red-400">
          <AlertTriangle size={24} />
        </div>
        <h2 className="text-xl font-bold text-white">{t('sens_title')}</h2>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <textarea 
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-300 focus:outline-none focus:border-yellow-500 resize-none h-24 text-sm"
          placeholder={t('sens_placeholder')}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button 
          onClick={checkText}
          className="md:w-32 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center"
        >
          {t('sens_btn')}
        </button>
      </div>
      {result && (
        <div className={`mt-4 p-3 rounded-lg text-sm flex items-center gap-2 ${result.safe ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {result.safe ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>
            {result.safe ? t('sens_safe') : t('sens_danger', { words: result.words.join(', ') })}
          </span>
        </div>
      )}
    </div>
  );
};

const MutualHubSection = ({ user, t, lang }) => {
  // 1. 定义分类（包含英文 Key 用于逻辑，中文用于显示）
  const categories = [
    { key: 'all', label: t('hub_cat_all') },
    { key: 'crypto', label: t('hub_cat_crypto') },
    { key: 'ai_tech', label: t('hub_cat_ai_tech') },
    { key: 'invest', label: t('hub_cat_invest') },
    { key: 'growth', label: t('hub_cat_growth') },
    { key: 'lifestyle', label: t('hub_cat_lifestyle') },
  ];

  const [filterCategory, setFilterCategory] = useState('all');

  // 2. 模拟数据：混合了 KOL (is_kol: true) 和 普通用户
  const [activeUsers, setActiveUsers] = useState([
    // --- KOL / 推荐关注 (冷启动填充数据) ---
    { id: 101, is_kol: true, name: 'Elon Musk', handle: '@elonmusk', tags: ['crypto', 'ai_tech', 'tech'], verified: true, avatar: 'EM', followers: 160000000, desc: { zh: 'X 平台拥有者，必关注', en: 'Owner of X. Must follow.' } },
    { id: 102, is_kol: true, name: 'Naval', handle: '@naval', tags: ['invest', 'growth'], verified: true, avatar: 'NA', followers: 2300000, desc: { zh: '硅谷投资人，智慧推文', en: 'Silicon Valley investor. Wise tweets.' } },
    { id: 103, is_kol: true, name: 'Pieter Levels', handle: '@levelsio', tags: ['ai_tech', 'lifestyle'], verified: true, avatar: 'PL', followers: 450000, desc: { zh: '独立开发教父', en: 'Indie Dev Godfather' } },
    { id: 104, is_kol: true, name: 'Vitalik', handle: '@VitalikButerin', tags: ['crypto'], verified: true, avatar: 'VB', followers: 5200000, desc: { zh: '以太坊创始人', en: 'Founder of Ethereum' } },
    
    // --- 社区用户 (模拟互助) ---
    { id: 1, is_kol: false, name: 'CryptoKing', handle: '@crypto_king_99', tags: ['crypto', 'web3'], verified: true, avatar: 'CK', masked: true, followers: 1950 },
    { id: 2, is_kol: false, name: 'AI Explorer', handle: '@ai_daily_news', tags: ['ai_tech', 'tech'], verified: false, avatar: 'AI', masked: true, followers: 1200 },
    { id: 3, is_kol: false, name: 'Lisa Life', handle: '@lisa_lifestyle', tags: ['lifestyle'], verified: false, avatar: 'LI', masked: true, followers: 89 },
    { id: 4, is_kol: false, name: 'Web3 Builder', handle: '@web3_dev_eth', tags: ['crypto', 'ai_tech'], verified: true, avatar: 'WB', masked: true, followers: 5600 },
    { id: 6, is_kol: false, name: 'Stock Talk', handle: '@stock_market_us', tags: ['invest'], verified: true, avatar: 'ST', masked: true, followers: 1880 },
  ]);

  const toggleMask = (id) => {
    setActiveUsers(activeUsers.map(u => u.id === id ? { ...u, masked: !u.masked } : u));
  };

  const getMaskedHandle = (handle) => handle.substring(0, 4) + '****';
  const formatFollowers = (num) => num >= 10000 ? (num / 10000).toFixed(1) + 'w' : num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;

  // Filter Logic
  const displayedUsers = activeUsers.filter(u => {
    const categoryMatch = filterCategory === 'all' || u.tags.some(tag => tag === filterCategory || u.tags.includes(filterCategory));
    const notFollowed = user ? !user.following_ids.includes(u.id) : true;
    if (u.is_kol) return categoryMatch;
    return categoryMatch && notFollowed;
  });

  const sortedUsers = [...displayedUsers].sort((a, b) => (a.is_kol === b.is_kol) ? 0 : a.is_kol ? -1 : 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
            {t('hub_title')} <Users size={24} className="text-yellow-400"/>
          </h2>
          <p className="text-slate-400 text-sm">{t('hub_desc')}</p>
        </div>
        <button 
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20 flex items-center gap-2 transition-all hover:scale-105"
          onClick={() => !user ? alert('Please Login!') : alert('Success!')}
        >
          <Plus size={18} />
          <span>{user ? t('hub_btn_join_user') : t('hub_btn_join_guest')}</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setFilterCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
              filterCategory === cat.key
                ? 'bg-yellow-500 text-slate-900 border-yellow-500' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex items-start gap-3 text-slate-300 text-sm">
        <ShieldCheck className="shrink-0 mt-0.5 text-green-400" size={16} />
        <div>
          <p className="font-bold text-green-400 mb-1">{t('footer_privacy')}</p>
          <p>{t('hub_alert_msg')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[300px] content-start">
        {sortedUsers.map((item) => (
          <div 
            key={item.id} 
            className={`
              p-4 rounded-xl flex flex-col gap-3 transition-colors group relative overflow-hidden border
              ${item.is_kol ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-yellow-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-600'}
            `}
          >
             {/* KOL Badge */}
             {item.is_kol && (
               <div className="absolute top-0 right-0 bg-yellow-500 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                 <Crown size={10} /> {t('hub_badge_kol')}
               </div>
             )}

             <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-slate-400 border shrink-0
                  ${item.is_kol ? 'border-yellow-500/50 bg-slate-800 text-yellow-500' : 'border-slate-700 bg-slate-800'}
                `}>
                  {item.avatar}
                </div>
                <div className="flex-1 min-w-0 z-10">
                  <div className="flex items-center gap-1">
                    <h3 className={`font-bold truncate max-w-[140px] ${item.is_kol ? 'text-yellow-100' : 'text-white'}`}>{item.name}</h3>
                    {item.verified && <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"><CheckCircle2 size={10} className="text-white" /></div>}
                  </div>
                  
                  {/* Handle & Mask logic */}
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`text-xs truncate font-mono ${item.masked && !item.is_kol ? 'text-slate-600 blur-[2px]' : 'text-slate-500'}`}>
                      {item.masked && !item.is_kol ? getMaskedHandle(item.handle) : item.handle}
                    </p>
                    {!item.is_kol && (
                      <button onClick={() => toggleMask(item.id)} className="text-slate-500 hover:text-white transition-colors">
                        {item.masked ? <Eye size={12}/> : <EyeOff size={12}/>}
                      </button>
                    )}
                  </div>
                </div>
             </div>

             {/* Description (KOL) or Tags (Member) */}
             <div className="border-t border-slate-800/50 pt-3 flex-1">
                {item.is_kol ? (
                  <p className="text-xs text-slate-400 line-clamp-2">{item.desc[lang]}</p>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded border border-slate-700">{tag}</span>
                    ))}
                  </div>
                )}
             </div>

             {/* Footer Stats & Action */}
             <div className="flex items-center justify-between mt-1">
                <div className={`text-xs font-mono flex items-center gap-1 ${!item.is_kol && item.followers >= 1800 ? 'text-green-400 font-bold' : 'text-slate-500'}`}>
                   <Users size={12} />
                   {formatFollowers(item.followers)}
                </div>
                
                {(!item.is_kol && item.masked) ? (
                   <button 
                     onClick={() => toggleMask(item.id)}
                     className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-700"
                   >
                     {t('hub_btn_view')}
                   </button>
                ) : (
                   <a 
                     href={`https://twitter.com/${item.handle.replace('@', '')}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className={`
                       px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors
                       ${item.is_kol 
                         ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/30' 
                         : 'bg-white text-slate-900 hover:bg-slate-200'}
                     `}
                   >
                     {item.is_kol ? t('hub_btn_follow') : t('hub_btn_mutual')}
                     <ExternalLink size={10} />
                   </a>
                )}
             </div>
          </div>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <button className="text-slate-400 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors">
          <RefreshCw size={14} /> {t('hub_refresh')}
        </button>
      </div>
    </div>
  );
};

const ResourcesSection = ({ t, lang }) => {
  // 1. 每日精选运营技巧 (Top Section) - Multi-lang support logic example
  const dailyTips = [
    { id: 1, title: { zh: '如何写出第一条爆款Thread？(3个关键结构)', en: 'How to write your first viral Thread? (3 Key Structures)' }, author: '@FinanceYF5', category: {zh:'内容创作', en:'Creation'}, url: '#' },
    { id: 2, title: { zh: '2025年推特算法更新解读：回复权重提升了？', en: '2025 Algorithm Update: Replies weighted more?' }, author: '@AlgorithmWatch', category: {zh:'算法机制', en:'Algorithm'}, url: '#' },
    { id: 3, title: { zh: '我是如何通过冷启动在30天涨粉1000的', en: 'How I gained 1000 followers in 30 days from scratch' }, author: '@IndieDevStory', category: {zh:'增长实战', en:'Growth'}, url: '#' },
    { id: 4, title: { zh: '避免被Shadowban的10个操作误区', en: '10 Mistakes to avoid Shadowbans' }, author: '@SafetyFirst', category: {zh:'风控安全', en:'Safety'}, url: '#' },
    { id: 5, title: { zh: '适合新手的3个高RPM变现赛道分析', en: '3 High RPM Niches for Beginners' }, author: '@MoneyMaker', category: {zh:'赛道定位', en:'Niche'}, url: '#' },
  ];

  // 2. 变现学院基础教程 (Middle Section)
  const tutorials = [
    { title: { zh: '开通蓝V保姆级教程 (含低价区订阅)', en: 'How to get X Premium (Blue Verified) Cheap' }, category: {zh: '基础建设', en: 'Basics'}, readTime: '5 min' },
    { title: { zh: '新手如何定位高价值赛道？', en: 'Finding High Value Niches' }, category: {zh: '定位指南', en: 'Strategy'}, readTime: '3 min' },
    { title: { zh: 'Strip 支付账号注册与绑定全攻略', en: 'Stripe Setup Guide for Payouts' }, category: {zh: '收款提现', en: 'Payouts'}, readTime: '6 min' },
    { title: { zh: '推特主页装修指南：让转化率翻倍', en: 'Profile Optimization for High Conversion' }, category: {zh: '基础运营', en: 'Profile'}, readTime: '4 min' },
  ];

  // 3. 必备工具 (Bottom Section)
  const tools = [
    { title: '官方申诉入口', desc: {zh: '账号被冻结或限流时使用', en: 'Use when suspended or limited'}, hot: true },
    { title: 'Twitter Media Downloader', desc: {zh: '高清视频/GIF下载工具', en: 'Download HQ Videos/GIFs'} },
    { title: 'AdsPower Browser', desc: {zh: '多账号防关联必备工具', en: 'Anti-detect browser for multiple accounts'}, ad: true },
    { title: 'Shadowban Test', desc: {zh: '检测账号是否被隐形降权', en: 'Check if you are shadowbanned'} },
    { title: 'Typefully', desc: {zh: '优雅的 Thread 编辑与定时发送工具', en: 'Thread editor & scheduler'} },
    { title: 'BlackMagic', desc: {zh: '强大的推特数据分析侧边栏', en: 'Powerful sidebar analytics'} },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      
      {/* --- Section 1: 运营技巧精选 (Daily Tips) --- */}
      <div>
        <div className="flex justify-between items-end mb-6">
           <div>
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Bookmark className="text-yellow-400" size={24}/> {t('res_tips_title')}
             </h2>
             <p className="text-slate-400 text-sm mt-1">{t('res_tips_desc')}</p>
           </div>
           <button 
             onClick={() => alert('Feature coming soon!')}
             className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors border border-slate-700"
           >
             <MessageSquarePlus size={14} /> {t('res_tips_btn')}
           </button>
        </div>

        <div className="grid gap-3">
          {dailyTips.map((tip) => (
            <a 
              key={tip.id} 
              href={tip.url} 
              target="_blank" 
              rel="noreferrer"
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-yellow-500/50 hover:bg-slate-800 transition-all group"
            >
              <div className="flex items-start gap-3">
                 <div className="mt-1 min-w-[4px] h-10 bg-yellow-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                 <div>
                   <h3 className="font-bold text-slate-200 group-hover:text-white text-base mb-1">{tip.title[lang]}</h3>
                   <div className="flex items-center gap-2 text-xs text-slate-500">
                     <span className="text-yellow-500/80">{tip.author}</span>
                     <span>•</span>
                     <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{tip.category[lang]}</span>
                   </div>
                 </div>
              </div>
              <ExternalLink size={18} className="text-slate-600 group-hover:text-yellow-400 transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* --- Section 2: 变现学院基础教程 (Academy) --- */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <GraduationCap className="text-yellow-400" size={24}/> {t('res_academy_title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {tutorials.map((art, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <BookOpen size={40} className="text-white" />
              </div>
              <span className="text-[10px] text-blue-400 font-bold tracking-wider uppercase mb-2 block">{art.category[lang]}</span>
              <h3 className="text-lg font-bold text-slate-100 mb-4 group-hover:text-white leading-snug pr-8">{art.title[lang]}</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                 <span>{t('res_read_time', { time: art.readTime })}</span>
                 <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-slate-400"/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Section 3: 必备工具 (Tools) --- */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Zap className="text-yellow-400" size={24}/> {t('res_tools_title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {tools.map((res, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-600 transition-colors cursor-pointer group h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-slate-200 group-hover:text-yellow-400 transition-colors">{res.title}</h3>
                  <ExternalLink size={14} className="text-slate-600 group-hover:text-white" />
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{res.desc[lang]}</p>
              </div>
              <div className="mt-3 flex gap-2">
                 {res.hot && <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold border border-red-500/30">{t('res_hot')}</span>}
                 {res.ad && <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1.5 py-0.5 rounded font-bold border border-yellow-500/30">{t('res_ad')}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default App;
