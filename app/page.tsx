"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Clock, Plus, Bell, CloudSun, DollarSign, Trophy, Gift } from 'lucide-react';

interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
}

const initialNews: News[] = [
  {
    id: 1,
    title: "Cumhurbaşkanı Erdoğan'dan kritik açıklamalar: Ekonomide yeni dönem başlıyor",
    summary: "Cumhurbaşkanı Recep Tayyip Erdoğan, ekonomideki son gelişmeleri değerlendirdi ve yeni reform paketini açıkladı.",
    content: "Cumhurbaşkanı Recep Tayyip Erdoğan, bugün yapılan kabine toplantısı sonrası önemli açıklamalarda bulundu. 'Türkiye ekonomisi güçlü temeller üzerinde yükseliyor. Enflasyonla mücadelede kararlıyız.' dedi.",
    category: "Politika",
    image: "https://picsum.photos/id/1015/800/600",
    date: "2026-06-29",
    author: "Ahmet Yılmaz",
    readTime: "5 dk"
  },
  {
    id: 2,
    title: "Borsa İstanbul'da rekor yükseliş: BIST 100 11.000 puanı aştı",
    summary: "Borsa İstanbul'da bugün tarihi bir gün yaşandı. BIST 100 endeksi ilk kez 11.000 puanı geçti.",
    content: "Borsa İstanbul'da yatırımcılar için heyecan verici bir gün. BIST 100 endeksi %3.2 yükselişle 11.050 puana ulaştı.",
    category: "Ekonomi",
    image: "https://picsum.photos/id/160/800/600",
    date: "2026-06-29",
    author: "Mehmet Kaya",
    readTime: "4 dk"
  },
  {
    id: 3,
    title: "Galatasaray'dan tarihi zafer: Şampiyonlar Ligi'nde finale yükseldi",
    summary: "Galatasaray, Şampiyonlar Ligi yarı finalinde rakibini 3-1 mağlup ederek finale kaldı.",
    content: "Galatasaray tarihi bir başarıya imza attı. Şampiyonlar Ligi'nde finale yükselen ilk Türk takımı oldu.",
    category: "Spor",
    image: "https://picsum.photos/id/201/800/600",
    date: "2026-06-28",
    author: "Ali Demir",
    readTime: "6 dk"
  },
  {
    id: 4,
    title: "İstanbul'da nöbetçi eczaneler: 30 Haziran 2026 listesi",
    summary: "İstanbul'da bugün nöbetçi eczane listesi açıklandı.",
    content: "Sağlık Bakanlığı işbirliğiyle hazırlanan nöbetçi eczane listesi yayımlandı.",
    category: "Sağlık",
    image: "https://picsum.photos/id/292/800/600",
    date: "2026-06-29",
    author: "Dr. Fatma Öztürk",
    readTime: "3 dk"
  }
];

export default function SinirsizHaber() {
  const [news, setNews] = useState<News[]>(initialNews);
  const [filteredNews, setFilteredNews] = useState<News[]>(initialNews);
  const [selectedCategory, setSelectedCategory] = useState("Tüm");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [newNews, setNewNews] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Politika",
    image: "https://picsum.photos/id/1015/800/600",
    author: "Editör"
  });

  const categories = ["Tüm", "Politika", "Ekonomi", "Spor", "Teknoloji", "Sağlık", "Dünya", "Yerel"];

  useEffect(() => {
    let result = news;
    if (selectedCategory !== "Tüm") {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(term) || item.summary.toLowerCase().includes(term)
      );
    }
    setFilteredNews(result);
  }, [selectedCategory, searchTerm, news]);

  const handleAddNews = () => {
    if (!newNews.title || !newNews.summary) return alert("Başlık ve özet zorunludur!");

    const newsItem: News = {
      id: Date.now(),
      title: newNews.title,
      summary: newNews.summary,
      content: newNews.content || newNews.summary,
      category: newNews.category,
      image: newNews.image,
      date: new Date().toISOString().split('T')[0],
      author: newNews.author,
      readTime: Math.floor(Math.random() * 5) + 3 + " dk"
    };

    const updatedNews = [newsItem, ...news];
    setNews(updatedNews);
    localStorage.setItem('sinirsizHaberNews', JSON.stringify(updatedNews));
    
    setNewNews({ title: "", summary: "", content: "", category: "Politika", image: "https://picsum.photos/id/1015/800/600", author: "Editör" });
    setShowAddModal(false);
    alert("Haber başarıyla eklendi!");
  };

  const openNewsDetail = (item: News) => setSelectedNews(item);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">S</div>
            <div>
              <h1 className="text-2xl font-bold">Sınırsız Haber</h1>
              <p className="text-xs text-gray-500">Sınırsız Kategori • Mobil Uyumlu</p>
            </div>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl flex items-center gap-2 font-medium">
            <Plus size={18} /> Haber Ekle
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4">Sınırsız Haber</h2>
          <p className="text-xl max-w-md mx-auto">Türkiye'nin her yerinden anlık haberler • Mobil Uyumlu • WebView Uygulama</p>
        </div>
      </div>

      {/* Arama ve Kategoriler */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            placeholder="Haber ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border rounded-3xl focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-3xl text-sm ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white border'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Haberler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(item => (
            <div key={item.id} onClick={() => openNewsDetail(item)} className="bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all">
              <img src={item.image} className="w-full h-52 object-cover" />
              <div className="p-5">
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-blue-600 font-medium">{item.category}</span>
                  <span className="text-gray-500">{item.readTime}</span>
                </div>
                <h3 className="font-semibold text-lg leading-tight mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detay Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedNews(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <img src={selectedNews.image} className="w-full h-64 object-cover rounded-t-3xl" />
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-6">{selectedNews.title}</h1>
              <p className="text-lg text-gray-700 leading-relaxed">{selectedNews.content}</p>
              <button onClick={() => setSelectedNews(null)} className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl">Kapat</button>
            </div>
          </div>
        </div>
      )}

      {/* Haber Ekle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">Yeni Haber Ekle</h3>
            {/* Form alanları */}
            <input type="text" placeholder="Başlık" className="w-full p-4 border rounded-2xl mb-4" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
            <textarea placeholder="Özet" className="w-full p-4 border rounded-2xl h-24 mb-4" value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} />
            <button onClick={handleAddNews} className="w-full bg-blue-600 text-white py-4 rounded-2xl">Yayınla</button>
          </div>
        </div>
      )}
    </div>
  );
}
