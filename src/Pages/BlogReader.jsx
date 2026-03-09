import { useMemo } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../translations/translations'
import { gradientText, knowledgeSections, knowledgeArticles } from '../data/knowledgeBase'

const fallbackBody = {
  si: `
    <p>මෙම කරුණු පිටුව දැනට සම්පූර්ණ කර නැත. ඔබ තෝරාගත් මාතෘකාවට අදාල අන්තර්ගතය ඉක්මනින් එකතු කෙරෙනු ඇත.</p>
    <p>මෙතෙක් ඔබට අපගේ ප්‍රධාන පිටුවෙන් වෙනත් මාතෘකා බලන්න.</p>
  `,
  en: `
    <p>This knowledge base page is not yet complete. Content related to your selected topic will be added soon.</p>
    <p>In the meantime, you can browse other topics from our main page.</p>
  `
}

export default function BlogReader() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { language, switchLanguage } = useLanguage()
  const t = (key) => getTranslation(language, key)
  const sections = knowledgeSections[language]

  const flatNav = useMemo(
    () =>
      sections.flatMap((section) =>
        section.items.map((item) => ({ ...item, category: section.title }))
      ),
    [sections]
  )

  const article = useMemo(() => {
    if (knowledgeArticles[slug]) {
      return knowledgeArticles[slug][language]
    }

    const matchedNav = flatNav.find((item) => item.slug === slug)
    const stateTitle = location.state?.title
    const title = matchedNav?.title || stateTitle || (language === 'si' ? 'පිටුව සොයාගත නොහැක' : 'Page Not Found')
    const category = matchedNav?.category || location.state?.category || t('knowledgeBase')

    return {
      title,
      category,
      topic: t('general'),
      image: null,
      body: fallbackBody[language]
    }
  }, [slug, flatNav, location.state, language, t])

  const related = useMemo(
    () => flatNav.filter((item) => item.category === article.category && item.slug !== slug),
    [article.category, slug, flatNav]
  )

  const activeImage =
    article.image ||
    'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1400&q=80'

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-lg bg-gradient-to-r from-[#b000ff] to-[#ff0f78] flex items-center justify-center text-white font-black">
              KB
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{t('knowledgeBase')}</p>
              <h1 className="text-lg sm:text-xl font-semibold">{t('flashboardFacts')}</h1>
            </div>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition"
            >
              ← {t('back')}
            </button>
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition ${
                  language === 'en'
                    ? 'bg-gradient-to-r from-[#b000ff] to-[#ff0f78] text-white shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => switchLanguage('si')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition ${
                  language === 'si'
                    ? 'bg-gradient-to-r from-[#b000ff] to-[#ff0f78] text-white shadow'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                සිංහල
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 h-max">
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-bold text-slate-900 mb-2">{section.title}</p>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = item.slug === slug
                    return (
                      <li key={item.slug}>
                        <Link
                          to={`/blogs/${item.slug}`}
                          state={{ title: item.title, category: section.title }}
                          className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold transition ${
                            isActive
                              ? `${gradientText} bg-slate-50`
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                          }`}
                        >
                          <span className={`text-xs ${isActive ? 'text-slate-300' : 'text-slate-300'}`}>•</span>
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <article className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
          <div className="px-6 sm:px-10 py-10 space-y-6">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{article.category}</p>
              <h2 className="text-3xl font-bold text-slate-900 leading-tight">{article.title}</h2>
              {article.topic ? (
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">
                    {article.topic}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/5 to-transparent" />
              <img src={activeImage} alt={article.title} className="w-full h-[320px] object-cover" />
            </div>

            <section className="prose prose-slate max-w-none text-base leading-relaxed">
              <div
                className="[&_h3]:mt-6 [&_h3]:text-xl [&_h3]:text-slate-900 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:text-slate-700"
                dangerouslySetInnerHTML={{ __html: article.body }}
              />
            </section>

            {related.length > 0 ? (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-semibold text-slate-600 mb-2">{t('relatedTopics')}</p>
                <div className="flex flex-wrap gap-2">
                  {related.slice(0, 6).map((item) => (
                    <Link
                      key={item.slug}
                      to={`/blogs/${item.slug}`}
                      state={{ title: item.title, category: item.category }}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 hover:border-slate-400 transition"
                    >
                      <span className="text-xs text-slate-300">•</span>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </main>
    </div>
  )
}
