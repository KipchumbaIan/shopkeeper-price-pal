
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { useUserRoles } from '@/hooks/useUserRoles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Shield, UserPlus } from 'lucide-react';

const AdminSetup = () => {
  const [email, setEmail] = useState('iankipchumba2@gmail.com');
  const [password, setPassword] = useState('Admin');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [userIdToPromote, setUserIdToPromote] = useState('');
  
  const { user, signUp } = useAuth();
  const { addRole, isAdmin } = useUserRoles();
  const { toast } = useToast();

  const handleCreateAdminAccount = async () => {
    setIsCreatingAccount(true);
    try {
      const { data, error } = await signUp(email, password, {
        full_name: 'Admin User',
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Wait a moment for the user to be created, then assign admin role
        setTimeout(async () => {
          try {
            await addRole.mutateAsync({ 
              userId: data.user!.id, 
              role: 'admin' 
            });
            toast({
              title: "Admin account created!",
              description: "Admin account has been created and admin role assigned.",
            });
          } catch (roleError) {
            console.error('Error assigning admin role:', roleError);
            toast({
              title: "Account created but role assignment failed",
              description: "Please manually assign the admin role.",
              variant: "destructive",
            });
          }
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: "Error creating admin account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handlePromoteToAdmin = async () => {
    if (!userIdToPromote) return;
    
    try {
      await addRole.mutateAsync({ 
        userId: userIdToPromote, 
        role: 'admin' 
      });
    } catch (error) {
      console.error('Error promoting user to admin:', error);
    }
  };

  const handleMakeCurrentUserAdmin = async () => {
    if (!user) return;
    
    try {
      // Directly insert into database bypassing RLS for initial admin setup
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: user.id, role: 'admin' }]);
      
      if (error) throw error;
      
      toast({
        title: "Admin role assigned!",
        description: "You now have admin privileges.",
      });
      
      // Refresh the page to update permissions
      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Error assigning admin role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isAdmin) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Admin Access Confirmed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600">You already have admin privileges!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create Admin Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleCreateAdminAccount}
            disabled={isCreatingAccount}
            className="w-full"
          >
            {isCreatingAccount && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Admin Account
          </Button>
        </CardContent>
      </Card>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Make Current User Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              If you're already logged in as {user.email}, you can assign admin privileges to your current account.
            </p>
            <Button 
              onClick={handleMakeCurrentUserAdmin}
              variant="outline"
              className="w-full"
            >
              Make Me Admin
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Manual Admin Assignment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="userId">User ID to Promote</Label>
            <Input
              id="userId"
              placeholder="Enter user UUID"
              value={userIdToPromote}
              onChange={(e) => setUserIdToPromote(e.target.value)}
            />
          </div>
          <Button 
            onClick={handlePromoteToAdmin}
            disabled={!userIdToPromote || addRole.isPending}
            variant="outline"
            className="w-full"
          >
            {addRole.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Admin Role
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSetup;
