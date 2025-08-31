import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { GraduationCap } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

interface AuthModalProps {
  type: 'login' | 'signup';
}

export const AuthModal = ({ type }: AuthModalProps) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
    // Small delay to allow modal close animation
    setTimeout(() => {
      navigate('/');
    }, 200);
  };

  const handleSuccess = () => {
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <>
      {/* Background overlay with blur */}
      <div className="fixed inset-0 z-40 bg-gradient-subtle backdrop-blur-md" />
      
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md shadow-elegant border-purple-primary/20 bg-white/95 backdrop-blur-xl">
          <DialogHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-purple-primary" />
              <span className="text-2xl font-bold hero-text">Aura Academy</span>
            </div>
          </DialogHeader>
          
          {type === 'login' ? (
            <LoginForm onSuccess={handleSuccess} onSwitchToSignup={() => navigate('/signup', { state: location.state })} />
          ) : (
            <SignupForm onSuccess={handleSuccess} onSwitchToLogin={() => navigate('/login', { state: location.state })} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};