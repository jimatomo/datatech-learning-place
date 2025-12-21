import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Datatech Learning Place',
    short_name: 'DTLP',
    description: 'データ技術を学ぶためのオンライン学習プラットフォーム',
    start_url: '/',
    display: 'standalone',
    scope: '/',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-square.png',
        sizes: '1120x1120',
        type: 'image/png',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'productivity'],
    shortcuts: [
      {
        name: 'クイズ',
        short_name: 'Quiz',
        description: 'データ技術に関するクイズにチャレンジ',
        url: '/quiz',
        icons: [{ src: '/icon-square.png', sizes: '1120x1120', type: 'image/png' }],
      },
      {
        name: 'マイページ',
        short_name: 'My Page',
        description: '学習の進捗を確認',
        url: '/harvor',
        icons: [{ src: '/icon-square.png', sizes: '1120x1120', type: 'image/png' }],
      },
    ],
  }
}
