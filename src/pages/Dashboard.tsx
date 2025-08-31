import { Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, School, TrendingUp, Calendar, Bell } from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { DashboardSkeleton } from '@/components/LoadingSkeleton';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Teachers",
      value: "45",
      change: "+2%", 
      icon: BookOpen,
      color: "text-green-600"
    },
    {
      title: "Classes",
      value: "28",
      change: "0%",
      icon: School,
      color: "text-purple-primary"
    },
    {
      title: "Average Grade",
      value: "8.7",
      change: "+0.3",
      icon: TrendingUp,
      color: "text-indigo-primary"
    }
  ];

  const recentActivities = [
    {
      action: "New student enrolled",
      details: "John Doe joined Grade 10A",
      time: "2 hours ago",
      type: "enrollment"
    },
    {
      action: "Grade report submitted",
      details: "Mathematics - Grade 9B",
      time: "4 hours ago", 
      type: "grade"
    },
    {
      action: "Parent meeting scheduled",
      details: "Emma Wilson's parents",
      time: "6 hours ago",
      type: "meeting"
    },
    {
      action: "Attendance updated",
      details: "Grade 8C - 95% present",
      time: "1 day ago",
      type: "attendance"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <Suspense fallback={<div className="w-60"><div className="sidebar-gradient h-full animate-pulse" /></div>}>
          <AppSidebar />
        </Suspense>
        
        <main className="flex-1">
          <Suspense fallback={<DashboardSkeleton />}>
            <div className="p-6">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold hero-text">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-muted-foreground mt-2">
                  Here's what's happening at your school today
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="shadow-elegant border-purple-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-green-600">{stat.change}</span> from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <Card className="shadow-elegant border-purple-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-purple-primary" />
                      Recent Activities
                    </CardTitle>
                    <CardDescription>
                      Latest updates from your school
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-purple-primary/5 border border-purple-primary/10">
                        <div className="w-2 h-2 rounded-full bg-purple-primary mt-2"></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.details}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-elegant border-purple-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-indigo-primary" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>
                      Common tasks to get you started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="gradient-outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Add New Student
                    </Button>
                    <Button variant="gradient-outline" className="w-full justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Create Class Schedule
                    </Button>
                    <Button variant="gradient-outline" className="w-full justify-start">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Reports
                    </Button>
                    {user?.role === 'ADMIN' && (
                      <Button variant="gradient-outline" className="w-full justify-start">
                        <School className="mr-2 h-4 w-4" />
                        Manage Schools
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;