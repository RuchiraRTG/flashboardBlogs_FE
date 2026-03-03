import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const fallbackBlogBody = `FlashBoard helps teams organize and share knowledge quickly.

This page is a clean blog-reading layout without a header or search area.

You can use this view to display full article content exactly as a reader page.`

const createSlug = (title) =>
  (title || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

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

  return (
    <div className="min-h-screen bg-[#f4f4f4] px-4 py-6 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-6xl rounded-sm bg-[#f1f1f1] p-8 sm:p-10 lg:p-12">
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
          >
            Back
          </button>
        </div>

        <article>
          <div className="mb-4 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
            {blog.category}
          </div>

          <h1 className="mb-4 text-3xl font-semibold text-gray-800 sm:text-4xl">
            {blog.title}
          </h1>

          <div className="mb-6 h-[2px] w-full bg-gradient-to-r from-purple-600 to-pink-500" />

          <div className="mb-8 flex flex-wrap items-center gap-3 rounded-md bg-white px-4 py-3 text-sm text-gray-600 shadow-sm">
            {blog.topic ? <span>• {blog.topic}</span> : null}
            {blog.date ? <span>• {blog.date}</span> : null}
          </div>

          <div 
            className="prose prose-lg max-w-none text-[1.1rem] leading-8 text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {blog.image ? (
            <div className="mt-10">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full max-w-4xl rounded object-cover"
              />
            </div>
          ) : null}
        </article>
      </div>
    </div>
  )
}
