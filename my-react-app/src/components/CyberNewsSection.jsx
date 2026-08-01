import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Newspaper, 
  Flame, 
  RefreshCw, 
  Search, 
  Clock, 
  Tag, 
  Bookmark, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Radio, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  FileText,
  Upload
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialCyberNews } from '../data/cyberNewsData';

export default function CyberNewsSection({ refreshTrigger }) {
  const [newsList, setNewsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);

  // Upload Form State
  const [uploadForm, setUploadForm] = useState({
    title: '',
    category: 'Zero-Day Exploit',
    summary: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    uploaderName: '',
    uploaderEmail: '',
    tags: 'Cybersecurity, Hacking, Vulnerability'
  });
  const [isSubmittingNews, setIsSubmittingNews] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const categories = [
    'All',
    'Zero-Day Exploit',
    'Ransomware Attack',
    'Data Breach',
    'Malware Alert',
    'Cloud Security',
    'Community Uploads'
  ];

  // Preset cyber image thumbnails for quick selection during news upload
  const presetImages = [
    { label: 'Hacking/Matrix', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' },
    { label: 'Ransomware', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80' },
    { label: 'Cyber Shield', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' },
    { label: 'Server/Cloud', url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80' },
    { label: 'Mobile Security', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' }
  ];

  // Fetch news on mount & when refreshTrigger changes
  useEffect(() => {
    fetchCyberNews();
    const savedBookmarks = localStorage.getItem('cyber_news_bookmarks');
    if (savedBookmarks) {
      try { setBookmarkedIds(JSON.parse(savedBookmarks)); } catch (e) {}
    }
  }, [refreshTrigger]);

  const fetchCyberNews = async () => {
    setIsRefreshing(true);
    let serverNews = [];

    try {
      const res = await fetch(`${API_URL}/api/news`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.news)) {
          serverNews = data.news;
        }
      }
    } catch (err) {
      console.log('Backend server offline, loading cached feeds:', err);
    }

    // Get local user uploads stored in localStorage
    const localUploadedNews = JSON.parse(localStorage.getItem('custom_news') || '[]');

    // Combine server news, local custom uploads, and initial seed news
    const combined = [...serverNews, ...localUploadedNews, ...initialCyberNews];

    // Remove duplicates by title or ID
    const uniqueNews = [];
    const seen = new Set();

    for (const item of combined) {
      const key = (item._id || item.id || item.title).toString();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueNews.push(item);
      }
    }

    // Sort by date descending
    uniqueNews.sort((a, b) => new Date(b.publishedAt || b.createdAt || Date.now()) - new Date(a.publishedAt || a.createdAt || Date.now()));

    setNewsList(uniqueNews);
    setIsRefreshing(false);
  };

  const handleToggleBookmark = (id) => {
    let updated;
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter(bId => bId !== id);
    } else {
      updated = [...bookmarkedIds, id];
    }
    setBookmarkedIds(updated);
    localStorage.setItem('cyber_news_bookmarks', JSON.stringify(updated));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUploadForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.summary) {
      setStatusNotice({ type: 'error', text: 'Please fill out the Title and Summary fields.' });
      return;
    }

    setIsSubmittingNews(true);
    setStatusNotice(null);

    const tagArray = uploadForm.tags.split(',').map(t => t.trim()).filter(Boolean);

    const newArticlePayload = {
      id: 'news-user-' + Date.now(),
      title: uploadForm.title,
      category: uploadForm.category,
      summary: uploadForm.summary,
      content: uploadForm.content || uploadForm.summary,
      imageUrl: uploadForm.imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date().toISOString(),
      author: uploadForm.uploaderName || 'Community Auditor',
      tags: tagArray.length > 0 ? tagArray : ['Cybersecurity', 'Hacking News'],
      isUserUpload: true,
      uploaderName: uploadForm.uploaderName || 'Anonymous Security Analyst',
      uploaderEmail: uploadForm.uploaderEmail || ''
    };

    try {
      await fetch(`${API_URL}/api/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticlePayload)
      });
    } catch (err) {
      console.warn('Server offline, saving news to local storage fallback:', err);
    }

    // Always persist to localStorage for instant local rendering
    const localNews = JSON.parse(localStorage.getItem('custom_news') || '[]');
    localStorage.setItem('custom_news', JSON.stringify([newArticlePayload, ...localNews]));

    // Confetti Celebration
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setStatusNotice({
      type: 'success',
      text: `🚀 Cyber Security News "${uploadForm.title.slice(0, 30)}..." published successfully!`
    });

    setIsSubmittingNews(false);
    setIsUploadModalOpen(false);

    // Reset form fields
    setUploadForm({
      title: '',
      category: 'Zero-Day Exploit',
      summary: '',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      uploaderName: '',
      uploaderEmail: '',
      tags: 'Cybersecurity, Hacking, Vulnerability'
    });

    // Refresh feed
    fetchCyberNews();
  };

  // Filtered news items based on category & search query
  const filteredNews = newsList.filter(item => {
    const matchesCategory = selectedCategory === 'All'
      ? true
      : selectedCategory === 'Community Uploads'
      ? item.isUserUpload === true
      : item.category === selectedCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch = query === '' ||
      item.title?.toLowerCase().includes(query) ||
      item.summary?.toLowerCase().includes(query) ||
      item.tags?.some(t => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hr ago';
    if (diffHours < 24) return `${diffHours} hrs ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  // Featured Hero Story (Top news item)
  const featuredStory = newsList[0];

  return (
    <section id="news" style={{ position: 'relative', padding: '100px 0 80px', minHeight: '100vh', overflow: 'hidden' }}>
      
      {/* Background Ambient Accents */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, rgba(0,0,0,0) 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ width: 'min(92%, 1280px)', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              background: 'rgba(99, 102, 241, 0.12)',
              border: '1px solid var(--border-accent)',
              color: 'var(--accent-primary)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px'
            }}
          >
            <Radio className="animate-pulse" size={16} style={{ color: 'var(--accent-primary)' }} />
            CYBER SECURITY & THREAT INTELLIGENCE FEED
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              margin: '0 0 16px 0'
            }}
          >
            Daily Hacking & Cyber Security News
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              maxWidth: '720px',
              margin: '0 auto 24px',
              lineHeight: 1.6
            }}
          >
            Stay updated with daily security intelligence, zero-day exploit analysis, ransomware threats, and data breach incident advisories.
          </motion.p>

          {/* Action Bar: Post & Sync */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => setIsUploadModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.25s ease'
              }}
            >
              <Upload size={18} />
              Upload / Post Daily Cyber News
            </button>

            <button
              onClick={fetchCyberNews}
              disabled={isRefreshing}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '12px',
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.25s ease'
              }}
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} style={{ color: 'var(--accent-cyan)' }} />
              {isRefreshing ? 'Syncing Feed...' : 'Fetch Live Cyber News'}
            </button>
          </motion.div>
        </div>

        {/* Live News Ticker Bar */}
        <div
          style={{
            background: 'var(--bg-card-solid)',
            border: '1px solid var(--border-light)',
            borderRadius: '14px',
            padding: '10px 18px',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--accent-rose)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.5px',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase'
            }}
          >
            <Flame size={14} /> BREAKING NEWS
          </div>

          <div style={{ flex: 1, overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              style={{ display: 'inline-flex', gap: '32px', fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 600 }}
            >
              {newsList.slice(0, 5).map((item, idx) => (
                <span
                  key={idx}
                  onClick={() => setActiveArticle(item)}
                  style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>•</span>
                  <span>{item.title}</span>
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Featured Hero News Story */}
        {featuredStory && selectedCategory === 'All' && searchQuery === '' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-light)',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              boxShadow: 'var(--shadow-md)',
              position: 'relative'
            }}
          >
            {/* Top Featured Badge */}
            <div
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 10,
                background: 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)',
                color: '#ffffff',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <TrendingUp size={14} /> FEATURED CYBER STORY
            </div>

            <div style={{ height: '100%', minHeight: '280px', position: 'relative', overflow: 'hidden' }}>
              <img
                src={featuredStory.imageUrl}
                alt={featuredStory.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }} />
            </div>

            <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(99, 102, 241, 0.12)',
                    border: '1px solid var(--border-accent)',
                    color: 'var(--accent-primary)',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  ⚡ Security Alert
                </span>

                <span style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {getTimeAgo(featuredStory.publishedAt)}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                  margin: '0 0 14px 0'
                }}
              >
                {featuredStory.title}
              </h3>

              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '14.5px',
                  lineHeight: 1.6,
                  margin: '0 0 24px 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {featuredStory.summary}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveArticle(featuredStory)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '13.5px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <FileText size={16} /> Read Full Intelligence Report
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Bar & Category Filter Tabs */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '20px'
            }}
          >
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', maxWidth: '100%' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: selectedCategory === cat
                      ? '1px solid var(--accent-primary)'
                      : '1px solid var(--border-light)',
                    background: selectedCategory === cat
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'var(--bg-card-solid)',
                    color: selectedCategory === cat ? 'var(--accent-primary)' : 'var(--text-secondary)'
                  }}
                >
                  {cat === 'Community Uploads' ? '⚡ ' + cat : cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div style={{ position: 'relative', width: 'min(100%, 280px)' }}>
              <Search
                size={16}
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search cyber news, vulnerabilities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 14px 9px 38px',
                  borderRadius: '12px',
                  background: 'var(--bg-card-solid)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-primary)',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </div>

        {/* News Cards Grid */}
        {filteredNews.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--bg-card-solid)',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              color: 'var(--text-secondary)'
            }}
          >
            <Shield size={48} style={{ color: 'var(--accent-rose)', marginBottom: '16px' }} />
            <h3 style={{ color: 'var(--text-primary)', margin: '0 0 8px 0' }}>No News Articles Found</h3>
            <p style={{ margin: 0 }}>Try clearing your search query or selecting a different news category.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}
          >
            {filteredNews.map((item, index) => {
              const isBookmarked = bookmarkedIds.includes(item.id || item._id);

              return (
                <motion.div
                  key={item.id || item._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  style={{
                    background: 'var(--bg-card-solid)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Article Card Banner Image */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleToggleBookmark(item.id || item._id); }}
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        background: isBookmarked ? 'var(--accent-primary)' : 'rgba(0, 0, 0, 0.65)',
                        border: 'none',
                        color: '#ffffff',
                        padding: '6px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Bookmark news"
                    >
                      <Bookmark size={15} />
                    </button>
                  </div>

                  {/* News Card Content Body */}
                  <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '11.5px', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                        {item.category}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {getTimeAgo(item.publishedAt)}
                      </span>
                    </div>

                    <h4
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        lineHeight: 1.4,
                        margin: '0 0 10px 0',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.title}
                    </h4>

                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '13.5px',
                        lineHeight: 1.55,
                        margin: '0 0 16px 0',
                        flex: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.summary}
                    </p>

                    {/* Tag Pills */}
                    {item.tags && item.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                        {item.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: '11px',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: 'rgba(99, 102, 241, 0.08)',
                              color: 'var(--text-secondary)',
                              border: '1px solid var(--border-light)'
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer Actions */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '14px',
                        borderTop: '1px solid var(--border-light)'
                      }}
                    >
                      <button
                        onClick={() => setActiveArticle(item)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--accent-primary)',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: 0
                        }}
                      >
                        Read Intel <FileText size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL ARTICLE INTEL MODAL */}
      <AnimatePresence>
        {activeArticle && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(5, 10, 24, 0.75)',
              backdropFilter: 'blur(16px)',
              padding: '20px'
            }}
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '750px',
                maxHeight: '90vh',
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-light)',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Modal Banner Header */}
              <div style={{ position: 'relative', height: '220px' }}>
                <img
                  src={activeArticle.imageUrl || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80'}
                  alt={activeArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-card-solid), transparent)' }} />
                
                <button
                  onClick={() => setActiveArticle(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#ffffff',
                    padding: '8px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Main Body Content */}
              <div style={{ padding: '24px 30px', overflowY: 'auto', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '8px', background: 'rgba(99,102,241,0.12)', color: 'var(--accent-primary)', fontSize: '12px', fontWeight: 700 }}>
                    ⚡ {activeArticle.category}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>
                    Published {getTimeAgo(activeArticle.publishedAt)}
                  </span>
                </div>

                <h2 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.3, margin: '0 0 16px 0' }}>
                  {activeArticle.title}
                </h2>

                <div style={{ background: 'var(--bg-secondary)', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid var(--accent-primary)', marginBottom: '20px' }}>
                  <h4 style={{ color: 'var(--accent-primary)', margin: '0 0 6px 0', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Threat Overview
                  </h4>
                  <p style={{ color: 'var(--text-primary)', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                    {activeArticle.summary}
                  </p>
                </div>

                <h4 style={{ color: 'var(--text-primary)', margin: '0 0 10px 0', fontSize: '15px' }}>Technical Breakdown & Analysis</h4>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: 1.7, marginBottom: '24px', whiteSpace: 'pre-wrap' }}>
                  {activeArticle.content}
                </div>

                {activeArticle.tags && activeArticle.tags.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h5 style={{ color: 'var(--text-muted)', margin: '0 0 8px 0', fontSize: '12px', textTransform: 'uppercase' }}>Associated Tags</h5>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {activeArticle.tags.map((t, idx) => (
                        <span key={idx} style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(99,102,241,0.08)', color: 'var(--text-secondary)', fontSize: '12px', border: '1px solid var(--border-light)' }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '16px 30px', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>
                  Audited & Compiled by: {activeArticle.uploaderName || activeArticle.author || 'Cyber Intelligence Unit'}
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '8px',
                    background: 'var(--accent-primary)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '13px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Close Intel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UPLOAD / SUBMIT CYBER NEWS MODAL */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(5, 10, 24, 0.75)',
              backdropFilter: 'blur(16px)',
              padding: '20px'
            }}
            onClick={() => setIsUploadModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                background: 'var(--bg-card-solid)',
                border: '1px solid var(--border-light)',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {/* Modal Header */}
              <div
                style={{
                  padding: '20px 28px',
                  background: 'var(--bg-secondary)',
                  borderBottom: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-primary)' }}>
                    <Newspaper size={20} />
                  </div>
                  <div>
                    <h3 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
                      Upload Daily Cyber Security News
                    </h3>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '12.5px' }}>
                      Publish security alerts and hacking news directly to your site
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Scroll Area */}
              <form onSubmit={handleNewsSubmit} style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
                
                {statusNotice && (
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      marginBottom: '20px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      background: statusNotice.type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                      border: statusNotice.type === 'success' ? '1px solid #22c55e' : '1px solid #ef4444',
                      color: statusNotice.type === 'success' ? '#4ade80' : '#f87171',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {statusNotice.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                    {statusNotice.text}
                  </div>
                )}

                {/* News Title */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    News Headline / Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="e.g. Critical Zero-Day Vulnerability Discovered in Enterprise VPN Gateway"
                    value={uploadForm.title}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Category */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    Threat Category
                  </label>
                  <select
                    name="category"
                    value={uploadForm.category}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Zero-Day Exploit">Zero-Day Exploit</option>
                    <option value="Ransomware Attack">Ransomware Attack</option>
                    <option value="Data Breach">Data Breach</option>
                    <option value="Malware Alert">Malware Alert</option>
                    <option value="Cloud Security">Cloud Security</option>
                  </select>
                </div>

                {/* Preset Image Selector */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    Select Banner Image
                  </label>
                  <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '8px' }}>
                    {presetImages.map((img, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setUploadForm(prev => ({ ...prev, imageUrl: img.url }))}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: uploadForm.imageUrl === img.url ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-secondary)',
                          border: uploadForm.imageUrl === img.url ? '1px solid var(--accent-primary)' : '1px solid var(--border-light)',
                          color: uploadForm.imageUrl === img.url ? 'var(--accent-primary)' : 'var(--text-secondary)',
                          fontSize: '12px',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        📷 {img.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Or paste custom image URL"
                    value={uploadForm.imageUrl}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      fontSize: '12.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Summary */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    News Summary / Overview *
                  </label>
                  <textarea
                    name="summary"
                    required
                    rows={3}
                    placeholder="Provide a concise 2-3 sentence overview of the security incident or zero-day discovery..."
                    value={uploadForm.summary}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Detailed Intelligence Content */}
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                    Full Technical Details (Optional)
                  </label>
                  <textarea
                    name="content"
                    rows={4}
                    placeholder="Include technical details, attack vectors, and mitigation guidance..."
                    value={uploadForm.content}
                    onChange={handleFormChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-primary)',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Uploader Name & Email Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Reporter Name
                    </label>
                    <input
                      type="text"
                      name="uploaderName"
                      placeholder="Abhinav Karande"
                      value={uploadForm.uploaderName}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        color: 'var(--text-primary)',
                        fontSize: '13.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                      Reporter Email
                    </label>
                    <input
                      type="email"
                      name="uploaderEmail"
                      placeholder="karandeabhinav@gmail.com"
                      value={uploadForm.uploaderEmail}
                      onChange={handleFormChange}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '10px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        color: 'var(--text-primary)',
                        fontSize: '13.5px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmittingNews}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Sparkles size={18} />
                  {isSubmittingNews ? 'Publishing Cyber News...' : 'Publish Daily Cyber Security News'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
