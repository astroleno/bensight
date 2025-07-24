// Extract structured JSON from article content using AI
export interface ArticleSummary {
  title: string;
  author: string;
  summary: string;
  keyPoints: string[];
  tags: string[];
  publishDate: string;
  readingTime: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export async function extractWithGemini(content: string): Promise<ArticleSummary> {
  try {
    // For MVP, simulate AI response with basic text analysis
    // In production, this would call Gemini API
    
    const words = content.split(' ').length;
    const readingTime = Math.ceil(words / 200); // ~200 words per minute
    
    // Extract first sentence as summary (simplified)
    const sentences = content.split(/[.!?]+/);
    const summary = sentences[0]?.trim() || 'Article summary not available';
    
    // Extract potential key points (sentences containing keywords)
    const keywordPatterns = /(?:重要|关键|核心|主要|总结|结论|发现|建议|方法|策略)/;
    const keyPoints = sentences
      .filter(sentence => keywordPatterns.test(sentence))
      .slice(0, 5)
      .map(point => point.trim())
      .filter(point => point.length > 10);

    // Simple sentiment analysis based on keywords
    const positiveWords = /(?:好|优|棒|赞|成功|提升|增长|改善|优化|创新)/g;
    const negativeWords = /(?:差|坏|失败|下降|问题|困难|挑战|风险)/g;
    
    const positiveCount = (content.match(positiveWords) || []).length;
    const negativeCount = (content.match(negativeWords) || []).length;
    
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';

    return {
      title: 'Extracted Article Title',
      author: 'Unknown Author',
      summary,
      keyPoints: keyPoints.length > 0 ? keyPoints : ['Key insights from the article'],
      tags: ['微信公众号', '文章摘要'],
      publishDate: new Date().toISOString().split('T')[0],
      readingTime: `${readingTime} min read`,
      sentiment
    };
    
  } catch (error) {
    console.error('Error extracting with AI:', error);
    throw new Error('Failed to extract article structure');
  }
}