import { ParsedUrlQueryInput, stringify } from 'querystring';

import HTTPMethod from '@/constants/http-method';

const basicHeaders = [
  ['Accept', 'application/json'],
  ['Content-Type', 'application/json']
];

async function fetcher<T = any>(reqInfo: RequestInfo, reqInit?: RequestInit): Promise<T> {
  const response: Response = await fetch(reqInfo, reqInit);
  if (response.status >= 400 && response.status < 600) {
    throw new Error(response.statusText);
  }
  return (await response.json()) as T;
}

function parseEndpoint(endpoint: string, query?: any): string {
  if (query && Object.keys(query).length) return `${endpoint}?${stringify(query)}`;
  return endpoint;
}

async function mutate<T = any>(endpoint: string, method: string, body?: BodyInit): Promise<T> {
  const response = await fetcher<T>(endpoint, {
    method,
    body,
    headers: basicHeaders
  });

  return response;
}

// eslint-disable-next-line import/prefer-default-export
export const api = {
  async get<T = any, Q extends ParsedUrlQueryInput = any>(
    endpoint: string,
    query?: Q | null
  ): Promise<T> {
    const response = await fetcher<T>(parseEndpoint(endpoint, query), {
      method: HTTPMethod.GET,
      headers: basicHeaders
    });
    return response;
  },

  async post<T = any>(endpoint: string, body?: BodyInit): Promise<T> {
    return await mutate<T>(endpoint, HTTPMethod.POST, body);
  },

  async put<T = any>(endpoint: string, body?: BodyInit): Promise<T> {
    return await mutate<T>(endpoint, HTTPMethod.PUT, body);
  },

  async delete<T = any>(endpoint: string, body?: BodyInit): Promise<T> {
    return await mutate<T>(endpoint, HTTPMethod.DELETE, body);
  }
};
