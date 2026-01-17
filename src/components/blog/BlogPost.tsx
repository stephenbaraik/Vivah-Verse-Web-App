import React from 'react';
import { blogPosts } from '../../constants/blogData';
import { ArrowLeft } from 'lucide-react';

interface BlogPostProps {
  slug: string;
  onBack: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ slug, onBack }) => {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-vivah-burgundy mb-4">Post not found</h1>
        <button onClick={onBack} className="text-vivah-rose hover:underline">
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button onClick={onBack} className="flex items-center text-vivah-burgundy/50 hover:text-vivah-burgundy transition-colors mb-8">
        <ArrowLeft size={18} className="mr-2" /> Back to Blog
      </button>
      <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-2xl mb-8" />
      <h1 className="text-5xl font-bold text-vivah-burgundy mb-4">{post.title}</h1>
      <p className="text-lg text-gray-500 mb-8">
        By {post.author} on {post.date}
      </p>
      <div
        className="prose lg:prose-xl text-gray-700"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

