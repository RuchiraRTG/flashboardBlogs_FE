import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'

const fallbackBlogBody = `FlashBoard helps teams organize and share knowledge quickly.

This page is a clean blog-reading layout without a header or search area.

You can use this view to display full article content exactly as a reader page.`

const blogPosts = [
  {
    id: 1,
    title: 'A peaceful bedroom for better sleep',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 29, 2023',
    views: 1243
  },
  {
    id: 2,
    title: 'Mindful ways to find inner peace',
    category: 'Mindfulness',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 22, 2023',
    views: 2156
  },
  {
    id: 3,
    title: 'How to improve self-esteem',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 19, 2023',
    views: 987
  },
  {
    id: 4,
    title: 'A calming weekend reset',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80&sat=-35',
    date: 'Mar 12, 2023',
    views: 1734
  },
  {
    id: 5,
    title: 'Morning light and better focus',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1444044205806-38f3ed106c10?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 10, 2023',
    views: 3421
  },
  {
    id: 6,
    title: 'A soft start for busy teams',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    date: 'Mar 8, 2023',
    views: 2089
  }
]

const createSlug = (title) =>
  (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

const formatDate = (value) => {
  if (!value) return ''
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function BlogReader() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogs')
    if (storedBlogs) {
      try {
        setBlogs(JSON.parse(storedBlogs))
      } catch {
        setBlogs([])
      }
    }
  }, [])

  const blog = useMemo(() => {
    if (blogs.length > 0) {
      const matched = blogs.find((item) => createSlug(item.title) === slug)
      if (matched) return matched
    }

    const stateTitle = location.state?.title
    const stateCategory = location.state?.category

    if (stateTitle) {
      return {
        id: Date.now(),
        title: stateTitle,
        category: stateCategory || 'Getting Started',
        topic: 'General',
        date: new Date().toLocaleDateString(),
        content: fallbackBlogBody,
        image: null
      }
    }

    return {
      id: 0,
      title: 'Blog Not Found',
      category: 'General',
      topic: 'General',
      date: '',
      content: 'The selected blog could not be loaded.',
      image: null
    }
  }, [blogs, slug, location.state])

  const relatedBlogs = useMemo(() => {
    return blogPosts.filter(
      (post) => post.category === blog.category && createSlug(post.title) !== slug
    )
  }, [blog.category, slug])

  const heroImage =
    blog.image ||
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80'

  const displayDate = formatDate(blog.date)

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(blog.title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            ← Back
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-500 mb-4">
                Table of contents
              </h2>
              <div className="space-y-1">
                <div className="mb-4 pb-3 border-b border-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600 mb-2">
                    Category
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{blog.category}</p>
                </div>
                
                {relatedBlogs.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                      Related Topics
                    </p>
                    <ul className="space-y-2">
                      {relatedBlogs.map((relatedBlog) => (
                        <li key={relatedBlog.id}>
                          <Link
                            to={`/blogs/${createSlug(relatedBlog.title)}`}
                            state={{ title: relatedBlog.title, category: relatedBlog.category }}
                            className="block text-sm text-purple-600 hover:text-purple-700 hover:underline leading-snug transition"
                          >
                            {relatedBlog.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl">
              <div className="relative">
                <img
                  src={heroImage}
                  alt={blog.title}
                  className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[420px]"
                />
                <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Blog
                  </span>
                  {blog.category ? (
                    <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                      {blog.category}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="px-6 pb-12 pt-8 sm:px-10">
                <header className="border-b border-slate-200 pb-6">
                  <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                    {blog.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    {displayDate ? (
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                        {displayDate}
                      </span>
                    ) : null}
                    {blog.topic ? (
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                        {blog.topic}
                      </span>
                    ) : null}
                  </div>
                </header>

                <section className="prose prose-slate prose-lg mt-8 max-w-none">
                  {blog.content ? (
                    <div
                      className="[&_p]:mb-5"
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                  ) : (
                    <p className="text-base text-slate-600">No content available for this blog.</p>
                  )}
                </section>

                <div className="mt-10 flex items-center justify-end border-t border-slate-200 pt-8">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600">Share:</span>
                    <div className="flex gap-2">
                      <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-blue-400"
                        aria-label="Share on Twitter"
                      >
                        <svg
                          className="h-4 w-4 text-slate-600 transition group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>

                      <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-blue-600"
                        aria-label="Share on Facebook"
                      >
                        <svg
                          className="h-5 w-5 text-slate-600 transition group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </a>

                      <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-blue-700"
                        aria-label="Share on LinkedIn"
                      >
                        <svg
                          className="h-4 w-4 text-slate-600 transition group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>

                      <a
                        href={shareLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-green-500"
                        aria-label="Share on WhatsApp"
                      >
                        <svg
                          className="h-5 w-5 text-slate-600 transition group-hover:text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}
