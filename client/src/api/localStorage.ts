import type { Post, CreatePostRequest, UpdatePostRequest } from '../types/post';

const STORAGE_KEY = 'blog_posts';

// 获取所有文章
export const getPosts = async (): Promise<Post[]> => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // 初始化一些示例数据
    const initialPosts: Post[] = [
      {
        id: '1',
        title: 'Welcome to Blog Demo',
        content: 'This is a demo blog post. You can create, edit, and delete posts.\n\nThis blog is built with React + TypeScript + Vite + Tailwind CSS.',
        author: 'Admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialPosts));
    return initialPosts;
  }
  return JSON.parse(data);
};

// 获取单篇文章
export const getPostById = async (id: string): Promise<Post> => {
  const posts = await getPosts();
  const post = posts.find(p => p.id === id);
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

// 创建文章
export const createPost = async (post: CreatePostRequest): Promise<Post> => {
  const posts = await getPosts();
  const newPost: Post = {
    id: Date.now().toString(),
    ...post,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

// 更新文章
export const updatePost = async (id: string, post: UpdatePostRequest): Promise<Post> => {
  const posts = await getPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) {
    throw new Error('Post not found');
  }
  posts[index] = {
    ...posts[index],
    ...post,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return posts[index];
};

// 删除文章
export const deletePost = async (id: string): Promise<void> => {
  const posts = await getPosts();
  const filteredPosts = posts.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
};