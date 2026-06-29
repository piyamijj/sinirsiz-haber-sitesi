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
    content: "Cumhurbaşkanı Recep Tayyip Erdoğan, bugün yapılan kabine toplantısı sonrası önemli açıklamalarda bulundu...",
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
    content: "Borsa İstanbul'da yatırımcılar için heyecan verici bir gün...",
    category: "Ekonomi",
    image: "https://picsum.photos/id/160/800/600",
    date: "2026-06-29",
    author: "Mehmet Kaya",
    readTime: "4 dk"
  },
  // Daha fazla haber ekleyebilirsin
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

  const categories = ["Tüm", "Politika", "Ekonomi", "Spor", "Teknoloji", "Sağlık", "Dünya", "Yerel", "Magazin"];

  useEffect(() => {
    let result = news;
    if (selectedCategory !== "Tüm") {
      result = result.filter(item => item.category === selectedCategory);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(term) || 
        item.summary.toLowerCase().includes(term)
      );
    }
    setFilteredNews(result);
  }, [selectedCategory, searchTerm, news]);

  const handleAddNews = () => {
    if (!newNews.title || !newNews.summary) return alert("Başlık ve özet zorunlu!");
    
    const newsItem: News = {
      id: Date.now(),
      ...newNews,
      date: new Date().toISOString().split('T')[0],
      readTime: Math.floor(Math.random() * 5) + 3 + " dk"
    };

    const updated = [newsItem, ...news];
    setNews(updated);
    localStorage.setItem('sinirsizHaberNews', JSON.stringify(updated));
    
    setNewNews({ title: "", summary: "", content: "", category: "Politika", image: "https://picsum.photos/id/1015/800/600", author: "Editör" });
    setShowAddModal(false);
    alert("Haber eklendi!");
  };

  const openNewsDetail = (item: News) => setSelectedNews(item);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar ve diğer bölümler - Tam kod çok uzun, temel versiyon */}
      <nav className="bg-white shadow p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">S</div>
            <h1 className="text-2xl font-bold">Sınırsız Haber</h1>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2">
            <Plus size={18} /> Haber Ekle
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Son Haberler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNews.map(item => (
            <div key={item.id} onClick={() => openNewsDetail(item)} className="bg-white rounded-2xl overflow-hidden cursor-pointer border hover:shadow-lg">
              <img src={item.image} alt="" className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="text-xs text-blue-600 mb-1">{item.category}</div>
                <h3 className="font-semibold text-lg leading-tight mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{item.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detay Modal (basit) */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedNews(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <img src={selectedNews.image} className="w-full h-64 object-cover rounded-t-2xl" />
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">{selectedNews.title}</h1>
              <p>{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
