import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../translations/translations'
import { gradientText, knowledgeSections } from '../data/knowledgeBase'
import { getPublicBlogSections, getPublicTopics } from '../lib/publicApi'

export default function Homepage() {
  const { language, switchLanguage } = useLanguage()
  const t = (key) => getTranslation(language, key)
  const [sections, setSections] = useState(knowledgeSections[language])

  useEffect(() => {
    let isMounted = true

    const loadTopics = async () => {
      try {
        const blogSections = await getPublicBlogSections(language)

        if (!isMounted) {
          return
        }

        if (blogSections.length > 0) {
          setSections(blogSections)
          return
        }

        const backendSections = await getPublicTopics(language)

        if (!isMounted) {
          return
        }

        if (backendSections.length > 0) {
          setSections(backendSections)
          return
        }

        setSections(knowledgeSections[language])
      } catch {
        if (isMounted) {
          setSections(knowledgeSections[language])
        }
      }
    }

    loadTopics()

    return () => {
      isMounted = false
    }
  }, [language])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-[#b000ff] to-[#ff0f78] flex items-center justify-center text-white text-xl font-bold">
              KB
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">{t('knowledgeBase')}</p>
              <h1 className="text-xl sm:text-2xl font-semibold">{t('flashboardFacts')}</h1>
            </div>
          </div>
          <div className="w-full sm:w-auto flex justify-start sm:justify-end">
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 sm:px-10 py-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{t('knowledgeBase')}</p>
              <h2 className="text-3xl font-bold text-slate-900">{t('browseHelpTopics')}</h2>
              <p className="text-slate-600">{t('quickAnswers')}</p>
            </div>
            <div className="w-full sm:w-80">
              <label className="sr-only" htmlFor="kb-search">
                {t('searchPlaceholder')}
              </label>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 shadow-inner">
                <svg className="h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
                </svg>
                <input
                  id="kb-search"
                  type="search"
                  placeholder={t('searchPlaceholder')}
                  className="w-full bg-transparent outline-none text-sm placeholder:text-slate-400"
                />
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-[#b000ff] to-[#ff0f78] shadow">
                  {t('search')}
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: sectionIndex * 0.05, ease: 'easeOut' }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-5"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.slug} className="rounded-lg hover:bg-slate-50 transition">
                    <Link
                      className={`flex items-center gap-2 py-2 text-sm font-semibold ${gradientText}`}
                      to={`/blogs/${item.slug}`}
                      state={{ title: item.title, category: section.title }}
                    >
                      <span className="text-slate-300">•</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  )
}
