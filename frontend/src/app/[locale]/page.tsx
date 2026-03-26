import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LocaleSwitcher } from '@/components/locale-switcher';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="min-h-screen bg-background">
      {/* Temporary LocaleSwitcher - will move to Navbar later */}
      <div className="fixed top-4 right-4 z-50">
        <LocaleSwitcher />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            {t('hero.description')}
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/instructors">{t('hero.browseButton')}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">{t('hero.signUpButton')}</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>{t('features.findExperts.title')}</CardTitle>
              <CardDescription>
                {t('features.findExperts.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {t('features.findExperts.content')}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('features.easyBooking.title')}</CardTitle>
              <CardDescription>
                {t('features.easyBooking.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {t('features.easyBooking.content')}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('features.reviews.title')}</CardTitle>
              <CardDescription>
                {t('features.reviews.description')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {t('features.reviews.content')}
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">{t('stats.trainers')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">10k+</div>
            <div className="text-muted-foreground">{t('stats.sessions')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">4.8★</div>
            <div className="text-muted-foreground">{t('stats.rating')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
