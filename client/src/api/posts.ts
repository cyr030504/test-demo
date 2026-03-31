import apiClient from './client';
import type { Post, CreatePostRequest, UpdatePostRequest } from '../types/post';

export const getPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts');
  return response.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (data: CreatePostRequest): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', data);
  return response.data;
};

export const updatePost = async (id: string, data: UpdatePostRequest): Promise<Post> => {
  const response = await apiClient.put<Post>(`/posts/${id}`, data);
  return response.data;
};

export const deletePost = async (id: string): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};
