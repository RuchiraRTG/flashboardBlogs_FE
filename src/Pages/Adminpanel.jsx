import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { useAdminAuth } from '../context/AdminAuthContext'
import {
  createBlog,
  createCategory,
  createTopic,
  deleteBlog,
  getBlogs,
  getCategories,
  getTopics,
  uploadAdminImage,
  updateBlog
} from '../lib/adminApi'
import { getEntityId } from '../lib/apiClient'

function normalizeBlog(blog) {
  if (!blog) {
    return null
  }

  return {
    ...blog,
    id: getEntityId(blog),
    title: blog.title || blog.en?.title || '',
    titleSi: blog.titleSi || blog.si?.title || '',
    content: blog.content || blog.en?.body || '',
    contentSi: blog.contentSi || blog.si?.body || '',
    category: blog.category || blog.en?.category || '',
    categorySi: blog.categorySi || blog.si?.category || '',
    topic: blog.topic || blog.en?.topic || '',
    topicSi: blog.topicSi || blog.si?.topic || '',
    date: blog.date || blog.createdAt || '',
    image: blog.image || blog.en?.image || null
  }
}

function normalizeCategory(category) {
  if (!category) {
    return null
  }

  return {
    ...category,
    id: getEntityId(category),
    en: category.en || category.name || category.title || category.nameEn || '',
    si: category.si || category.nameSi || ''
  }
}

function normalizeTopic(topic) {
  if (!topic) {
    return null
  }

  return {
    ...topic,
    id: getEntityId(topic),
    en: topic.en || topic.name || topic.title || topic.nameEn || '',
    si: topic.si || topic.nameSi || ''
  }
}

