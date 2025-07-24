import { ArticleSummary } from './extract';

// Render structured JSON to Bento-style HTML
export function renderBentoHTML(summary: ArticleSummary): string {
  const sentimentColor = {
    positive: '#10b981', // green
    negative: '#ef4444', // red
    neutral: '#6b7280'   // gray
  }[summary.sentiment];

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${summary.title} - 格致摘要</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body { 
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .bento-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
        }
        
        .bento-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body class="min-h-screen p-4 md:p-8">
    <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-4xl md:text-6xl font-bold gradient-text mb-4">
                格致 BenSight
            </h1>
            <p class="text-white/80 text-lg">
                Intelligent Article Summary
            </p>
        </div>

        <!-- Bento Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[200px]">
            
            <!-- Title Card -->
            <div class="bento-card rounded-2xl p-6 md:col-span-3 lg:col-span-4 row-span-1">
                <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    ${summary.title}
                </h2>
                <p class="text-gray-600 text-sm">
                    By ${summary.author} • ${summary.publishDate}
                </p>
            </div>

            <!-- Reading Info -->
            <div class="bento-card rounded-2xl p-6 md:col-span-1 lg:col-span-2 row-span-1 text-center">
                <div class="text-3xl font-bold text-gray-800 mb-2">
                    ${summary.readingTime}
                </div>
                <p class="text-gray-600 text-sm">Reading Time</p>
                <div class="mt-4">
                    <div class="w-4 h-4 rounded-full mx-auto" 
                         style="background-color: ${sentimentColor}"></div>
                    <p class="text-xs text-gray-500 mt-1 capitalize">${summary.sentiment}</p>
                </div>
            </div>

            <!-- Summary Card -->
            <div class="bento-card rounded-2xl p-6 md:col-span-4 lg:col-span-3 row-span-2">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">摘要</h3>
                <p class="text-gray-700 leading-relaxed">
                    ${summary.summary}
                </p>
            </div>

            <!-- Key Points -->
            <div class="bento-card rounded-2xl p-6 md:col-span-4 lg:col-span-3 row-span-2">
                <h3 class="text-xl font-semibold text-gray-800 mb-4">核心要点</h3>
                <ul class="space-y-3">
                    ${summary.keyPoints.map((point, index) => `
                        <li class="flex items-start">
                            <span class="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center mr-3 mt-0.5">
                                ${index + 1}
                            </span>
                            <span class="text-gray-700 text-sm leading-relaxed">
                                ${point}
                            </span>
                        </li>
                    `).join('')}
                </ul>
            </div>

            <!-- Tags -->
            <div class="bento-card rounded-2xl p-6 md:col-span-2 lg:col-span-6 row-span-1">
                <h3 class="text-lg font-semibold text-gray-800 mb-3">标签</h3>
                <div class="flex flex-wrap gap-2">
                    ${summary.tags.map(tag => `
                        <span class="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-12 text-white/60">
            <p class="text-sm">
                Generated by 格致 BenSight • 
                <span class="text-white/80">${new Date().toLocaleString('zh-CN')}</span>
            </p>
        </div>
    </div>
</body>
</html>`;
}