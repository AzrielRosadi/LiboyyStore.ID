import { useState } from 'react';
import { useLocation } from 'wouter';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface LoginCredentials {
  username: string;
  password: string;
}

const AdminLogin = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  
  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => {
      return apiRequest('POST', '/api/admin/login', data);
    },
    onSuccess: () => {
      toast({
        title: "Login berhasil",
        description: "Selamat datang di panel admin",
      });
      navigate('/admin/dashboard');
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: "Username atau password salah",
      });
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username dan password harus diisi",
      });
      return;
    }
    
    loginMutation.mutate(credentials);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Login untuk mengakses panel admin</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Masukkan username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-6"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <div className="w-full">
            <p>Kembali ke <a href="/" className="text-primary hover:underline">website</a></p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
