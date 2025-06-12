export const BASE_URL = 'https://truthful-simplicity-production.up.railway.app';

export async function fetchAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  console.log('>>> FETCHING:', url);

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || res.statusText || 'API Error');
    }

    return res.json();
  } catch {
    throw new Error('Failed to connect to API');
  }
}
