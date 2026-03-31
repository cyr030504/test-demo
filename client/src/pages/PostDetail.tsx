import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPost, deletePost } from '../api/posts';
import type { Post } from '../types/post';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      const data = await getPost(postId);
      setPost(data);
    } catch (error) {
      console.error('Failed to load post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !confirm('确定要删除这篇文章吗？')) return;
    try {
      await deletePost(post.id);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">加载中...</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500 mb-4">文章不存在</p>
        <Link to="/" className="text-blue-600 hover:underline">
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← 返回列表
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
      
      <div className="flex items-center text-sm text-gray-500 mb-8 pb-4 border-b">
        <span className="mr-6">作者: {post.author}</span>
        <span className="mr-6">
          发布于: {new Date(post.createdAt).toLocaleString()}
        </span>
        <span>更新于: {new Date(post.updatedAt).toLocaleString()}</span>
      </div>

      <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

      <div className="mt-8 pt-6 border-t flex gap-4">
        <Link
          to={`/edit/${post.id}`}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          编辑文章
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          删除文章
        </button>
      </div>
    </div>
  );
}
