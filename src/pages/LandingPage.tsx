import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  Zap,
} from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';
import { useModalStore } from '@/lib/modalStore';

const LandingPage = () => {
  const { authModal, openAuthModal, closeAuthModal } = useModalStore();

  const features = [
    {
      icon: Users,
      title: 'User Management',
      description:
        'Efficiently manage teachers and staff with role-based access control.',
    },
    {
      icon: BookOpen,
      title: 'Student Records',
      description:
        'Maintain comprehensive student profiles with academic and personal data.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description:
        'Get insights into school performance with detailed analytics and reports.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description:
        'Enterprise-grade security to keep your school data safe and protected.',
    },
    {
      icon: Zap,
      title: 'Easy Integration',
      description:
        'Seamlessly integrate with existing school systems and workflows.',
    },
    {
      icon: GraduationCap,
      title: 'Academic Excellence',
      description: 'Tools designed to promote and track academic achievement.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation Header */}
      <header className="border-b border-purple-primary/20 backdrop-blur-sm bg-white/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-purple-primary" />
              <span className="text-2xl font-bold hero-text">Aura Academy</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => openAuthModal('login')}>
                Login
              </Button>
              <Button
                variant="gradient"
                onClick={() => openAuthModal('signup')}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 hero-text">
            School Management
            <br />
            Made Simple
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your educational institution with our comprehensive
            school management system. From student records to staff management,
            we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="gradient"
              onClick={() => openAuthModal('signup')}>
              Start Your Journey
            </Button>
            <Button
              size="lg"
              variant="gradient-outline"
              onClick={() => openAuthModal('login')}>
              Already Have Account?
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 hero-text">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed specifically for modern educational
              institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="shadow-elegant border-purple-primary/20 hover:shadow-purple transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of schools already using Aura Academy to streamline
            their operations
          </p>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-purple-primary hover:bg-white/90"
            onClick={() => openAuthModal('signup')}>
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-primary/20 py-8 px-4 bg-white/80">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-6 w-6 text-purple-primary" />
            <span className="text-xl font-bold hero-text">Aura Academy</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Aura Academy. Empowering education through technology.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {authModal && <AuthModal type={authModal} onClose={closeAuthModal} />}
    </div>
  );
};

export default LandingPage;
