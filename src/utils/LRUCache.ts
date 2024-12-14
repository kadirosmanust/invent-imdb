type LRUCache<K, V> = {
    get: (key: K) => V | undefined;
    set: (key: K, value: V) => void;
    delete: (key: K) => boolean;
  };
  
  const createLRUCache = <K, V>(maxCapacity: number): LRUCache<K, V> => {
    const cache = new Map<K, V>();
  
    const get = (key: K): V | undefined => {
      if (!cache.has(key)) return undefined;
      const value = cache.get(key)!;
      cache.delete(key);
      cache.set(key, value);
      return value;
    };
  
    const set = (key: K, value: V): void => {
      if (cache.has(key)) {
        cache.delete(key);
      } else if (cache.size >= maxCapacity) {
        const lruKey = cache.keys().next().value;
        if (lruKey !== undefined) {
          cache.delete(lruKey);
        }
      }
      cache.set(key, value);
    };
  
    const del = (key: K): boolean => {
        return cache.delete(key);
      };
    
      return { get, set, delete: del };
  };
  
  export default createLRUCache;