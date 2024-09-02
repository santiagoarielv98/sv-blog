'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, MessageSquare, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  likes: number;
  comments: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

export default function UserProfile() {
  const [_activeTab, setActiveTab] = useState('blogs');

  const user = {
    name: 'Jane Doe',
    username: '@janedoe',
    avatar: '/placeholder-user.jpg',
    bio: 'Passionate blogger | Tech enthusiast | Coffee lover',
    followers: 1234,
    following: 567,
    posts: 42,
  };

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: '10 Tips for Productive Remote Work',
      excerpt:
        'Working from home can be challenging. Here are some tips to boost your productivity...',
      date: '2023-05-15',
      likes: 89,
      comments: 23,
    },
    {
      id: 2,
      title: 'The Future of Artificial Intelligence',
      excerpt:
        "AI is rapidly evolving. Let's explore its potential impact on various industries...",
      date: '2023-05-10',
      likes: 132,
      comments: 45,
    },
    {
      id: 3,
      title: 'Mastering React Hooks',
      excerpt:
        "React Hooks have revolutionized how we write components. In this post, we'll dive deep into...",
      date: '2023-05-05',
      likes: 76,
      comments: 18,
    },
    {
      id: 4,
      title: 'Sustainable Living: Small Changes, Big Impact',
      excerpt:
        'Discover how small lifestyle adjustments can contribute to a more sustainable future...',
      date: '2023-04-30',
      likes: 105,
      comments: 37,
    },
  ];

  const followers: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      username: '@alice',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    {
      id: 2,
      name: 'Bob Smith',
      username: '@bobsmith',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      username: '@charlie',
      avatar: '/placeholder.svg?height=32&width=32',
    },
  ];

  const following: User[] = [
    {
      id: 4,
      name: 'David Lee',
      username: '@davidlee',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    {
      id: 5,
      name: 'Eva Garcia',
      username: '@evagarcia',
      avatar: '/placeholder.svg?height=32&width=32',
    },
    {
      id: 6,
      name: 'Frank Wilson',
      username: '@frankw',
      avatar: '/placeholder.svg?height=32&width=32',
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.username}</p>
                <p className="text-center mt-4">{user.bio}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-center">
                <p className="font-bold">{user.followers}</p>
                <p className="text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.following}</p>
                <p className="text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.posts}</p>
                <p className="text-muted-foreground">Posts</p>
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="blogs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="blogs" onClick={() => setActiveTab('blogs')}>
                Blogs
              </TabsTrigger>
              <TabsTrigger
                value="followers"
                onClick={() => setActiveTab('followers')}
              >
                Followers
              </TabsTrigger>
              <TabsTrigger
                value="following"
                onClick={() => setActiveTab('following')}
              >
                Following
              </TabsTrigger>
            </TabsList>
            <TabsContent value="blogs">
              <div className="grid gap-6 mt-6">
                {blogPosts.map((post) => (
                  <Card key={post.id}>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="flex items-center space-x-4 text-muted-foreground">
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {post.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.comments}
                        </span>
                      </div>
                      <span className="text-muted-foreground">{post.date}</span>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="followers">
              <div className="space-y-4 mt-6">
                {followers.map((follower) => (
                  <Card key={follower.id}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={follower.avatar}
                            alt={follower.name}
                          />
                          <AvatarFallback>
                            {follower.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{follower.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {follower.username}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Follow Back
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="following">
              <div className="space-y-4 mt-6">
                {following.map((followedUser) => (
                  <Card key={followedUser.id}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={followedUser.avatar}
                            alt={followedUser.name}
                          />
                          <AvatarFallback>
                            {followedUser.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{followedUser.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {followedUser.username}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Unfollow
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
