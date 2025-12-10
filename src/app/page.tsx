'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Card from '@/components/Card'

export default function Home() {
  const [userId, setUserId] = useState('')
  const router = useRouter()

  const handleViewUser = () => {
    if (userId.trim()) {
      router.push(`/u/${userId.trim()}`)
    }
  }

  const handleRandomUser = () => {
    const randomId = Math.floor(Math.random() * 50).toString()
    router.push(`/u/${randomId}`)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-orange-400 rounded-full opacity-8 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-yellow-400 rounded-full opacity-6 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <Card className="text-center mb-8 animate-bounce-in">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-2 sm:mb-4 text-black drop-shadow-2xl">
            JANA SENIM BADGE
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-4 sm:mb-6 text-gray-900 drop-shadow-lg">ИНТЕРАКТИВНАЯ СИСТЕМА КОММЕНТАРИЕВ</p>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed text-gray-900 drop-shadow-md px-4">
            Добро пожаловать в мир комментариев! Введите ID пользователя, чтобы просмотреть его страницу,
            оставить отзыв или поделиться ссылкой через QR-код.
          </p>

          <div className="max-w-md mx-auto mb-8 animate-slide-in animation-delay-300 px-4">
            <div className="grid gap-3 sm:gap-4">
              <input
                type="text"
                className="w-full bg-white border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgb(13,13,13)] p-3 sm:p-4 font-mono text-lg sm:text-xl focus:border-red-500 focus:shadow-[5px_5px_0px_0px_rgb(13,13,13),0_0_0_3px_rgb(255,107,53,0.3)] focus:outline-none transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgb(13,13,13)]"
                placeholder="Введите ID пользователя"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleViewUser()}
              />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  variant="primary"
                  onClick={handleViewUser}
                  disabled={!userId.trim()}
                  fullWidth
                  className="text-lg sm:text-xl"
                  size="large"
                >
                  🚀 ПРОСМОТРЕТЬ СТРАНИЦУ
                </Button>
              </div>
              <div className="border-t-4 border-white pt-4">
                <Button
                  variant="secondary"
                  onClick={handleRandomUser}
                  fullWidth
                  className="text-lg sm:text-xl bg-white text-gray-900 border-white"
                  size="large"
                >
                  🎲 СЛУЧАЙНЫЙ ПОЛЬЗОВАТЕЛЬ
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 animate-slide-in animation-delay-600 px-4">
            <div className="p-4 sm:p-6 border-4 border-red-500 bg-white hover:bg-red-50 transition-all duration-300 shadow-[4px_4px_0px_0px_rgb(13,13,13)]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-red-500 mb-2 sm:mb-3 animate-pulse drop-shadow-lg">✓</div>
              <div className="text-lg sm:text-xl font-black text-gray-900">ШЕРИНГ ЧЕРЕЗ QR</div>
            </div>
            <div className="p-4 sm:p-6 border-4 border-orange-500 bg-white hover:bg-orange-50 transition-all duration-300 shadow-[4px_4px_0px_0px_rgb(13,13,13)]">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-500 mb-2 sm:mb-3 animate-pulse animation-delay-200 drop-shadow-lg">✓</div>
              <div className="text-lg sm:text-xl font-black text-gray-900">ОТЗЫВЫ И КОММЕНТАРИИ</div>
            </div>
            <div className="p-4 sm:p-6 border-4 border-red-500 bg-white hover:bg-orange-50 transition-all duration-300 shadow-[4px_4px_0px_0px_rgb(13,13,13)] sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-red-500 mb-2 sm:mb-3 animate-pulse animation-delay-400 drop-shadow-lg">✓</div>
              <div className="text-lg sm:text-xl font-black text-gray-900">СТАТИСТИКА ПОЛЬЗОВАТЕЛЕЙ</div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-200 to-gray-100 animate-slide-in animation-delay-900 px-4 py-6 sm:p-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6 text-center">КАК ПОЛЬЗОВАТЬСЯ:</h3>
          <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl text-gray-900">
            <div className="flex items-start gap-3 sm:gap-6">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 min-w-[3rem] sm:min-w-[4rem] drop-shadow-lg">1</div>
              <div className="pt-1 sm:pt-2">Введите ID любого пользователя (число)</div>
            </div>
            <div className="flex items-start gap-3 sm:gap-6">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 min-w-[3rem] sm:min-w-[4rem] drop-shadow-lg">2</div>
              <div className="pt-1 sm:pt-2">Просмотрите комментарии или оставьте свой</div>
            </div>
            <div className="flex items-start gap-3 sm:gap-6">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 min-w-[3rem] sm:min-w-[4rem] drop-shadow-lg">3</div>
              <div className="pt-1 sm:pt-2">Поделитесь страницей через QR-код</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
