import React from 'react';
import { blogPosts } from '../blogData';
import { GlassCard } from './GlassCard';

interface BlogProps {
  onNavigate: (slug: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-vivah-burgundy mb-4">Vivah Verse Blog</h1>
        <p className="text-xl text-gray-600">Your source for wedding planning tips, inspiration, and advice.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <GlassCard key={post.slug} hoverEffect className="p-0 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-vivah-burgundy mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 mb-2">By {post.author} on {post.date}</p>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button
                onClick={() => onNavigate(post.slug)}
                className="font-bold text-vivah-rose hover:underline"
              >
                Read More
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
