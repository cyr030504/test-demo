import axios from 'axios';

// 检测是否在 GitHub Pages 环境
const isGitHubPages = window.location.hostname.includes('github.io');

const client = axios.create({
  // GitHub Pages 环境下使用完整的后端 URL（如果有部署后端）
  // 或者使用本地存储
  baseURL: isGitHubPages ? '' : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;