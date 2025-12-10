'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Button from '@/components/Button'
import Card from '@/components/Card'
import QRCode from '@/components/QRCode'

interface Comment {
  id: string
  user_id: string
  comment: string
  created_at: string
}

export default function UserPage() {
  const { id } = useParams() as { id: string }
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComments()
  }, [id])

  const fetchComments = async () => {
    try {
      setError(null)
      const res = await fetch(`/api/comments?user_id=${id}`)
      if (!res.ok) {
        throw new Error('Failed to fetch comments')
      }
      const data = await res.json()
      setComments(data)
    } catch (err) {
      setError('Error loading comments. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const postComment = async () => {
    if (!newComment.trim()) return
    try {
      setError(null)
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: id, comment: newComment }),
      })
      if (!res.ok) {
        throw new Error('Failed to post comment')
      }
      setNewComment('')
      fetchComments()
    } catch (err) {
      setError('Error posting comment. Please try again.')
    }
  }

  const loadingElement = (
    <Card className="text-center animate-bounce-in">
      <div className="text-6xl text-red-500 font-black animate-pulse drop-shadow-lg">ЗАГРУЗКА...</div>
      <div className="mt-4 flex justify-center">
        <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Card>
  )

  const errorElement = error && (
    <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-500 animate-shake">
      <div className="text-5xl text-red-500 font-black mb-4 drop-shadow-lg">⚠️ ОШИБКА</div>
      <p className="text-xl mb-6 text-gray-800">{error}</p>
      <Button variant="secondary" onClick={fetchComments}>
        🔄 ПОПЫТАТЬСЯ СНОВА
      </Button>
    </Card>
  )

  const profileCard = (
    <Card className="mb-8 relative">
      <div className="absolute top-4 right-4 text-4xl animate-bounce-in">
        👋
      </div>
      <div className="text-center relative">
        <h1 className="text-8xl font-black leading-none tracking-tighter mb-4 text-black drop-shadow-lg">
          УЧАСТНИК #{id}
        </h1>
        <div className="flex justify-center my-6 animate-bounce-in animation-delay-300">
          <div className="p-4 bg-white rounded-lg shadow-[3px_3px_0px_0px_rgb(13,13,13)] border-4 border-gray-900">
            <QRCode value={`https://janasenim-badge.vercel.app/u/${id}`} size={160} />
          </div>
        </div>
        <p className="text-3xl font-black mt-4 text-orange-500 drop-shadow-lg bg-white/10 px-4 py-2 rounded-lg border-2 border-orange-500">
          📱 Отсканируйте QR-код, чтобы поделиться этой страницей!
        </p>
      </div>
    </Card>
  )

  const commentsSection = (
    <Card>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-6xl font-black">💬 КОММЕНТАРИИ</h2>
        <span className="text-2xl font-bold text-orange-500 bg-orange-100 px-3 py-1 rounded shadow-md">
          {comments.length}
        </span>
      </div>

      <div className="mb-6" />

      <div className="grid gap-6">
        {comments.length === 0 ? (
          <div className="text-center py-16 animate-slide-in bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-4 border-orange-500">
            <div className="text-8xl mb-6 animate-bounce">😴</div>
            <div className="text-6xl font-black mb-6 text-orange-700">НЕТ КОММЕНТАРИЕВ</div>
            <div className="text-3xl text-white bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 rounded-full shadow-[4px_4px_0px_0px_rgb(13,13,13)] border-4 border-white mx-auto max-w-lg">
              ✨ Будьте первым, кто оставит комментарий!
            </div>
          </div>
        ) : (
          comments.map((c, index) => (
            <Card
              key={c.id}
              borderWidth="bold"
              shadow="sharp"
              className={`p-6 animate-slide-in relative overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-2 right-2 text-2xl opacity-20">
                💭
              </div>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-xl leading-relaxed break-words font-medium text-gray-800">
                    {c.comment}
                  </p>
                </div>
                <div className="text-sm text-orange-600 font-bold min-w-fit shrink-0 bg-orange-50 px-3 py-1 rounded-full border-2 border-orange-300">
                  📅 {new Date(c.created_at).toLocaleString('ru-RU')}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="mb-8" />

      <div className="border-t-8 border-gray-900 pt-8 bg-gradient-to-r from-red-50/50 to-orange-50/50 p-6 -m-6 mt-0 rounded-lg">
        <h3 className="text-4xl font-black mb-6 text-center text-red-700">
          ✍️ ОСТАВИТЬ КОММЕНТАРИЙ
        </h3>
        <textarea
          className="w-full bg-white border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgb(13,13,13)] p-4 font-mono text-xl resize-vertical focus:border-red-500 focus:shadow-[5px_5px_0px_0px_rgb(13,13,13),0_0_0_3px_rgb(255,107,53,0.3)] focus:outline-none mb-4 transition-all duration-200"
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="💭 Напишите свой комментарий здесь..."
          maxLength={500}
        />
        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            variant="primary"
            onClick={postComment}
            disabled={!newComment.trim()}
            className="text-xl px-8 py-3"
          >
            🚀 ОТПРАВИТЬ
          </Button>
          <Button
            variant="secondary"
            onClick={() => setNewComment('')}
            disabled={!newComment.trim()}
            className="text-xl px-8 py-3"
          >
            🗑️ ОЧИСТИТЬ
          </Button>
        </div>
        <div className="text-center mt-4">
          <span className={`text-lg font-bold px-3 py-1 rounded-full ${
            newComment.length > 450 ? 'bg-red-100 text-red-700 border-2 border-red-500' :
            newComment.length > 400 ? 'bg-orange-100 text-orange-700 border-2 border-orange-500' :
            'bg-gray-100 text-gray-700 border-2 border-gray-500'
          }`}>
            {newComment.length}/500 символов
          </span>
        </div>
      </div>
    </Card>
  )

  if (loading) return (
    <div className="min-h-screen bg-gray-900 p-4 flex justify-center items-center">
      {loadingElement}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div>
            {profileCard}
            {commentsSection}
          </div>
          <div>
            {/* Sidebar space for future features */}
            <Card>
              <h3 className="text-4xl font-black mb-6 text-gray-900">📊 СТАТИСТИКА</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border-2 border-red-300">
                  <span className="text-xl font-bold text-red-700">Комментариев:</span>
                  <span className="text-5xl font-black text-red-600 drop-shadow-lg">{comments.length}</span>
                </div>
                <div className="flex justify-between items-center bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border-2 border-orange-300">
                  <span className="text-xl font-bold text-orange-700">Пользователь ID:</span>
                  <span className="text-5xl font-black text-orange-600 drop-shadow-lg">#{id}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {errorElement}
      </div>
    </div>
  )
}
