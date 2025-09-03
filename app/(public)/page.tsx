import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Feature = {
  title: string;
  description: string;
  icon: string;
};

const features: Feature[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated designed by industry experts.",
    icon: "📚",
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with hands-on activities, quizzes, and real-time feedback to enhance your learning experience.",
    icon: "🎮",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and personalized insights.",
    icon: "📊",
  },
  {
    title: "Community Support",
    description:
      "Join a vibrant community of learners and educators for collaboration, discussion, and peer support.",
    icon: "👥",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative py-20">
        <div className="flex gap-2 flex-col items-center justify-center mx-auto">
          <Badge variant="outline" className="text-sm">
            This is the Future of Online Education
          </Badge>

          <h1
            className="text-center text-4xl md:text-6xl tracking-wide text-balance
           font-bold"
          >
            Elevate your Leaning Experience
          </h1>
          <p className="max-w-3xl sm:text-xl text-center text-muted-foreground text-balance">
            Discover a new way learning with your modern, interactive le arning
            management system. Access high-quality courses anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link className={buttonVariants({ size: "lg" })} href="/courses">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          return (
            <Card className="hover:shadow-lg transition-shadow" key={index}>
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-2xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </>
  );
}
