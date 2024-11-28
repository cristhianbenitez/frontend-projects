import { Country } from '@/types/api';
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://restcountries.com/v3.1';

// Define custom error type
interface ApiError {
  message: string;
  statusCode: number;
}

export const countriesApi = {
  async getAllCountries(): Promise<Country[]> {
    try {
      const response = await fetch(`${BASE_URL}/all`);
      if (!response.ok) {
        const error: ApiError = {
          message: 'Failed to fetch countries',
          statusCode: response.status
        };
        throw error;
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  },
  async getCountriesByRegion(region: string): Promise<Country[]> {
    try {
      const response = await fetch(`${BASE_URL}/region/${region}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch countries in ${region}`);
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching countries in ${region}:`, error);
      throw error;
    }
  }
};

export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: countriesApi.getAllCountries,
    retry: 3,
    staleTime: 5 * 60 * 1000 // Cache for 5 minutes
  });
};
