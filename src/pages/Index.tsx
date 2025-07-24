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
    <div className="min-h-screen gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-96 bg-gradient-to-b from-transparent via-blue-400/50 to-transparent"></div>
      </div>
      
      <ThemeToggle />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-glass text-white text-sm font-medium mb-8 glow-effect">
            <Sparkles className="w-4 h-4 text-blue-400" />
            AI-Powered Article Analysis
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
            格致 BenSight
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-16 leading-relaxed">
            将微信公众号文章转换为精美的 Bento 风格摘要，提取核心要点，快速理解文章精髓
          </p>

          {/* Input Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="backdrop-blur-glass border-white/10 shadow-2xl glow-effect">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-3 text-white text-2xl">
                  <Link2 className="w-6 h-6 text-blue-400" />
                  输入文章链接
                </CardTitle>
                <CardDescription className="text-white/70 text-lg">
                  支持微信公众号文章链接 (mp.weixin.qq.com)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="url"
                      placeholder="https://mp.weixin.qq.com/s/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 h-14 text-lg backdrop-blur-sm"
                      disabled={isPending}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 glow-effect animated-beam pulse-glow" 
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        生成中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6 mr-3" />
                        生成摘要
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Results Preview */}
        {data && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">生成预览</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
              <BentoCard size="lg" className="backdrop-blur-glass border-white/10 glow-effect float-animation">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-white">文章标题</h3>
                    <p className="text-white/70 text-sm line-clamp-3">
                      {data.summary.title}
                    </p>
                  </div>
                </div>
              </BentoCard>

              <BentoCard size="md" className="backdrop-blur-glass border-white/10 glow-effect float-animation" style={{animationDelay: '0.2s'}}>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white">{data.summary.readingTime}</p>
                  <p className="text-white/70 text-sm">阅读时长</p>
                </div>
              </BentoCard>

              <BentoCard size="xl" className="backdrop-blur-glass border-white/10 glow-effect float-animation" style={{animationDelay: '0.4s'}}>
                <h3 className="font-semibold text-lg mb-4 text-white">文章摘要</h3>
                <Textarea
                  value={data.summary.summary}
                  readOnly
                  className="resize-none border-none p-0 focus-visible:ring-0 bg-transparent text-white/80 placeholder:text-white/50"
                  rows={6}
                />
              </BentoCard>

              <BentoCard size="lg" className="backdrop-blur-glass border-white/10 glow-effect float-animation" style={{animationDelay: '0.6s'}}>
                <h3 className="font-semibold text-lg mb-4 text-white">核心要点</h3>
                <ul className="space-y-2">
                  {data.summary.keyPoints.slice(0, 3).map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0 glow-effect">
                        {index + 1}
                      </span>
                      <span className="line-clamp-2 text-white/80">{point}</span>
                    </li>
                  ))}
                </ul>
              </BentoCard>

              <BentoCard size="xl" className="backdrop-blur-glass border-white/10 glow-effect float-animation" style={{animationDelay: '0.8s'}}>
                <div className="flex items-start gap-3">
                  <Tag className="w-6 h-6 text-blue-400 mt-1" />
                  <div className="w-full">
                    <h3 className="font-semibold text-lg mb-4 text-white">标签</h3>
                    <div className="flex flex-wrap gap-2">
                      {data.summary.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white border-white/20 backdrop-blur-sm">
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
          <div className="text-center p-8 backdrop-blur-glass rounded-2xl border border-white/10 glow-effect float-animation">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-effect">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-white">智能提取</h3>
            <p className="text-white/70">
              自动提取文章核心内容，过滤无关信息
            </p>
          </div>
          
          <div className="text-center p-8 backdrop-blur-glass rounded-2xl border border-white/10 glow-effect float-animation" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-effect">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-white">AI 分析</h3>
            <p className="text-white/70">
              利用 AI 技术分析文章结构和要点
            </p>
          </div>
          
          <div className="text-center p-8 backdrop-blur-glass rounded-2xl border border-white/10 glow-effect float-animation" style={{animationDelay: '0.4s'}}>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-effect">
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="font-semibold text-xl mb-3 text-white">快速预览</h3>
            <p className="text-white/70">
              生成美观的 Bento 风格摘要页面
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
