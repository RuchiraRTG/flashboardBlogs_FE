import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: 'A peaceful bedroom for better sleep',
    category: 'Wellness',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Design a calming sleep sanctuary and wind down routines that help you reset after demanding days.',
    author: 'James',
    date: 'Mar 29, 2023',
    views: 1243
  },
  {
    id: 2,
    title: 'Mindful ways to find inner peace',
    category: 'Mindfulness',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Micro-practices you can do between meetings to slow your pace, notice your breath, and reset focus.',
    author: 'SavyMarketer',
    date: 'Mar 22, 2023',
    views: 2156
  },
  {
    id: 3,
    title: 'How to improve self-esteem',
    category: 'Wellness',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Simple reframes and daily prompts to build confidence without the toxic positivity.',
    author: 'Lia',
    date: 'Mar 19, 2023',
    views: 987
  },
  {
    id: 4,
    title: 'A calming weekend reset',
    category: 'Lifestyle',
    image:
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80&sat=-35',
    excerpt:
      'A weekend ritual you can copy: slow mornings, light stretches, and mindful lighting to lift mood.',
    author: 'James',
    date: 'Mar 12, 2023',
    views: 1734
  },
  {
    id: 5,
    title: 'Morning light and better focus',
    category: 'Productivity',
    image:
      'https://images.unsplash.com/photo-1444044205806-38f3ed106c10?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'How to tune your space with natural light, smart lamps, and soundscapes for deep work.',
    author: 'Alex',
    date: 'Mar 10, 2023',
    views: 3421
  },
  {
    id: 6,
    title: 'A soft start for busy teams',
    category: 'Lifestyle',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    excerpt:
      'Group rituals that keep teams grounded: walks, daylight breaks, and light shared check-ins.',
    author: 'Sofia',
    date: 'Mar 8, 2023',
    views: 2089
  }
]

export default function Homepage() {
  const categories = useMemo(
    () => ['All', ...new Set(blogPosts.map((post) => post.category))],
    []
  )
  const [selectedCategory, setSelectedCategory] = useState('All')

  const createSlug = (title) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')

  const filteredPosts = useMemo(
    () =>
      selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter((post) => post.category === selectedCategory),
    [selectedCategory]
  )

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] h-80 w-80 bg-purple-500/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] h-72 w-72 bg-orange-400/30 blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl space-y-6 text-white"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-purple-200">Flashboard Blogs</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
              Stories for calm, focus, and better days.
            </h1>
            <p className="text-lg text-white/80">
              Curated stories for calmer work, softer spaces, and focused minds—handpicked each week.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/30 text-white font-semibold hover:border-white hover:bg-white/10 transition"
              >
                Browse collection
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <main id="categories" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Journal</p>
            <h2 className="text-3xl font-bold text-slate-900">Browse by category</h2>
            <p className="text-slate-600 max-w-2xl">
              Pick a mood or a focus. We surface stories that match the energy you want to keep today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700" htmlFor="category-select">
              Category
            </label>
            <div className="relative">
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none rounded-full border border-slate-200 bg-white px-4 py-2.5 pr-10 text-sm font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.05 }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden flex flex-col transition"
            >
              <div className="flex-1 flex flex-col">
                <div className="overflow-hidden bg-slate-100">
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    src={post.image}
                    alt={post.title}
                    className="h-56 w-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">{post.category}</span>
                  <h3 className="text-xl font-semibold text-slate-900 leading-snug">{post.title}</h3>
                  <div className="mt-auto pt-2 space-y-2">
                    <p className="text-sm text-slate-500">Posted {post.date}</p>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-purple-600 transition cursor-pointer">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{post.views.toLocaleString()} views</span>
                      </div>
                      <Link
                        to={`/blogs/${createSlug(post.title)}`}
                        state={{ title: post.title, category: post.category }}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-slate-900 text-white shadow-sm hover:bg-purple-600 transition"
                      >
                        Read post
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  )
}
