"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Search, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  created_at: string;
}

export default function SinirsizHaber() {
  const [news, setNews] = useState<News[]>([]);
  const [filteredNews, setFilteredNews] = useState<News[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tüm");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newNews, setNewNews] = useState({
    title: "",
    summary: "",
    content: "",
    category: "Politika",
    image: "https://picsum.photos/id/1015/800/600"
  });

  const categories = ["Tüm", "Politika", "Ekonomi", "Spor", "Teknoloji", "Sağlık"];

  // Haberleri Supabase'den çek
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else {
      setNews(data || []);
      setFilteredNews(data || []);
    }
    setLoading(false);
  };

  // Filtreleme
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

  const handleAddNews = async () => {
    if (!newNews.title || !newNews.summary) return alert("Başlık ve özet zorunlu!");

    const { error } = await supabase
      .from('news')
      .insert([newNews]);

    if (error) alert("Hata: " + error.message);
    else {
      alert("Haber eklendi!");
      setShowAddModal(false);
      fetchNews(); // Yenile
      setNewNews({ title: "", summary: "", content: "", category: "Politika", image: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar ve Hero aynı */}
      <nav className="bg-white border-b sticky top-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <h1 className="text-3xl font-bold">Sınırsız Haber</h1>
          <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2">
            <Plus /> Haber Ekle
          </button>
        </div>
      </nav>

      {/* Arama ve Kategoriler */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <input
          type="text"
          placeholder="Haber ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border rounded-3xl mb-6"
        />

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-2 rounded-3xl ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? <p>Yükleniyor...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map(item => (
              <div key={item.id} onClick={() => setSelectedNews(item)} className="bg-white rounded-3xl overflow-hidden cursor-pointer">
                <img src={item.image} className="w-full h-52 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detay Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedNews(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8" onClick={e => e.stopPropagation()}>
            <h1 className="text-3xl font-bold mb-6">{selectedNews.title}</h1>
            <p>{selectedNews.content}</p>
          </div>
        </div>
      )}

      {/* Ekle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">Yeni Haber Ekle</h3>
            <input type="text" placeholder="Başlık" className="w-full p-4 border rounded-2xl mb-4" value={newNews.title} onChange={e => setNewNews({...newNews, title: e.target.value})} />
            <textarea placeholder="Özet" className="w-full p-4 border rounded-2xl h-24 mb-4" value={newNews.summary} onChange={e => setNewNews({...newNews, summary: e.target.value})} />
            <button onClick={handleAddNews} className="w-full bg-blue-600 text-white py-4 rounded-2xl">Yayınla</button>
          </div>
        </div>
      )}
    </div>
  );
}
