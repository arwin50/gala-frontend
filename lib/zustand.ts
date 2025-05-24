// stores/createGenericStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';
import { apiClient } from './api';

// Define the structure for pagination metadata
export interface Meta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

// Define the base state for the generic store
export interface GenericState<T> {
  items: T[];
  item: T | null;
  loading: boolean; // For more granular control, consider per-action loading flags
  error: Error | null; // Always an Error instance if not null
  meta: Meta;
}

// Define the available actions as string literals
export type ActionType = 'fetchAll' | 'fetchOne' | 'create' | 'update' | 'remove';

// Define the actions for the generic store
export interface GenericActions<T> {
  fetchAll?: (params?: Record<string, any>) => Promise<void>;
  fetchOne?: (id: string | number) => Promise<void>;
  create?: (payload: Partial<T>) => Promise<T | undefined>;
  update?: (id: string | number, payload: Partial<T>) => Promise<T | undefined>;
  remove?: (id: string | number) => Promise<void>;
}

// Define the type for the optional extendStore function
type ExtendStore<T, TExtension extends Record<string, any>> = (
  set: StoreApi<GenericState<T> & GenericActions<T> & TExtension>['setState'],
  get: StoreApi<GenericState<T> & GenericActions<T> & TExtension>['getState']
) => TExtension;

// Define the store type
type StoreType<T, TExtension> = GenericState<T> & GenericActions<T> & TExtension;

// Define the return type of createGenericStore
type CreateGenericStoreReturn<T, TExtension extends Record<string, any>> = UseBoundStore<StoreApi<StoreType<T, TExtension>>>;

export const createGenericStore = <
  T extends { id?: string | number },
  TExtension extends Record<string, any> = Record<string, never>
>(
  endpoint: string,
  options?: {
    actions?: ActionType[];
    extendStore?: ExtendStore<T, TExtension>;
    persist?: boolean;
  }
): CreateGenericStoreReturn<T, TExtension> => {
  const defaultExtend = (() => ({} as TExtension)) as ExtendStore<T, TExtension>;
  const availableActions: ActionType[] = options?.actions || ['fetchAll', 'fetchOne', 'create', 'update', 'remove'];

  const store = (set: StoreApi<StoreType<T, TExtension>>['setState'], get: StoreApi<StoreType<T, TExtension>>['getState']) => {
    const store: GenericState<T> & Partial<GenericActions<T>> = {
      items: [],
      item: null,
      loading: false,
      error: null,
      meta: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
      }
    };

    if (availableActions.includes('fetchAll')) {
      store.fetchAll = async (params: Record<string, any> = {}) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          interface ApiResponse {
            objects?: T[];
            current_page?: number;
            num_pages?: number;
            total_count?: number;
          }
          const data: ApiResponse = await apiClient.get<ApiResponse>(`${endpoint}/`, params);
          set((state) => ({
            ...state,
            items: data.objects || [],
            meta: {
              currentPage: data.current_page || 1,
              totalPages: data.num_pages || 1,
              totalCount: data.total_count || (data.objects ? data.objects.length : 0),
            },
            loading: false,
          }));
        } catch (error: any) {
          set((state) => ({
            ...state,
            error: error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error)),
            loading: false,
          }));
        }
      };
    }

    if (availableActions.includes('fetchOne')) {
      store.fetchOne = async (id: string | number) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          const data = await apiClient.get<T>(`${endpoint}/${id}/`);
          set((state) => ({ ...state, item: data, loading: false }));
        } catch (error: any) {
          set((state) => ({
            ...state,
            error: error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error)),
            loading: false,
          }));
        }
      };
    }

    if (availableActions.includes('create')) {
      store.create = async (payload: Partial<T>) => {
        set((state) => ({ ...state, loading: true, error: null }));
        let createdData: T | undefined = undefined;
        try {
          createdData = await apiClient.post<T>(`${endpoint}/`, payload);
          set((state) => ({ ...state, loading: false }));
          const state = get();
          if ('fetchAll' in state && typeof state.fetchAll === 'function') {
            await state.fetchAll();
          }
          return createdData;
        } catch (error: any) {
          set((state) => ({
            ...state,
            error: error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error)),
            loading: false,
          }));
          return undefined;
        }
      };
    }

    if (availableActions.includes('update')) {
      store.update = async (id: string | number, payload: Partial<T>) => {
        set((state) => ({ ...state, loading: true, error: null }));
        let updatedData: T | undefined = undefined;
        try {
          updatedData = await apiClient.put<T>(`${endpoint}/${id}/`, payload);
          set((state) => ({ ...state, loading: false }));
          const state = get();
          if ('fetchAll' in state && typeof state.fetchAll === 'function') {
            await state.fetchAll();
          }
          return updatedData;
        } catch (error: any) {
          set((state) => ({
            ...state,
            error: error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error)),
            loading: false,
          }));
          return undefined;
        }
      };
    }

    if (availableActions.includes('remove')) {
      store.remove = async (id: string | number) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await apiClient.delete(`${endpoint}/${id}/`);
          set((state) => ({ ...state, loading: false }));
          const state = get();
          if ('fetchAll' in state && typeof state.fetchAll === 'function') {
            await state.fetchAll();
          }
        } catch (error: any) {
          set((state) => ({
            ...state,
            error: error instanceof Error ? error : new Error(typeof error === 'string' ? error : JSON.stringify(error)),
            loading: false,
          }));
        }
      };
    }

    // For infinite scroll, consider adding pagination helpers here

    return {
      ...store,
      ...(options?.extendStore ? options.extendStore(set, get) : defaultExtend(set, get)),
    } as StoreType<T, TExtension>;
  };

  if (options?.persist) {
    const persistOptions: PersistOptions<StoreType<T, TExtension>> = {
      name: endpoint,
      storage: createJSONStorage(() => AsyncStorage),
    };
    return create(persist(store, persistOptions));
  }

  return create(store);
};
