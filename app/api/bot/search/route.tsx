import convertToSearchPhrase, { getClient, getVectorSearch } from '@/lib/server-utils';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';


export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const query = payload.query;

    if (typeof query !== 'string' || !query.trim()) {
      return NextResponse.json({ error: 'Query must be a non-empty string' }, { status: 400 });
    }
  
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 1. Generate a clear search phrase WITHOUT date terms
    let searchPhrase = await convertToSearchPhrase(openai, query);
    if (!searchPhrase) searchPhrase = query;
    console.log('Using search phrase for semantic search:', searchPhrase);

    // 2. Embed the search phrase
    const embeddingResponse = await openai.embeddings.create({ 
      input: searchPhrase, 
      model: 'text-embedding-3-small'
    });

    if (!embeddingResponse?.data?.[0]?.embedding) {
      return NextResponse.json({ error: 'Failed to generate embedding' }, { status: 500 });
    }
    const embedding = embeddingResponse.data[0].embedding;

    // 3. Perform vector search in MongoDB with explicit date filter
    const client = await getClient();
    const db = client.db('hausboard');
    const collection = db.collection(`salesland`);

    const vectorSearchResult = await collection.aggregate(getVectorSearch(embedding)).toArray();

    if (vectorSearchResult.length === 0) {
      return NextResponse.json({ message: 'No matching documents found' }, { status: 200 });
    }

    console.log('Vector search results:', vectorSearchResult);
    return NextResponse.json({ vectorSearchResult });

  } catch (err) {
    console.error('Search error!', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
