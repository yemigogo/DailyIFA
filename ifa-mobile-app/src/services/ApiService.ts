import { API_CONFIG } from '../constants/Config';

export interface DailyReading {
  id: number;
  date: string;
  oduId: number;
  odu: {
    id: number;
    name: string;
    nameYoruba: string;
    message: string;
    messageYoruba: string;
    pattern: boolean[][];
  };
}

export interface Odu {
  id: number;
  name: string;
  nameYoruba: string;
  subtitle: string;
  subtitleYoruba: string;
  message: string;
  messageYoruba: string;
  pattern: boolean[][];
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Service Error:', error);
      throw error;
    }
  }

  // Daily Readings
  async getDailyReading(date: string): Promise<DailyReading> {
    return this.fetchApi<DailyReading>(`${API_CONFIG.ENDPOINTS.READINGS}/${date}`);
  }

  async getReadingHistory(limit = 10): Promise<DailyReading[]> {
    return this.fetchApi<DailyReading[]>(`${API_CONFIG.ENDPOINTS.READINGS}?limit=${limit}`);
  }

  // Odu
  async getAllOdu(): Promise<Odu[]> {
    return this.fetchApi<Odu[]>(API_CONFIG.ENDPOINTS.ODU);
  }

  async getOdu(id: number): Promise<Odu> {
    return this.fetchApi<Odu>(`${API_CONFIG.ENDPOINTS.ODU}/${id}`);
  }

  // Search
  async searchOduByProblem(problem: string): Promise<Odu[]> {
    return this.fetchApi<Odu[]>(`${API_CONFIG.ENDPOINTS.SEARCH}?problem=${encodeURIComponent(problem)}`);
  }
}

export const apiService = new ApiService();