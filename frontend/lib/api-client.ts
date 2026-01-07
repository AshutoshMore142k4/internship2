import axios from 'axios';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  avatar?: string;
}

interface CreateTaskData {
  title: string;
  description?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

interface TaskFilters {
  status?: string;
  priority?: string;
  search?: string;
}

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 15000, // Increased for slower connections
  headers: {
    'Content-Type': 'application/json',
  },
});

if (process.env.NODE_ENV === 'development') {
  console.log('API Base URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api');
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      return Promise.reject({
        success: false,
        message: 'No response from server. Please check your connection.',
      });
    } else {
      return Promise.reject({
        success: false,
        message: error.message || 'An error occurred',
      });
    }
  }
);

export const authAPI = {
  register: (data: RegisterData) => apiClient.post('/auth/register', data),
  login: (data: LoginData) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

export const userAPI = {
  getProfile: () => apiClient.get('/users/profile'),
  updateProfile: (data: UpdateProfileData) => apiClient.put('/users/profile', data),
  deleteAccount: () => apiClient.delete('/users/profile'),
};

export const taskAPI = {
  createTask: (data: CreateTaskData) => apiClient.post('/tasks', data),
  getTasks: (params?: TaskFilters) => apiClient.get('/tasks', { params }),
  getTaskById: (id: string) => apiClient.get(`/tasks/${id}`),
  updateTask: (id: string, data: Partial<CreateTaskData>) => apiClient.put(`/tasks/${id}`, data),
  deleteTask: (id: string) => apiClient.delete(`/tasks/${id}`),
  getTaskStats: () => apiClient.get('/tasks/stats'),
};

export default apiClient;
