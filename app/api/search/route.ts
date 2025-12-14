import { NextRequest, NextResponse } from 'next/server';
import { search, vectorSearch, hybridSearch, type SearchOptions } from '@/lib/search/orama-client';

export const dynamic = 'force-dynamic';

// 検索タイプのバリデーション
const VALID_SEARCH_TYPES = ['hybrid', 'fulltext', 'vector'] as const;
type SearchType = typeof VALID_SEARCH_TYPES[number];

// コンテンツタイプのバリデーション
const VALID_CONTENT_TYPES = ['quiz', 'text', 'all'] as const;
type ContentType = typeof VALID_CONTENT_TYPES[number];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') as SearchType | null;
    const contentType = searchParams.get('contentType') as ContentType | null;
    const limitParam = searchParams.get('limit');
    const tagsParam = searchParams.get('tags');

    // クエリパラメータのバリデーション
    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: '検索クエリは必須です' },
        { status: 400 }
      );
    }

    // クエリの長さ制限
    if (query.length > 200) {
      return NextResponse.json(
        { error: '検索クエリは200文字以内にしてください' },
        { status: 400 }
      );
    }

    // 検索タイプのバリデーション
    const searchType: SearchType = type && VALID_SEARCH_TYPES.includes(type) 
      ? type 
      : 'hybrid';

    // コンテンツタイプのバリデーション
    const validatedContentType: ContentType = contentType && VALID_CONTENT_TYPES.includes(contentType)
      ? contentType
      : 'all';

    // 件数のバリデーション
    const limit = limitParam ? Math.min(Math.max(1, parseInt(limitParam, 10)), 50) : 20;

    // タグのパース
    const tags = tagsParam ? tagsParam.split(',').map(t => t.trim()).filter(t => t.length > 0) : undefined;

    // 検索オプション
    const options: SearchOptions = {
      limit,
      contentType: validatedContentType === 'all' ? 'all' : validatedContentType,
      tags,
    };

    // 検索実行
    let results;
    switch (searchType) {
      case 'fulltext':
        results = await search(query, options);
        break;
      case 'vector':
        results = await vectorSearch(query, options);
        break;
      case 'hybrid':
      default:
        results = await hybridSearch(query, options);
        break;
    }

    // レスポンスの整形（contentは長いので短縮）
    const formattedResults = results.map(result => ({
      id: result.id,
      type: result.type,
      title: result.title,
      tags: result.tags,
      author: result.author,
      url: result.url,
      createdAt: result.createdAt,
      score: result.score,
      // contentは最初の200文字のみ返す
      snippet: result.content.slice(0, 200) + (result.content.length > 200 ? '...' : ''),
    }));

    return NextResponse.json({
      query,
      searchType,
      contentType: validatedContentType,
      total: formattedResults.length,
      results: formattedResults,
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: '検索中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

