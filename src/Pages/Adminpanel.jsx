import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

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

// Rich Text Editor Modules
const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
}

const quillFormats = [
  'bold', 'italic', 'underline', 'strike',
  'blockquote', 'code-block',
  'header',
  'list',
  'link', 'image'
]

// Create/Edit Blog Component
function CreateBlog({ categories, topics, onSaveBlog, onNavigateToDashboard, editingBlog, onAddTopic }) {
  const [formData, setFormData] = useState(
    editingBlog || {
      title: '',
      content: '',
      category: '',
      topic: '',
      newTopic: '',
      useNewTopic: false,
      image: null,
      imagePreview: null
    }
  )

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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result,
          imagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.category) {
      alert('Please fill in all required fields')
      return
    }

    const topicToUse = formData.useNewTopic ? formData.newTopic : formData.topic
    if (!topicToUse) {
      alert('Please select or create a topic')
      return
    }

    // Add new topic if creating one
    if (formData.useNewTopic && formData.newTopic.trim()) {
      onAddTopic(formData.newTopic.trim())
    }

    onSaveBlog({
      id: editingBlog?.id || Date.now(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      topic: topicToUse,
      date: editingBlog?.date || new Date().toLocaleDateString(),
      image: formData.image
    })

    onNavigateToDashboard()
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

          {/* Content - Rich Text Editor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Blog Content * (with rich formatting, images, and subtopics)
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your blog content here. Use formatting tools to add subtopics, images, lists, etc."
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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
                <input
                  type="text"
                  name="newTopic"
                  value={formData.newTopic}
                  onChange={handleInputChange}
                  placeholder="Enter new topic name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              ) : (
                <select
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="">Select a topic</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Featured Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            {formData.imagePreview && (
              <div className="mt-4 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev,
                      image: null,
                      imagePreview: null
                    }))
                  }
                  className="w-full mt-2 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Remove Image
                </button>
              </div>
            )}
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
  const [currentView, setCurrentView] = useState('dashboard')
  const [viewingBlog, setViewingBlog] = useState(null)
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Getting Started with FlashBoard',
      content: 'Learn the basics of FlashBoard in this comprehensive guide...',
      category: 'Getting Started',
      topic: 'Basics',
      date: '2024-01-15',
      image: null
    }
  ])
  const [categories, setCategories] = useState([
    'Getting Started',
    'Product Updates',
    'Authoring Tools',
    'Engagement',
    'Integrations',
    'Success Stories'
  ])
  const [topics, setTopics] = useState([
    'Basics',
    'Advanced',
    'Tips & Tricks',
    'Tutorials'
  ])
  const [editingBlog, setEditingBlog] = useState(null)

  const handleDeleteBlog = (id) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const handleEditBlog = (blog) => {
    setEditingBlog(blog)
    setCurrentView('create')
  }

  const handleViewBlog = (blog) => {
    setViewingBlog(blog)
  }

  const handleSaveBlog = (blogData) => {
    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog =>
        blog.id === blogData.id ? blogData : blog
      ))
      setEditingBlog(null)
    } else {
      // Add new blog
      setBlogs([...blogs, blogData])
    }
  }

  const handleAddTopic = (newTopic) => {
    if (!topics.includes(newTopic)) {
      setTopics([...topics, newTopic])
    }
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
            <a
              href="/"
              className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              ← Back to Site
            </a>
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
            onDeleteBlog={handleDeleteBlog}
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
          />
        )}
      </main>
    </div>
  )
}
