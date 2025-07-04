
import React from 'react';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface UserProfile {
  id: string;
  full_name: string | null;
  shop_name: string | null;
  location: string | null;
  created_at: string;
}

interface UserProfilesCarouselProps {
  profiles: UserProfile[];
  totalUsers: number;
}

const UserProfilesCarousel: React.FC<UserProfilesCarouselProps> = ({ profiles, totalUsers }) => {
  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (profiles.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Users Yet</h3>
        <p className="text-gray-600">Users will appear here once they start signing up</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">System Users</h3>
          <p className="text-gray-600">{totalUsers} registered users</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
      </div>

      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {profiles.map((profile) => (
            <CarouselItem key={profile.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                      {getInitials(profile.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 truncate">
                      {profile.full_name || 'Anonymous User'}
                    </h4>
                    {profile.shop_name && (
                      <p className="text-sm text-blue-600 font-medium truncate">
                        {profile.shop_name}
                      </p>
                    )}
                    {profile.location && (
                      <p className="text-xs text-gray-500 truncate">
                        📍 {profile.location}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Joined {formatDate(profile.created_at)}
                    </p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </Card>
  );
};

export default UserProfilesCarousel;
