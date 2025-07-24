import { useMutation } from '@tanstack/react-query';
import { extractArticleContent } from '@/lib/readability';
import { extractWithGemini, ArticleSummary } from '@/lib/extract';
import { renderBentoHTML } from '@/lib/render';

interface GenerateParams {
  url: string;
}

interface GenerateResult {
  summary: ArticleSummary;
  htmlContent: string;
}

export function useGenerate() {
  return useMutation<GenerateResult, Error, GenerateParams>({
    mutationFn: async ({ url }) => {
      // Step 1: Validate URL
      if (!url.includes('mp.weixin.qq.com')) {
        throw new Error('请输入有效的微信公众号文章链接');
      }

      // Step 2: Extract article content using readability
      const content = await extractArticleContent(url);
      
      if (!content || content.length < 100) {
        throw new Error('无法提取文章内容，请检查链接是否有效');
      }

      // Step 3: Process content with AI to get structured JSON
      const summary = await extractWithGemini(content);

      // Step 4: Render to Bento HTML
      const htmlContent = renderBentoHTML(summary);

      return {
        summary,
        htmlContent
      };
    },
    onSuccess: (data) => {
      // Create blob and open in new tab
      const blob = new Blob([data.htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      try {
        const newWindow = window.open(url, '_blank');
        if (!newWindow) {
          // Fallback: download file if popup blocked
          const link = document.createElement('a');
          link.href = url;
          link.download = 'article-summary.html';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error('Error opening result:', error);
      } finally {
        // Clean up blob URL after a delay
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    }
  });
}