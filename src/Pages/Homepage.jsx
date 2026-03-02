import { useState } from 'react'
import './Homepage.css'

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const categories = [
    {
      id: 1,
      title: 'පෙලhumpholder ගිය',
      icon: '📱',
      links: [
        { name: 'පෙලhumpholder ගිය', href: '#' },
        { name: 'පෙලැස්ස අපිරුවන', href: '#' },
        { name: 'පෙලැස්ස ඉටිනාතන', href: '#' },
        { name: 'පෙලHOLDERS නේවා (ஆங්கිල)',href: '#' },
        { name: 'პეលhumpholder PRO Stars', href: '#' }
      ]
    },
    {
      id: 2,
      title: 'පෙลhumpholder තෙරුවල සේවා',
      icon: '💻',
      links: [
        { name: 'Android සදහා පෙලhumpholder', href: '#' },
        { name: 'iOS සදහා පෙලhumpholder', href: '#' },
        { name: 'Windows සදහා පෙලhumpholder', href: '#' },
        { name: 'MacOS සදහා පෙලhumpholder', href: '#' },
        { name: 'Linux සදහා පෙលhumpholder', href: '#' },
        { name: 'පෙලhumpholder Online සදහටුවුරුවුු', href: '#' }
      ]
    },
    {
      id: 3,
      title: 'පෙលhumpholder තෙමිතුර සේවා',
      icon: '🎓',
      links: [
        { name: 'පෙලPay - බිටිනු සේවිතු සුසුයුකුල', href: '#' },
        { name: 'පෙලPay Chat - බිටිනු ගුණිම', href: '#' },
        { name: 'පෙලිරිනි - ස්තිතුතන සේවිතු', href: '#' },
        { name: 'බිටි සේවිතු - පෙල අතුතුතු සේවිතු', href: '#' },
        { name: 'බිටි සේවිතු - සුසුයුකුටුල බිටි',href: '#' }
      ]
    },
    {
      id: 4,
      title: 'පෙලhumpholder සිහුරු පිටුන',
      icon: '⚡',
      links: [
        { name: 'ඩුඩුප්පුත සුසුයුනුනු පිටුන', href: '#' },
        { name: 'බිටිපිරිසුනු - සුසුයුනුනු පිටුන', href: '#' },
        { name: 'Voice Typing සිහුරු පිටුන', href: '#' },
        { name: 'Word Predictions සිහුරු පිටුන', href: '#' },
        { name: 'Clipboard සිහුරු පිටුන', href: '#' }
      ]
    },
    {
      id: 5,
      title: 'පෙලhumpholder සුනාත සිටුවුල',
      icon: '⚙️',
      links: [
        { name: 'බිිටුල - සුසුයු පිටිතුනු සිටුවුල', href: '#' },
        { name: 'පිනුනු සුවිටුු - සුසුයු බිටුසු සිටුවුල', href: '#' },
        { name: 'පෙලAds - ස්තුනි ස්තුතිතු சிடුවුල', href: '#' }
      ]
    },
    {
      id: 6,
      title: 'පෙලhumpholder සිතිතිතුතුතු',
      icon: '📚',
      links: [
        { name: 'සුසුයුතුතු සිතුතුතු innan පිටුන', href: '#' },
        { name: 'බිිටුල සිටුවුතු සිතුතුතු සunidos පිටුන', href: '#' }
      ]
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Add search functionality here
  }

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-circles">
              <span className="circle red"></span>
              <span className="circle orange"></span>
              <span className="circle yellow"></span>
              <span className="circle green"></span>
            </div>
            <div className="logo-text">
              <h1>FACTS</h1>
              <p>Knowledge Base</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <section className="search-section">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search the knowledge base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories Grid */}
      <main className="main-content">
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2 className="category-title">{category.title}</h2>
              </div>
              <ul className="category-links">
                {category.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 FlashBoard Knowledge Base. All rights reserved.</p>
      </footer>
    </div>
  )
}
