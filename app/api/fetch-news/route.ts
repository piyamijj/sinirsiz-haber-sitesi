import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { supabase } from '../../../lib/supabase';

const parser = new Parser();

export async function GET() {
  try {
    const feeds = [
      'https://www.trthaber.com/rss/gundem.xml',
      'https://www.trthaber.com/rss/ekonomi.xml',
      // Daha fazla RSS ekleyebilirsin
    ];

    let addedCount = 0;

    for (const url of feeds) {
      try {
        const feed = await parser.parseURL(url);
        
        for (const item of feed.items.slice(0, 3)) { // Her kaynaktan 3 haber
          const newsItem = {
            title: item.title || 'Başlıksız',
            summary: item.contentSnippet || item.description?.substring(0, 200) || '',
            content: item.content || item.description || '',
            category: feed.title?.includes('Ekonomi') ? 'Ekonomi' : 'Gündem',
            image: item.enclosure?.url || 'https://picsum.photos/id/1015/800/600'
          };

          // Ekle
          const { error } = await supabase.from('news').insert([newsItem]);
          if (!error) addedCount++;
        }
      } catch (e) {
        console.error(`RSS Hatası ${url}:`, e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      added: addedCount,
      message: `${addedCount} haber eklendi!`
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
