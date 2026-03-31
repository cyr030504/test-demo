import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../api/posts';
import type { Post } from '../types/post';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Post ID is required');
        setLoading(false);
        return;
      }

      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (err) {
        setError('Failed to fetch post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error || !post) {
    return (
      <div className="text-center py-12 text-red-600">
        {error || 'Post not found'}
        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <Link to="/" className="text-blue-600 hover:underline mr-4">
          ← Back to Home
        </Link>
        <Link to={`/edit/${post.id}`} className="text-blue-600 hover:underline">
          Edit Post
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6 text-sm">
        By {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        {post.updatedAt !== post.createdAt && (
          <span className="ml-2">• Updated {new Date(post.updatedAt).toLocaleDateString()}</span>
        )}
      </p>
      <div className="prose prose-lg">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default PostDetail;