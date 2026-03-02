import { useState } from 'react'

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const categories = [
    {
      id: 1,
      title: 'Getting Started',
      icon: '🚀',
      links: [
        { name: 'How to create your first flashboard', href: '#' },
        { name: 'Importing cards from other tools', href: '#' },
        { name: 'Migrating your legacy decks', href: '#' },
        { name: 'FlashBoard mobile quick tour', href: '#' },
        { name: 'Recommended starter templates', href: '#' }
      ]
    },
    {
      id: 2,
      title: 'Product Updates',
      icon: '💡',
      links: [
        { name: 'What changed in v5.4', href: '#' },
        { name: 'Changelog archive', href: '#' },
        { name: 'Beta channel roadmap', href: '#' },
        { name: 'Upcoming experiments', href: '#' },
        { name: 'How to opt into previews', href: '#' }
      ]
    },
    {
      id: 3,
      title: 'Authoring Tools',
      icon: '✍️',
      links: [
        { name: 'Designing adaptive cards', href: '#' },
        { name: 'Working with media blocks', href: '#' },
        { name: 'Collaboration best practices', href: '#' },
        { name: 'Publishing private decks', href: '#' },
        { name: 'Versioning and rollbacks', href: '#' }
      ]
    },
    {
      id: 4,
      title: 'Engagement',
      icon: '📈',
      links: [
        { name: 'Building spaced-repetition flows', href: '#' },
        { name: 'Analytics and reporting 101', href: '#' },
        { name: 'Integrating with Slack reminders', href: '#' },
        { name: 'Running community challenges', href: '#' },
        { name: 'Automating follow-up nudges', href: '#' }
      ]
    },
    {
      id: 5,
      title: 'Integrations',
      icon: '🔌',
      links: [
        { name: 'Connecting to Notion', href: '#' },
        { name: 'Embedding in LMS platforms', href: '#' },
        { name: 'Webhook recipes', href: '#' },
        { name: 'Single sign-on setup', href: '#' },
        { name: 'API playground overview', href: '#' }
      ]
    },
    {
      id: 6,
      title: 'Success Stories',
      icon: '🌟',
      links: [
        { name: 'How startups onboard with FlashBoard', href: '#' },
        { name: 'University programs using cards', href: '#' },
        { name: 'Knowledge teams we love', href: '#' },
        { name: 'Monthly community showcase', href: '#' }
      ]
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // TODO: hook up actual search functionality
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-black tracking-wide">FACTS</h1>
              <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.35em] opacity-90">Knowledge Base</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="px-4 sm:px-2 -mt-4 z-5">
        <div className="w-full max-w-3xl mx-auto bg-transparent rounded-2xl shadow-xl p-4 sm:p-5">
          <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row sm:gap-3">
            <input
              type="text"
              placeholder="Search the knowledge base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition-all text-base"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:red active:scale-95 transition-all shadow-sm hover:shadow-lg min-h-[44px]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories Grid */}
      <main className="flex-1 w-full pt-8 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center gap-3 px-4 py-4 sm:px-5 sm:py-5 bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-purple-600">
                  <span className="text-2xl flex-shrink-0">{category.icon}</span>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 m-0">{category.title}</h2>
                </div>
                <ul className="list-none p-0 m-0 divide-y divide-gray-100">
                  {category.links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="block px-4 py-3 sm:px-5 sm:py-3.5 text-purple-600 hover:bg-purple-50 hover:pl-6 active:bg-purple-50 active:pl-5 transition-all duration-200 text-[0.95rem] sm:text-base break-words min-h-[44px] flex items-center gap-2"
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-purple-500" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center px-4 py-6">
        <p className="m-0 opacity-80 text-sm">&copy; 2024 FlashBoard Knowledge Base. All rights reserved.</p>
      </footer>
    </div>
  )
}
