// Extract clean article content using Readability-like algorithm
export async function extractArticleContent(url: string): Promise<string> {
  try {
    // Use CORS proxy to fetch content
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const data = await response.json();
    const html = data.contents;

    // Create a DOM parser to extract content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Find the main content area (WeChat article structure)
    const contentSelectors = [
      '#js_content',
      '.rich_media_content', 
      '.article-content',
      'article',
      '[class*="content"]'
    ];

    let content = '';
    for (const selector of contentSelectors) {
      const element = doc.querySelector(selector);
      if (element) {
        content = element.textContent || '';
        break;
      }
    }

    // Fallback: extract from body if no specific content area found
    if (!content.trim()) {
      content = doc.body?.textContent || '';
    }

    // Clean up the content
    return content
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();
      
  } catch (error) {
    console.error('Error extracting article content:', error);
    throw new Error('Failed to extract article content');
  }
}