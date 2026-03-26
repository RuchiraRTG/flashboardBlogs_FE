import { apiRequest, extractCollection, extractEntity, getEntityId } from './apiClient'

function pickLocalizedValue(value, language, fallbackKeys = []) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'object') {
    if (value[language]) {
      return value[language]
    }

    for (const key of fallbackKeys) {
      if (value[key]) {
        return value[key]
      }
    }
  }

  return ''
}

function normalizeTopicTitle(topic, language) {
  return (
    pickLocalizedValue(topic.name, language, ['en', 'si']) ||
    pickLocalizedValue(topic.title, language, ['en', 'si']) ||
    (language === 'si' ? topic.si : topic.en) ||
    topic.name ||
    topic.title ||
    'Topic'
  )
}

function normalizeTopicItems(topic, language) {
  const rawItems = topic.items || topic.articles || topic.articleItems || []

  return rawItems
    .map((item) => {
      const title =
        pickLocalizedValue(item.title, language, ['en', 'si']) ||
        item.title ||
        item[language]?.title ||
        item.en?.title ||
        item.si?.title ||
        ''

      const slug = item.slug || item.articleSlug || item.id || item._id

      if (!title || !slug) {
        return null
      }

      return { title, slug }
    })
    .filter(Boolean)
}

export async function getPublicTopics(language) {
  const response = await apiRequest(`/topics?lang=${language}`, { method: 'GET' })
  const topics = extractCollection(response)

  return topics
    .map((topic) => ({
      id: getEntityId(topic),
      title: normalizeTopicTitle(topic, language),
      items: normalizeTopicItems(topic, language)
    }))
    .filter((topic) => topic.items.length > 0)
}

export async function getPublicArticle(slug, language) {
  try {
    const response = await apiRequest(`/articles/${slug}?lang=${language}`, { method: 'GET' })
    const article = extractEntity(response)

    if (!article) {
      return null
    }

    const localized = article[language] || article

    return {
      id: getEntityId(article),
      slug: article.slug || slug,
      title: localized.title || article.title || '',
      category: localized.category || article.category || '',
      topic: localized.topic || article.topic || '',
      image: localized.image || article.image || null,
      body: localized.body || article.body || ''
    }
  } catch (error) {
    if (error?.status === 404) {
      return null
    }

    throw error
  }
}

function normalizeBlogEntity(blog, language) {
  if (!blog) {
    return null
  }

  return {
    id: getEntityId(blog),
    slug: blog.slug || String(getEntityId(blog) || ''),
    title: language === 'si' ? blog.titleSi || blog.title || '' : blog.title || blog.titleSi || '',
    category: language === 'si' ? blog.categorySi || blog.category || '' : blog.category || blog.categorySi || '',
    topic: language === 'si' ? blog.topicSi || blog.topic || '' : blog.topic || blog.topicSi || '',
    image: blog.image || null,
    body: language === 'si' ? blog.contentSi || blog.content || '' : blog.content || blog.contentSi || '',
    date: blog.date || blog.createdAt || ''
  }
}

export async function getPublicBlogs(language) {
  const response = await apiRequest('/blogs', { method: 'GET' })
  const blogs = extractCollection(response)

  return blogs
    .map((blog) => normalizeBlogEntity(blog, language))
    .filter((blog) => blog && blog.slug && blog.title)
}

export async function getPublicBlogByIdentifier(identifier, language) {
  try {
    const response = await apiRequest(`/blogs/${identifier}`, { method: 'GET' })
    const blog = extractEntity(response)
    return normalizeBlogEntity(blog, language)
  } catch (error) {
    if (error?.status === 404) {
      return null
    }

    throw error
  }
}

export async function getPublicBlogSections(language) {
  const blogs = await getPublicBlogs(language)
  const groupedMap = new Map()

  blogs.forEach((blog) => {
    const sectionTitle = blog.category || (language === 'si' ? 'වෙනත්' : 'Other')

    if (!groupedMap.has(sectionTitle)) {
      groupedMap.set(sectionTitle, [])
    }

    groupedMap.get(sectionTitle).push({
      slug: blog.slug,
      title: blog.title
    })
  })

  return Array.from(groupedMap.entries()).map(([title, items]) => ({
    title,
    items
  }))
}
