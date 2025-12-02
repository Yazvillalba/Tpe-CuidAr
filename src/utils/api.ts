
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001/api';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  user?: T;
  users?: T[];
  roles?: T[];
  stats?: T;
  count?: number;
  rol?: string;
  path?: string;
  filename?: string;
  error?: string;
  solicitudes?: T[];
  postulaciones?: T[];
}


export interface UserApiResponse {
  idUsuario: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  image?: string | null;
}

export const api = {

    async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const fetchOptions: RequestInit = {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        mode: 'cors', 
      };
      
      const response = await fetch(url, fetchOptions);

      const contentType = response.headers.get('content-type');
      let data: any;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error(`Error del servidor: ${response.statusText}`);
      }

      if (!response.ok) {
        if (response.status === 401) {
          const errorMessage = data.message || data.error || 'Usuario o contraseña incorrectos';
          const error = new Error(errorMessage);
          (error as any).status = 401;
          throw error;
        }
        throw new Error(data.message || data.error || `Error: ${response.statusText}`);
      }

      return data;
    } catch (error: any) {
      console.error('API Error:', error);
      
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('No se pudo conectar al servidor. Verifica que el backend esté corriendo en http://localhost:3001');
      }
      
      throw error;
    }
  },

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  },

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  },

  async patch<T>(endpoint: string, body?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  async uploadFile(endpoint: string, file: File): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Error: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};

export default api;

