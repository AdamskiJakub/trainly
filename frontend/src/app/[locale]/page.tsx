import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from '@/components/layout/navbar';
import { WordCloud } from '@/components/ui/word-cloud';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <div className="relative overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16 min-h-[calc(100vh-5rem)] flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  {t('hero.title')}{' '}
                  <span className="bg-linear-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    {t('hero.titleHighlight')}
                  </span>
                </h1>
                
                <p className="text-base md:text-lg text-slate-300 leading-relaxed">
                  {t('hero.description')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">

                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="🔍 Miasto..."
                      className="w-full px-4 py-4 rounded-lg bg-slate-800/50 border-2 border-slate-700 text-white placeholder-slate-400 focus:border-orange-500 focus:outline-none transition-colors text-base"
                    />
                  </div>

                  <div className="flex-1">
                    <select
                      className="w-full px-4 py-4 rounded-lg bg-slate-800/50 border-2 border-slate-700 text-white focus:border-orange-500 focus:outline-none transition-colors text-base appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>💪 Specjalizacja...</option>
                      <option value="personal-trainer">Trener personalny</option>
                      <option value="yoga">Yoga</option>
                      <option value="nutrition">Dietetyk</option>
                      <option value="physio">Fizjoterapeuta</option>
                      <option value="crossfit">CrossFit</option>
                      <option value="pilates">Pilates</option>
                    </select>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-linear-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-10 py-7 text-xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all"
                  asChild
                >
                  <Link href="/instructors">Szukaj Trenerów</Link>
                </Button>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center h-full">
              <WordCloud />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 hover:border-orange-500 transition-all duration-300 h-full">
              <CardHeader>
                <div className="text-5xl mb-4">🔍</div>
                <CardTitle className="text-2xl text-white font-bold mb-3">
                  {t('features.findExperts.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 text-base leading-relaxed space-y-3">
                <p className="text-slate-400">
                  {t('features.findExperts.description')}
                </p>
                <p className="font-medium">
                  {t('features.findExperts.content')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 hover:border-orange-500 transition-all duration-300 h-full">
              <CardHeader>
                <div className="text-5xl mb-4">💬</div>
                <CardTitle className="text-2xl text-white font-bold mb-3">
                  {t('features.directContact.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 text-base leading-relaxed space-y-3">
                <p className="text-slate-400">
                  {t('features.directContact.description')}
                </p>
                <p className="font-medium">
                  {t('features.directContact.content')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 hover:border-orange-500 transition-all duration-300 h-full">
              <CardHeader>
                <div className="text-5xl mb-4">⭐</div>
                <CardTitle className="text-2xl text-white font-bold mb-3">
                  {t('features.reviews.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 text-base leading-relaxed space-y-3">
                <p className="text-slate-400">
                  {t('features.reviews.description')}
                </p>
                <p className="font-medium">
                  {t('features.reviews.content')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
