// LRUCache.test.ts
import { describe, expect, test } from 'vitest';

import createLRUCache from '@/utils/LRUCache';

describe('LRUCache', () => {
  test('should create cache with specified capacity', () => {
    const cache = createLRUCache<string, number>(2);
    expect(cache).toBeDefined();
    expect(cache.get).toBeDefined();
    expect(cache.set).toBeDefined();
    expect(cache.delete).toBeDefined();
  });

  test('should get and set values correctly', () => {
    const cache = createLRUCache<string, number>(2);
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeUndefined();
  });

  test('should evict least recently used item when capacity is exceeded', () => {
    const cache = createLRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);

    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBe(2);
    expect(cache.get('c')).toBe(3);
  });

  test('should update access order on get', () => {
    const cache = createLRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a');
    cache.set('c', 3);

    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBeUndefined();
    expect(cache.get('c')).toBe(3);
  });

  test('should handle delete operation correctly', () => {
    const cache = createLRUCache<string, number>(2);
    cache.set('a', 1);

    expect(cache.delete('a')).toBe(true);
    expect(cache.get('a')).toBeUndefined();
    expect(cache.delete('nonexistent')).toBe(false);
  });

  test('should update existing keys without eviction', () => {
    const cache = createLRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('a', 3);

    expect(cache.get('a')).toBe(3);
    expect(cache.get('b')).toBe(2);
  });
});
