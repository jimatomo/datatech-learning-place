import { NextRequest, NextResponse } from 'next/server';
import { search, vectorSearch, hybridSearch, type SearchOptions, type SearchResponse } from '@/lib/search/orama-client';
import { auth0 } from '@/lib/auth0';

export const dynamic = 'force-dynamic';

// 検索タイプのバリデーション
const VALID_SEARCH_TYPES = ['hybrid', 'fulltext', 'vector'] as const;
type SearchType = typeof VALID_SEARCH_TYPES[number];

// コンテンツタイプのバリデーション
const VALID_CONTENT_TYPES = ['quiz', 'text', 'all'] as const;
type ContentType = typeof VALID_CONTENT_TYPES[number];

export async function GET(request: NextRequest) {
  try {
    // 認証チェック
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json(
        { error: '検索機能を利用するにはログインが必要です' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') as SearchType | null;
    const contentType = searchParams.get('contentType') as ContentType | null;
    const limitParam = searchParams.get('limit');
    const tagsParam = searchParams.get('tags');
    const minScoreParam = searchParams.get('minScore');

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
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : NaN;
    const limit = Number.isNaN(parsedLimit) ? 20 : Math.min(Math.max(1, parsedLimit), 50);

    // タグのパース
    const tags = tagsParam ? tagsParam.split(',').map(t => t.trim()).filter(t => t.length > 0) : undefined;

    // 最小スコア閾値のバリデーション（デフォルト: 0.5）
    const parsedMinScore = minScoreParam ? parseFloat(minScoreParam) : NaN;
    const minScore = Number.isNaN(parsedMinScore) 
      ? 0.5  // デフォルト閾値
      : Math.min(Math.max(0, parsedMinScore), 1); // 0〜1の範囲に制限

    // 検索オプション
    const options: SearchOptions = {
      limit,
      contentType: validatedContentType === 'all' ? 'all' : validatedContentType,
      tags,
      minScore,
    };

    // 検索実行
    let searchResponse: SearchResponse;
    switch (searchType) {
      case 'fulltext':
        searchResponse = await search(query, options);
        break;
      case 'vector':
        searchResponse = await vectorSearch(query, options);
        break;
      case 'hybrid':
      default:
        searchResponse = await hybridSearch(query, options);
        break;
    }

    // レスポンスの整形（contentは長いので短縮）
    const formattedResults = searchResponse.results.map(result => ({
      id: result.id,
      type: result.type,
      title: result.title,
      tags: result.tags,
      author: result.author,
      url: result.url,
      createdAt: result.createdAt,
      score: result.score,
      // contentは最初の100文字のみ返す
      snippet: result.content.slice(0, 100) + (result.content.length > 100 ? '...' : ''),
    }));

    return NextResponse.json({
      query,
      searchType,
      contentType: validatedContentType,
      total: searchResponse.total,
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

