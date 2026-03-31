import client from './client';
import type { Post, CreatePostRequest, UpdatePostRequest } from '../types/post';

export const getPosts = async (): Promise<Post[]> => {
  const response = await client.get('/posts');
  return response.data;
};

export const getPostById = async (id: string): Promise<Post> => {
  const response = await client.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (post: CreatePostRequest): Promise<Post> => {
  const response = await client.post('/posts', post);
  return response.data;
};

export const updatePost = async (id: string, post: UpdatePostRequest): Promise<Post> => {
  const response = await client.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await client.delete(`/posts/${id}`);
};