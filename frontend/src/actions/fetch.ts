'use server';

import { headers } from 'next/headers';

const BASE_URL = 'http://localhost:4000/api/v1';

type GetFetchArgs = {
  path: string;
  tagName: string;
  cacheType?: RequestCache;
};

export const getFetch = async ({ path, tagName, cacheType }: GetFetchArgs) => {
  console.log('[server fetch]', {
    path,
    tagName,
    cacheType,
  });
  const header = await headers();

  console.log('[server headers]', {
    userAgent: header.get('user-agent'),
    cookie: header.get('cookie'),
  });

  return fetch(`${BASE_URL}/${path}`, {
    headers: new Headers(header),
    next: { tags: [tagName] },
    cache: cacheType,
  });
};

type PostFetchArgs = {
  path: string;
  body: Record<string, unknown>;
};

export const postFetch = async ({ path, body }: PostFetchArgs) => {
  console.log('[server fetch]', {
    method: 'POST',
    path,
    body,
  });

  return fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  });
};

type PutFetchArgs = {
  path: string;
  body: Record<string, unknown>;
};

export const putFetch = async ({ path, body }: PutFetchArgs) => {
  console.log('[server fetch]', {
    method: 'PUT',
    path,
    body,
  });

  return fetch(`${BASE_URL}/${path}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(body),
  });
};
