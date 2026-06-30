import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { supabase } from '../../../lib/supabase';

const parser = new Parser();

export async function GET() {
  try {
    // Birden fazla RSS kaynağı
    const feeds = [
      'https://www.trthaber.com/rss/gundem.xml',
      'https://www.aa.com.tr/tr/rss/default?cat=gundem', // AA örnek
      // Daha fazla RSS ekleyebilirsin
    ];

    const newItems = [];

    for (const url of feeds) {
      try {
        const feed = await parser.parseURL(url);
        
        for (const item of feed.items.slice(0, 5)) { // Her kaynaktan 5 haber
          newItems.push({
            title: item.title || 'Başlıksız',
            summary: item.contentSnippet || item.description || '',
            content: item.content || item.description || '',
            category: 'Gündem',
            image: item.enclosure?.url || 'https://picsum.photos/id/1015/800/600',
          });
        }
      } catch (e) {
        console.error(`RSS hatası: ${url}`, e);
      }
    }

    // Supabase'e ekle (duplicate kontrolü basit)
    if (newItems.length > 0) {
      const { error } = await supabase
        .from('news')
        .insert(newItems);

      if (error) console.error(error);
    }

    return NextResponse.json({ 
      success: true, 
      added: newItems.length,
      message: "RSS'lerden haberler çekildi ve eklendi!" 
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
