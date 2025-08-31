import { Home, Users, UserCog, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: "Home", url: "/dashboard", icon: Home, roles: ['ADMIN', 'USER'] },
  { title: "Students", url: "/dashboard/students", icon: Users, roles: ['ADMIN', 'USER'] },
  { title: "Teachers", url: "/dashboard/teachers", icon: UserCog, roles: ['ADMIN'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isCollapsed = state === "collapsed";

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-white/20 text-white font-medium shadow-lg'
        : 'text-white/80 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <Sidebar className={`${isCollapsed ? 'w-14' : 'w-60'} sidebar-gradient border-r border-purple-primary/20`}>
      <SidebarTrigger className="m-2 self-end text-white hover:bg-white/10" />
      
      <SidebarContent className="p-4">
        {/* User Info */}
        {!isCollapsed && (
          <div className="mb-6 p-3 rounded-lg bg-white/10">
            <h3 className="text-white font-medium">{user?.name}</h3>
            <p className="text-white/70 text-sm">
              {user?.role === 'ADMIN' ? 'Principal' : 'Teacher'}
            </p>
            {user?.schoolName && (
              <p className="text-white/60 text-xs mt-1">{user.schoolName}</p>
            )}
          </div>
        )}

        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-white/80 text-sm font-medium mb-2">
              Navigation
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems
                .filter(item => item.roles.includes(user?.role || 'USER'))
                .map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="mt-auto pt-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full text-white/80 hover:bg-white/10 hover:text-white ${
              isCollapsed ? 'px-2' : 'justify-start'
            }`}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}