# 格致 BenSight 技术栈详细说明

## 📋 技术栈概览

本项目采用现代化的前端技术栈，专注于性能、开发体验和用户体验的平衡。

## 🏗️ 核心架构

### 前端框架层
```
React 18 + TypeScript + Vite
├── 组件化开发
├── 类型安全
└── 快速构建
```

### UI 设计层
```
TailwindCSS + shadcn/ui + Lucide React
├── 原子化 CSS
├── 组件库
└── 图标系统
```

### 状态管理层
```
TanStack Query + React Hook Form + Zod
├── 服务端状态
├── 表单状态
└── 数据验证
```

### 主题系统
```
next-themes
├── 深色模式
├── 浅色模式
└── 系统跟随
```

## 🔧 技术选型详解

### 1. React 18 + TypeScript
**选择理由**：
- React 18 的并发特性提升用户体验
- TypeScript 提供类型安全，减少运行时错误
- 丰富的生态系统和社区支持

**核心特性**：
- Concurrent Rendering：提升大量数据渲染性能
- Automatic Batching：优化状态更新性能
- Suspense：优雅处理异步加载状态

**项目中的应用**：
```typescript
// 使用 Suspense 处理异步组件加载
<Suspense fallback={<LoadingSkeleton />}>
  <BentoPreview />
</Suspense>

// 使用 TypeScript 接口定义数据结构
interface ArticleSummary {
  title: string;
  keyPoints: string[];
  summary: string;
  metadata: ArticleMetadata;
}
```

### 2. Vite 构建工具
**选择理由**：
- 极快的开发服务器启动速度
- 基于 ESM 的热更新
- 优化的生产构建

**性能优势**：
- 开发服务器启动：< 1 秒
- 热更新响应：< 100ms
- 生产构建：Tree-shaking + 代码分割

**配置示例**：
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-toast']
        }
      }
    }
  }
});
```

### 3. TailwindCSS + shadcn/ui
**选择理由**：
- 原子化 CSS，高度可定制
- shadcn/ui 提供高质量组件
- 优秀的深色模式支持

**设计系统**：
```css
/* 主题色彩系统 */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

**组件示例**：
```tsx
// Bento 卡片组件
<Card className="group hover:shadow-lg transition-all duration-300">
  <CardHeader>
    <CardTitle className="text-lg font-semibold">
      {summary.title}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid gap-4">
      {summary.keyPoints.map((point, index) => (
        <div key={index} className="flex items-start gap-2">
          <Badge variant="outline">{index + 1}</Badge>
          <p className="text-sm text-muted-foreground">{point}</p>
        </div>
      ))}
    </div>
  </CardContent>
</Card>
```

### 4. TanStack Query (React Query)
**选择理由**：
- 强大的服务端状态管理
- 内置缓存、重试、背景更新
- 优秀的开发者体验

**核心功能**：
- 数据获取和缓存
- 乐观更新
- 错误处理和重试
- 背景同步

**使用示例**：
```typescript
// 自定义 Hook 处理文章摘要生成
export const useGenerateSummary = () => {
  return useMutation({
    mutationFn: async (url: string) => {
      // 1. 抓取文章内容
      const content = await fetchArticleContent(url);
      
      // 2. 生成 AI 摘要
      const summary = await generateAISummary(content);
      
      // 3. 渲染 Bento HTML
      const html = await renderBentoHTML(summary);
      
      return { summary, html };
    },
    onSuccess: (data) => {
      // 成功后的处理逻辑
      toast.success('摘要生成成功！');
    },
    onError: (error) => {
      // 错误处理
      toast.error(`生成失败: ${error.message}`);
    },
    retry: 1,
    retryDelay: 1000,
  });
};
```

### 5. React Hook Form + Zod
**选择理由**：
- 高性能的表单处理
- 强大的验证能力
- TypeScript 友好

**表单验证**：
```typescript
// 使用 Zod 定义验证模式
const urlSchema = z.object({
  url: z
    .string()
    .url('请输入有效的 URL')
    .refine(
      (url) => url.includes('mp.weixin.qq.com'),
      '仅支持微信公众号文章链接'
    ),
});

type UrlFormData = z.infer<typeof urlSchema>;

// 在组件中使用
const form = useForm<UrlFormData>({
  resolver: zodResolver(urlSchema),
  defaultValues: { url: '' },
});
```

### 6. next-themes 主题系统
**选择理由**：
- 零闪烁主题切换
- 系统主题自动检测
- SSR 友好

**主题配置**：
```tsx
// App.tsx 中的主题提供者
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
  {children}
</ThemeProvider>

// 主题切换组件
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};
```