// Blog View Component
function BlogView({ blog, onBack }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Blog Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-6 px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-black mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-90">
            <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full">
              {blog.category}
            </span>
            <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full">
              📌 {blog.topic}
            </span>
            <span>📅 {blog.date}</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <article className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-8 whitespace-pre-wrap text-base md:text-lg">
            {blog.content}
          </div>
        </article>

        {/* Image Display */}
        {blog.image && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Featured Image</h3>
            <div className="rounded-lg overflow-hidden shadow-lg max-w-xl">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

// Dashboard Component
function Dashboard({ blogs, categories, onDeleteBlog, onEditBlog, onNavigateToCreate, onViewBlog }) {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Blogs</p>
              <p className="text-4xl font-bold text-gray-800 mt-2">{blogs.length}</p>
            </div>
            <div className="text-5xl opacity-20">📝</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Categories</p>
              <p className="text-4xl font-bold text-gray-800 mt-2">{categories.length}</p>
            </div>
            <div className="text-5xl opacity-20">📂</div>
          </div>
        </div>
      </div>

      {/* Create Blog Button */}
      <div className="flex justify-end">
        <button
          onClick={onNavigateToCreate}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
        >
          + Create New Blog
        </button>
      </div>

      {/* Blogs List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">All Blogs</h3>
        </div>
        <div className="overflow-x-auto">
          {blogs.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 text-lg">No blogs yet. Create your first one!</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Topic</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800 truncate">{blog.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{blog.topic}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">{blog.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onViewBlog(blog)}
                          className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded hover:bg-green-600 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onEditBlog(blog)}
                          className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded hover:bg-blue-600 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDeleteBlog(blog.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

const quillToolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  ['link', 'image'],
  ['clean']
]

const quillFormats = [
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'header',
  'list',
  'link', 'image'
]

// Create/Edit Blog Component
function CreateBlog({ categories, topics, onSaveBlog, onNavigateToDashboard, editingBlog, onAddTopic, onAddCategory, token }) {
  const initialForm = {
    title: '',
    titleSi: '',
    content: '',
    contentSi: '',
    category: '',
    categorySi: '',
    useNewCategory: false,
    newCategory: '',
    newCategorySi: '',
    topic: '',
    topicSi: '',
    newTopic: '',
    newTopicSi: '',
    useNewTopic: false
  }

  const [formData, setFormData] = useState(() =>
    editingBlog
      ? {
          ...initialForm,
          ...editingBlog,
          categorySi: editingBlog.categorySi || editingBlog.category || '',
          topicSi: editingBlog.topicSi || editingBlog.topic || ''
        }
      : initialForm
  )
  const [uploadingEditor, setUploadingEditor] = useState('')
  const englishEditorRef = useRef(null)
  const sinhalaEditorRef = useRef(null)
    const pendingImagesRef = useRef([])

    const registerPendingImage = (file) => {
      const tempUrl = URL.createObjectURL(file)
      pendingImagesRef.current.push({ tempUrl, file })
      return tempUrl
    }

    const revokePendingImageUrls = () => {
      pendingImagesRef.current.forEach(({ tempUrl }) => {
        URL.revokeObjectURL(tempUrl)
      })
    }

    useEffect(() => {
      return () => {
        revokePendingImageUrls()
      }
    }, [])

  const insertUploadedImage = async (file, editorRef, editorLabel) => {
    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }

    setUploadingEditor(editorLabel)

    try {
      const uploadedImage = await uploadAdminImage(file, token)
      const quill = editorRef.current?.getEditor()

      if (!quill) {
        throw new Error('Editor is not ready. Please try again.')
      }

        const tempUrl = registerPendingImage(file)

      const selection = quill.getSelection(true)
      const index = selection ? selection.index : quill.getLength()

        quill.insertEmbed(index, 'image', tempUrl, 'user')
      quill.setSelection(index + 1)
    } catch (error) {
      alert(error.message || 'Failed to upload image')
    } finally {
      setUploadingEditor('')
    }
  }

    const uploadPendingImagesInContent = async (content) => {
      let nextContent = content

      for (const { tempUrl, file } of pendingImagesRef.current) {
        if (!nextContent.includes(tempUrl)) {
          continue
        }

        const uploadedImage = await uploadAdminImage(file, token)
        nextContent = nextContent.split(tempUrl).join(uploadedImage.url)
      }

      return nextContent
    }

  const openImagePicker = (editorRef, editorLabel) => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')

    input.onchange = async () => {
      const selectedFile = input.files?.[0]
      await insertUploadedImage(selectedFile, editorRef, editorLabel)
    }

    input.click()
  }

  const quillModulesEn = {
    toolbar: {
      container: quillToolbar,
      handlers: {
        image: () => openImagePicker(englishEditorRef, 'English')
      }
    }
  }

  const quillModulesSi = {
    toolbar: {
      container: quillToolbar,
      handlers: {
        image: () => openImagePicker(sinhalaEditorRef, 'Sinhala')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleContentChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content: content
    }))
  }

  const handleContentChangeSi = (content) => {
    setFormData(prev => ({
      ...prev,
      contentSi: content
    }))
  }

  const handleSelectCategory = (e) => {
    const value = e.target.value
    const selected = categories.find((c) => c.en === value)
    setFormData((prev) => ({
      ...prev,
      category: value,
      categorySi: selected?.si || ''
    }))
  }

  const handleSelectTopic = (e) => {
    const value = e.target.value
    const selected = topics.find((t) => t.en === value)
    setFormData((prev) => ({
      ...prev,
      topic: value,
      topicSi: selected?.si || ''
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const categoryEn = formData.useNewCategory ? formData.newCategory.trim() : formData.category.trim()
    const categorySi = formData.useNewCategory
      ? (formData.newCategorySi.trim() || formData.newCategory.trim())
      : formData.categorySi.trim()
    const topicEn = formData.useNewTopic ? formData.newTopic.trim() : formData.topic.trim()
    const topicSi = formData.useNewTopic
      ? (formData.newTopicSi.trim() || formData.newTopic.trim())
      : formData.topicSi.trim()

    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.titleSi.trim() ||
      !formData.contentSi.trim() ||
      !categoryEn ||
      !categorySi
    ) {
      alert('Please fill in all required fields (both English and Sinhala)')
      return
    }

    if (!topicEn || !topicSi) {
      alert('Please select or create a topic (both English and Sinhala)')
      return
    }

    // Add new category if creating one
    if (formData.useNewCategory && formData.newCategory.trim()) {
      onAddCategory({
        en: formData.newCategory.trim(),
        si: formData.newCategorySi.trim() || formData.newCategory.trim()
      })
    }

    // Add new topic if creating one
    if (formData.useNewTopic && formData.newTopic.trim()) {
      onAddTopic({
        en: formData.newTopic.trim(),
        si: formData.newTopicSi.trim() || formData.newTopic.trim()
      })
    }

    const didSave = await onSaveBlog({
      id: editingBlog?.id || Date.now(),
      title: formData.title,
      titleSi: formData.titleSi,
      content: formData.content,
      contentSi: formData.contentSi,
      category: categoryEn,
      categorySi,
      topic: topicEn,
      topicSi,
      date: editingBlog?.date || new Date().toLocaleDateString()
    })

    if (didSave) {
      onNavigateToDashboard()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {editingBlog ? 'Edit Blog' : 'Create New Blog'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Sinhala Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Title (Sinhala) *
            </label>
            <input
              type="text"
              name="titleSi"
              value={formData.titleSi}
              onChange={handleInputChange}
              placeholder="සිංහල ශීර්ෂය ලියන්න"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Content - Rich Text Editor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Content * (with rich formatting, images, and subtopics)
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <ReactQuill
                ref={englishEditorRef}
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModulesEn}
                formats={quillFormats}
                placeholder="Write your blog content here. Use formatting tools to add subtopics, images, lists, etc."
              />
            </div>
            {uploadingEditor === 'English' ? (
              <p className="text-xs text-slate-500 mt-2">Uploading image to S3...</p>
            ) : null}
          </div>

          {/* Sinhala Content - Rich Text Editor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Content (Sinhala) *
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <ReactQuill
                ref={sinhalaEditorRef}
                theme="snow"
                value={formData.contentSi}
                onChange={handleContentChangeSi}
                modules={quillModulesSi}
                formats={quillFormats}
                placeholder="සිංහල අන්තර්ගතය මෙහි ලියන්න"
              />
            </div>
            {uploadingEditor === 'Sinhala' ? (
              <p className="text-xs text-slate-500 mt-2">Uploading image to S3...</p>
            ) : null}
          </div>

          {/* Category Selection with new category option */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Category *
            </label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="useNewCategory"
                name="useNewCategory"
                checked={formData.useNewCategory}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <label htmlFor="useNewCategory" className="text-sm text-gray-600 cursor-pointer">
                Create a new category
              </label>
            </div>

            {formData.useNewCategory ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="newCategory"
                  value={formData.newCategory}
                  onChange={handleInputChange}
                  placeholder="Enter new category name (English)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <input
                  type="text"
                  name="newCategorySi"
                  value={formData.newCategorySi}
                  onChange={handleInputChange}
                  placeholder="ප්‍රවර්ගයේ නම ඇතුළු කරන්න (සිංහල)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleSelectCategory}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.en} value={cat.en}>{cat.en} - {cat.si}</option>
                ))}
              </select>
            )}
          </div>

          {/* Topic Selection */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Topic *
              </label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="useNewTopic"
                  name="useNewTopic"
                  checked={formData.useNewTopic}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <label htmlFor="useNewTopic" className="text-sm text-gray-600 cursor-pointer">
                  Create a new topic
                </label>
              </div>

              {formData.useNewTopic ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="newTopic"
                    value={formData.newTopic}
                    onChange={handleInputChange}
                    placeholder="Enter new topic name (English)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="text"
                    name="newTopicSi"
                    value={formData.newTopicSi}
                    onChange={handleInputChange}
                    placeholder="මාතෘකාවේ නම ඇතුළු කරන්න (සිංහල)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  />
                </div>
              ) : (
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleSelectTopic}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="">Select a topic</option>
                  {topics.map(topic => (
                    <option key={topic.en} value={topic.en}>{topic.en} - {topic.si}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onNavigateToDashboard}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
            >
              {editingBlog ? 'Update Blog' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main Admin Panel Component
export default function Adminpanel() {
  const navigate = useNavigate()
  const { signOut, token } = useAdminAuth()
  const [currentView, setCurrentView] = useState('dashboard')
  const [viewingBlog, setViewingBlog] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [categories, setCategories] = useState([])
  const [topics, setTopics] = useState([])
  const [editingBlog, setEditingBlog] = useState(null)
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isMounted = true

    const loadAdminData = async () => {
      setIsLoadingData(true)
      setLoadError('')

      try {
        const [blogsData, categoriesData, topicsData] = await Promise.all([
          getBlogs(),
          getCategories(),
          getTopics()
        ])

        if (!isMounted) {
          return
        }

        setBlogs(blogsData.map(normalizeBlog).filter(Boolean))
        setCategories(categoriesData.map(normalizeCategory).filter(Boolean))
        setTopics(topicsData.map(normalizeTopic).filter(Boolean))
      } catch (error) {
        if (!isMounted) {
          return
        }

        setLoadError(error.message || 'Failed to load admin data')
      } finally {
        if (isMounted) {
          setIsLoadingData(false)
        }
      }
    }

    loadAdminData()

    return () => {
      isMounted = false
    }
  }, [])

  const handleDeleteBlog = async (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(id, token)
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => getEntityId(blog) !== id))
      } catch (error) {
        alert(error.message || 'Failed to delete blog')
      }
    }
  }

  const handleEditBlog = (blog) => {
    setEditingBlog(blog)
    setCurrentView('create')
  }

  const handleViewBlog = (blog) => {
    setViewingBlog(blog)
  }

  const handleSaveBlog = async (blogData) => {
    const payload = {
      title: blogData.title,
      titleSi: blogData.titleSi,
      content: blogData.content,
      contentSi: blogData.contentSi,
      category: blogData.category,
      categorySi: blogData.categorySi,
      topic: blogData.topic,
      topicSi: blogData.topicSi,
      date: blogData.date,
      image: blogData.image || null
    }

    try {
      if (editingBlog) {
        const blogId = getEntityId(editingBlog)
        const updatedBlog = await updateBlog(blogId, payload, token)

        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => (getEntityId(blog) === blogId ? normalizeBlog(updatedBlog || { ...blog, ...payload }) : blog))
        )

        setEditingBlog(null)
      } else {
        const createdBlog = await createBlog(payload, token)
        setBlogs((prevBlogs) => [...prevBlogs, normalizeBlog(createdBlog || payload)])
      }

      return true
    } catch (error) {
      alert(error.message || 'Failed to save blog')
      return false
    }
  }

  const handleAddTopic = async (newTopic) => {
    if (topics.find((t) => t.en === newTopic.en)) {
      return
    }

    try {
      const createdTopic = await createTopic(newTopic, token)
      setTopics((prevTopics) => [...prevTopics, normalizeTopic(createdTopic || newTopic)])
    } catch (error) {
      alert(error.message || 'Failed to create topic')
    }
  }

  const handleAddCategory = async (newCategory) => {
    if (categories.find((c) => c.en === newCategory.en)) {
      return
    }

    try {
      const createdCategory = await createCategory(newCategory, token)
      setCategories((prevCategories) => [...prevCategories, normalizeCategory(createdCategory || newCategory)])
    } catch (error) {
      alert(error.message || 'Failed to create category')
    }
  }

  const handleSignOut = () => {
    signOut()
    navigate('/admin/sign-in', { replace: true })
  }

  // If viewing a blog, show the blog view instead
  if (viewingBlog) {
    return (
      <BlogView
        blog={viewingBlog}
        onBack={() => {
          setViewingBlog(null)
          setCurrentView('dashboard')
        }}
      />
    )
  }

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center text-slate-700">
        Loading admin data...
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="max-w-lg w-full rounded-xl border border-red-200 bg-white p-6 text-center shadow-sm">
          <p className="text-red-600 font-semibold">Failed to load admin data</p>
          <p className="text-slate-600 text-sm mt-2">{loadError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-wide">Admin Panel</h1>
              <p className="text-sm opacity-90 mt-1">Manage your blogs and categories</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                ← Back to Site
              </a>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-slate-900/15 text-white font-semibold rounded-lg hover:bg-slate-900/30 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
                currentView === 'dashboard'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                setEditingBlog(null)
                setCurrentView('create')
              }}
              className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
                currentView === 'create'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              Create Blog
            </button>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6">
        {currentView === 'dashboard' ? (
          <Dashboard
            blogs={blogs}
            categories={categories}
            onDeleteBlog={(blogId) => handleDeleteBlog(blogId)}
            onEditBlog={handleEditBlog}
            onNavigateToCreate={() => setCurrentView('create')}
            onViewBlog={handleViewBlog}
          />
        ) : (
          <CreateBlog
            categories={categories}
            topics={topics}
            onSaveBlog={handleSaveBlog}
            onNavigateToDashboard={() => setCurrentView('dashboard')}
            editingBlog={editingBlog}
            onAddTopic={handleAddTopic}
            onAddCategory={handleAddCategory}
            token={token}
          />
        )}
      </main>
    </div>
  )
}
