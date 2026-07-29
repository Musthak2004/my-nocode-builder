'use client'

import { useState } from 'react'
import { MessageSquare, X, Send, Loader2, Bug, Sparkles, MessageCircle } from 'lucide-react'

type FeedbackType = 'bug' | 'feature' | 'general'

export default function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [type, setType] = useState<FeedbackType>('general')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) return
    setSubmitting(true)

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message, rating }),
      })
      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setMessage('')
        setRating(null)
        setType('general')
      }, 2000)
    } catch (error) {
      console.error('Feedback error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-foreground text-white p-3.5 rounded-2xl shadow-lg hover:opacity-90 transition-all hover:scale-105 active:scale-95 z-40"
        title="Send feedback"
      >
        <MessageSquare size={20} />
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl border border-border w-80 z-50 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h3 className="font-semibold text-foreground text-[15px]">Share Feedback</h3>
              <p className="text-xs text-foreground-tertiary mt-0.5">Help us improve your experience</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-foreground-tertiary hover:text-foreground hover:bg-surface rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="font-semibold text-foreground">Thank you!</p>
              <p className="text-foreground-secondary text-sm mt-1">Your feedback helps us improve</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Feedback Type */}
              <div>
                <label className="text-xs font-semibold text-foreground-tertiary uppercase tracking-wider block mb-2">
                  Type
                </label>
                <div className="flex gap-2">
                  {(
                    [
                      { value: 'bug', label: 'Bug', icon: <Bug size={14} /> },
                      { value: 'feature', label: 'Feature', icon: <Sparkles size={14} /> },
                      { value: 'general', label: 'General', icon: <MessageCircle size={14} /> },
                    ] as { value: FeedbackType; label: string; icon: React.ReactElement }[]
                  ).map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setType(t.value)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-medium border rounded-xl transition-all ${
                        type === t.value
                          ? 'bg-foreground text-white border-foreground shadow-sm'
                          : 'border-border hover:bg-surface text-foreground-secondary'
                      }`}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="text-xs font-semibold text-foreground-tertiary uppercase tracking-wider block mb-2">
                  Rating
                </label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                        rating && star <= rating
                          ? 'bg-amber-50 scale-110'
                          : 'bg-surface hover:bg-border opacity-50 hover:opacity-80'
                      }`}
                    >
                      <span className="drop-shadow-sm">★</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-foreground-tertiary uppercase tracking-wider block mb-2">
                  Tell us more
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's on your mind?"
                  rows={3}
                  className="w-full border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-shadow"
                />
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-foreground text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
              >
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {submitting ? 'Sending...' : 'Send Feedback'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}
