import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Find Your Perfect <span className="text-primary">Trainer</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with professional trainers, instructors, and wellness experts. 
            Book sessions, track progress, and achieve your fitness goals.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg" asChild>
              <Link href="/instructors">Browse Trainers</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card>
            <CardHeader>
              <CardTitle>🔍 Find Experts</CardTitle>
              <CardDescription>
                Browse verified trainers, instructors, and wellness professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              Search by specialization, location, and ratings to find the perfect match.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📅 Easy Booking</CardTitle>
              <CardDescription>
                Book sessions directly through our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              Simple calendar interface with instant confirmation and reminders.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>⭐ Reviews & Ratings</CardTitle>
              <CardDescription>
                Make informed decisions with real client feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              Read authentic reviews and see ratings from verified clients.
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <div className="text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Verified Trainers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">10k+</div>
            <div className="text-muted-foreground">Sessions Booked</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary">4.8★</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}
