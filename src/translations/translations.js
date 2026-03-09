export const translations = {
  en: {
    // Header
    knowledgeBase: 'Knowledge Base',
    flashboardFacts: 'Flashboard FACTS',
    support: 'Support',
    docs: 'Docs',
    contact: 'Contact',
    back: 'Back',
    
    // Homepage
    browseHelpTopics: 'Browse help topics',
    quickAnswers: 'Quick answers and how-tos for every Flashboard experience.',
    searchPlaceholder: 'Search the knowledge base',
    search: 'Search',
    
    // Categories
    categories: {
      'ෆ්ලැෂ්බෝඩ් ගණන': 'Flashboard About',
      'ෆ්ලැෂ්බෝඩ් යෙදුපිළි': 'Flashboard Apps',
      'හෙළකුරෙන් සිංහල ටයිප්': 'Typing in Sinhala',
      'ෆ්ලැෂ්බෝඩ් කෙරෙන හොඳ සේවා': 'Flashboard Services',
      'ෆ්ලැෂ්බෝඩ් ගෙවීම් සේවා': 'Payment Services',
      'ෆ්ලැෂ්බෝඩ් සමාජ වෙබ්දා': 'Social Platform',
      'ෆ්ලැෂ්බෝඩ් නවීන සිහින': 'Innovation'
    },
    
    // BlogReader
    relatedTopics: 'Related topics',
    topic: 'Topic',
    general: 'General'
  },
  si: {
    // Header
    knowledgeBase: 'දැනුම් පදනම',
    flashboardFacts: 'ෆ්ලැෂ්බෝඩ් තොරතුරු',
    support: 'සහාය',
    docs: 'ලේඛන',
    contact: 'සම්බන්ධ වන්න',
    back: 'ආපසු',
    
    // Homepage
    browseHelpTopics: 'උපකාර මාතෘකා බලන්න',
    quickAnswers: 'ෆ්ලැෂ්බෝඩ් අත්දැකීම් සඳහා ඉක්මන් පිළිතුරු සහ උපදෙස්.',
    searchPlaceholder: 'දැනුම් පදනම සොයන්න',
    search: 'සොයන්න',
    
    // Categories
    categories: {
      'ෆ්ලැෂ්බෝඩ් ගණන': 'ෆ්ලැෂ්බෝඩ් ගණන',
      'ෆ්ලැෂ්බෝඩ් යෙදුපිළි': 'ෆ්ලැෂ්බෝඩ් යෙදුපිළි',
      'හෙළකුරෙන් සිංහල ටයිප්': 'හෙළකුරෙන් සිංහල ටයිප්',
      'ෆ්ලැෂ්බෝඩ් කෙරෙන හොඳ සේවා': 'ෆ්ලැෂ්බෝඩ් කෙරෙන හොඳ සේවා',
      'ෆ්ලැෂ්බෝඩ් ගෙවීම් සේවා': 'ෆ්ලැෂ්බෝඩ් ගෙවීම් සේවා',
      'ෆ්ලැෂ්බෝඩ් සමාජ වෙබ්දා': 'ෆ්ලැෂ්බෝඩ් සමාජ වෙබ්දා',
      'ෆ්ලැෂ්බෝඩ් නවීන සිහින': 'ෆ්ලැෂ්බෝඩ් නවීන සිහින'
    },
    
    // BlogReader
    relatedTopics: 'සම්බන්ධ මාතෘකා',
    topic: 'මාතෘකාව',
    general: 'සාමාන්‍ය'
  }
}

export const getTranslation = (language, key) => {
  const keys = key.split('.')
  let value = translations[language]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
