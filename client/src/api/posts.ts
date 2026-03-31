import client from './client';
import type { Post, CreatePostRequest, UpdatePostRequest } from '../types/post';
import * as localStorageAPI from './localStorage';

// 检测是否在 GitHub Pages 环境或本地开发环境
const isGitHubPages = window.location.hostname.includes('github.io');
const useLocalStorage = isGitHubPages || import.meta.env.DEV;

// 在 GitHub Pages 环境或本地开发环境下使用本地存储，生产环境使用后端 API
export const getPosts = async (): Promise<Post[]> => {
  if (useLocalStorage) {
    return localStorageAPI.getPosts();
  }
  const response = await client.get('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  if (useLocalStorage) {
    return localStorageAPI.getPostById(id);
  }
  const response = await client.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: CreatePostRequest): Promise<Post> => {
  if (useLocalStorage) {
    return localStorageAPI.createPost(post);
  }
  const response = await client.post('/posts', post);
  return response.data;
};

export const updatePost = async (id: string, post: UpdatePostRequest): Promise<Post> => {
  if (useLocalStorage) {
    return localStorageAPI.updatePost(id, post);
  }
  const response = await client.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  if (useLocalStorage) {
    return localStorageAPI.deletePost(id);
  }
  await client.delete(`/posts/${id}`);
};