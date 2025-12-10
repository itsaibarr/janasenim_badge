'use client'

import { useEffect, useRef } from 'react'
import QRCodeLib from 'qrcode'

interface QRCodeProps {
  value: string
  size?: number
}

export default function QRCode({ value, size = 256 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, value, {
        width: size,
      }, (error: any) => {
        if (error) console.error('Error generating QR code', error)
      })
    }
  }, [value, size])

  return <canvas ref={canvasRef} width={size} height={size} />
}
