"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface ImageZoomProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  caption?: string
}

export function ImageZoom({
  src,
  alt,
  width = 500,
  height = 300,
  className = "",
  caption
}: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`cursor-zoom-in rounded-lg shadow-md ${className}`}
          />
        </DialogTrigger>
        
        <DialogContent className="max-w-none max-h-none w-screen h-screen p-0 bg-transparent border-none top-0 left-0 translate-x-0 translate-y-0 [&>button]:hidden">
          {/* 背景オーバーレイ（クリックで閉じる） */}
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            {/* 閉じるボタン（画像の上に絶対配置） */}
            <DialogClose asChild>
              <button
                className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black/90 text-white rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>
            
            {/* 拡大画像（直接配置、余分なコンテナなし） */}
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              style={{ display: 'block' }}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      {/* キャプション */}
      {caption && (
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          {caption}
        </p>
      )}
    </div>
  )
}

// より簡単に使えるラッパーコンポーネント
export function ZoomableImage({
  src,
  alt,
  width = 500,
  height = 300,
  caption,
  className = ""
}: ImageZoomProps) {
  return (
    <div className="my-6">
      <ImageZoom
        src={src}
        alt={alt}
        width={width}
        height={height}
        caption={caption}
        className={className}
      />
    </div>
  )
}
