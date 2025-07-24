import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Link2, Sparkles, FileText, Clock, Tag } from 'lucide-react';
import BentoCard from '@/components/BentoCard';
import ThemeToggle from '@/components/ThemeToggle';
import { useGenerate } from '@/hooks/useGenerate';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [url, setUrl] = useState('');
  const { mutate: generate, isPending, data } = useGenerate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "错误",
        description: "请输入文章链接",
        variant: "destructive"
      });
      return;
    }

    generate({ url }, {
      onError: (error) => {
        toast({
          title: "生成失败",
          description: error.message,
          variant: "destructive"
        });
      },
      onSuccess: () => {
        toast({
          title: "生成成功",
          description: "摘要已在新标签页中打开",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ThemeToggle />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Article Analysis
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            格致 BenSight
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            将微信公众号文章转换为精美的 Bento 风格摘要，提取核心要点，快速理解文章精髓
          </p>

          {/* Input Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="w-5 h-5" />
                输入文章链接
              </CardTitle>
              <CardDescription>
                支持微信公众号文章链接 (mp.weixin.qq.com)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://mp.weixin.qq.com/s/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full"
                  disabled={isPending}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      生成摘要
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Results Preview */}
        {data && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">生成预览</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
              <BentoCard size="lg">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">文章标题</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {data.summary.title}
                    </p>
                  </div>
                </div>
              </BentoCard>

              <BentoCard size="md">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-2xl font-bold">{data.summary.readingTime}</p>
                  <p className="text-muted-foreground text-sm">阅读时长</p>
                </div>
              </BentoCard>

              <BentoCard size="xl">
                <h3 className="font-semibold text-lg mb-4">文章摘要</h3>
                <Textarea
                  value={data.summary.summary}
                  readOnly
                  className="resize-none border-none p-0 focus-visible:ring-0"
                  rows={6}
                />
              </BentoCard>

              <BentoCard size="lg">
                <h3 className="font-semibold text-lg mb-4">核心要点</h3>
                <ul className="space-y-2">
                  {data.summary.keyPoints.slice(0, 3).map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="line-clamp-2">{point}</span>
                    </li>
                  ))}
                </ul>
              </BentoCard>

              <BentoCard size="xl">
                <div className="flex items-start gap-3">
                  <Tag className="w-6 h-6 text-primary mt-1" />
                  <div className="w-full">
                    <h3 className="font-semibold text-lg mb-4">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.summary.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">智能提取</h3>
            <p className="text-muted-foreground text-sm">
              自动提取文章核心内容，过滤无关信息
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI 分析</h3>
            <p className="text-muted-foreground text-sm">
              利用 AI 技术分析文章结构和要点
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">快速预览</h3>
            <p className="text-muted-foreground text-sm">
              生成美观的 Bento 风格摘要页面
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
