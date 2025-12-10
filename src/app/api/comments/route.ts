import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
  }

  try {
    const snapshot = await db.collection('comments').where('user_id', '==', userId).orderBy('created_at', 'desc').get()
    const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), created_at: doc.data().created_at.toDate().toISOString() }))
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error getting comments:', error)
    return NextResponse.json({ error: 'Failed to get comments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const { user_id, comment } = await request.json()

  if (!user_id || !comment) {
    return NextResponse.json({ error: 'user_id and comment are required' }, { status: 400 })
  }

  try {
    const docRef = await db.collection('comments').add({
      user_id,
      comment,
      created_at: new Date(),
    })
    const newComment = { id: docRef.id, user_id, comment, created_at: new Date().toISOString() }
    return NextResponse.json(newComment)
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 })
  }
}