## 🔌 外部服务集成

### 1. Gemini 1.5 Flash API
**用途**：AI 驱动的文章摘要生成

**集成方式**：
```typescript
// AI 摘要生成服务
class GeminiService {
  private apiKey: string;
  private baseURL = 'https://generativelanguage.googleapis.com/v1beta';

  async generateSummary(content: string): Promise<ArticleSummary> {
    const response = await fetch(`${this.baseURL}/models/gemini-1.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: this.buildPrompt(content)
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
        }
      }),
    });

    return this.parseResponse(await response.json());
  }

  private buildPrompt(content: string): string {
    return `
请将以下文章内容转换为结构化摘要，以 JSON 格式返回：

文章内容：
${content}

返回格式：
{
  "title": "文章标题",
  "keyPoints": ["关键点1", "关键点2", "关键点3"],
  "summary": "整体总结",
  "tags": ["标签1", "标签2"],
  "readingTime": "预估阅读时间（分钟）"
}
    `;
  }
}
```

### 2. CORS 代理服务
**用途**：解决跨域文章抓取问题

**实现方案**：
```typescript
// CORS 代理配置
const CORS_PROXIES = [
  'https://cors.isomorphic-git.org/',
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
];

// 带重试的文章抓取
async function fetchWithProxy(url: string): Promise<string> {
  for (const proxy of CORS_PROXIES) {
    try {
      const response = await fetch(`${proxy}${encodeURIComponent(url)}`, {
        timeout: 10000,
      });
      
      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.warn(`代理 ${proxy} 失败:`, error);
      continue;
    }
  }
  
  throw new Error('所有代理都无法访问该文章');
}
```

## 📦 构建和部署

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 生产构建
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 分析构建产物
npm run analyze
```

### 部署配置

#### Netlify 部署
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel 部署
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 🔍 性能优化

### 1. 代码分割
```typescript
// 路由级别的代码分割
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

// 组件级别的代码分割
const BentoPreview = lazy(() => import('./components/BentoPreview'));
```

### 2. 资源优化
```typescript
// 图片懒加载
<img 
  src={imageSrc} 
  loading="lazy" 
  decoding="async"
  alt={imageAlt}
/>

// 字体优化
<link 
  rel="preload" 
  href="/fonts/inter.woff2" 
  as="font" 
  type="font/woff2" 
  crossOrigin="anonymous"
/>
```

### 3. 缓存策略
```typescript
// Service Worker 缓存
const CACHE_NAME = 'bensight-v1';
const STATIC_ASSETS = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
});
```

## 🧪 测试策略

### 单元测试
```typescript
// 使用 Vitest + Testing Library
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoCard } from './BentoCard';

describe('BentoCard', () => {
  it('renders summary content correctly', () => {
    const mockSummary = {
      title: '测试标题',
      keyPoints: ['要点1', '要点2'],
      summary: '测试摘要',
    };

    render(<BentoCard summary={mockSummary} />);
    
    expect(screen.getByText('测试标题')).toBeInTheDocument();
    expect(screen.getByText('要点1')).toBeInTheDocument();
  });
});
```

### 集成测试
```typescript
// E2E 测试使用 Playwright
import { test, expect } from '@playwright/test';

test('complete article summary generation flow', async ({ page }) => {
  await page.goto('/');
  
  // 输入文章链接
  await page.fill('[data-testid="url-input"]', 'https://mp.weixin.qq.com/s/example');
  
  // 点击生成按钮
  await page.click('[data-testid="generate-button"]');
  
  // 等待摘要生成完成
  await expect(page.locator('[data-testid="bento-preview"]')).toBeVisible();
  
  // 验证摘要内容
  await expect(page.locator('[data-testid="summary-title"]')).toContainText('');
});
```

## 📊 监控和分析

### 性能监控
```typescript
// Web Vitals 监控
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // 发送到分析服务
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 错误监控
```typescript
// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // 发送错误报告到监控服务
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // 发送错误报告到监控服务
});
```

## 🔮 未来规划

### 技术债务
- [ ] 迁移到 React Server Components
- [ ] 实现 Progressive Web App
- [ ] 添加 WebAssembly 优化

### 新功能支持
- [ ] 批量处理能力
- [ ] 离线模式支持
- [ ] 多语言国际化

### 性能优化
- [ ] 实现虚拟滚动
- [ ] 优化首屏加载时间
- [ ] 实现智能预加载

---

这个技术栈设计注重现代化、性能和开发体验的平衡，为项目的长期发展奠定了坚实的基础。