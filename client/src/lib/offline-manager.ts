/**
 * Offline Data Manager for Ifá Daily App
 * Handles local storage, IndexedDB, and service worker communication
 */

interface OfflineData {
  version: string;
  timestamp: string;
  data: any;
}

interface StorageQuota {
  quota?: number;
  usage?: number;
  usageDetails?: { [key: string]: number };
}

class OfflineManager {
  private dbName = 'IfaDailyOfflineDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  constructor() {
    this.initializeDB();
    this.registerServiceWorker();
  }

  // Initialize IndexedDB
  private async initializeDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores for different types of offline data
        if (!db.objectStoreNames.contains('odus')) {
          db.createObjectStore('odus', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('cards')) {
          db.createObjectStore('cards', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('audio')) {
          db.createObjectStore('audio', { keyPath: 'filename' });
        }

        if (!db.objectStoreNames.contains('learning')) {
          db.createObjectStore('learning', { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains('metadata')) {
          db.createObjectStore('metadata', { keyPath: 'type' });
        }
      };
    });
  }

  // Register service worker
  private async registerServiceWorker(): Promise<void> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Store data in IndexedDB
  async storeData(storeName: string, data: any): Promise<void> {
    if (!this.db) await this.initializeDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);

      if (Array.isArray(data)) {
        // Store multiple items
        data.forEach(item => store.put(item));
      } else {
        // Store single item
        store.put(data);
      }

      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Retrieve data from IndexedDB
  async getData(storeName: string, key?: string): Promise<any> {
    if (!this.db) await this.initializeDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);

      let request: IDBRequest;
      if (key) {
        request = store.get(key);
      } else {
        request = store.getAll();
      }

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Download and store Odu database
  async downloadOduDatabase(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/offline/odu-database');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      
      // Store basic Odus
      if (data.data.basic_odus) {
        await this.storeData('odus', data.data.basic_odus);
      }

      // Store complete 256 Odus (split into chunks for better performance)
      if (data.data.complete_256_odus) {
        const chunkSize = 50;
        const odus = data.data.complete_256_odus;
        
        for (let i = 0; i < odus.length; i += chunkSize) {
          const chunk = odus.slice(i, i + chunkSize);
          await this.storeData('odus', chunk);
        }
      }

      // Store metadata
      await this.storeData('metadata', {
        type: 'odu_database',
        version: data.version,
        timestamp: data.timestamp,
        totalRecords: data.data.total_records
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Download and store card manifest
  async downloadCardManifest(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/offline/odu-cards');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Store card metadata
      await this.storeData('cards', data.cards);
      await this.storeData('metadata', {
        type: 'card_manifest',
        version: data.version,
        timestamp: data.timestamp,
        totalCards: data.metadata.total_cards
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Download and cache card images
  async downloadCardImages(progressCallback?: (progress: number) => void): Promise<{ success: boolean; error?: string }> {
    try {
      // Get card manifest first
      const cards = await this.getData('cards');
      if (!cards || cards.length === 0) {
        throw new Error('Card manifest not found. Download manifest first.');
      }

      let downloadedCount = 0;
      const totalCards = cards.length;

      // Download and cache images using service worker
      for (const card of cards) {
        try {
          const response = await fetch(`/static/odu_cards/${card.filename}`);
          if (response.ok) {
            // Cache through service worker
            await this.cacheResource(`/static/odu_cards/${card.filename}`, await response.blob());
          }
        } catch (error) {
          console.warn(`Failed to download card: ${card.filename}`);
        }

        downloadedCount++;
        if (progressCallback) {
          progressCallback(Math.round((downloadedCount / totalCards) * 100));
        }
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Download audio files
  async downloadAudioFiles(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/offline/audio');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Store audio file metadata
      await this.storeData('audio', data.audio_files);
      await this.storeData('metadata', {
        type: 'audio_files',
        version: data.version,
        timestamp: data.timestamp,
        totalFiles: data.total_files
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Download learning content
  async downloadLearningContent(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch('/api/offline/learning-content');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Store learning modules
      await this.storeData('learning', data.modules);
      await this.storeData('metadata', {
        type: 'learning_content',
        version: data.version,
        timestamp: data.timestamp,
        totalModules: data.modules.length
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Cache resource through service worker
  private async cacheResource(url: string, data: any): Promise<void> {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_RESOURCE',
        data: { url, response: data }
      });
    }
  }

  // Check if data is available offline
  async isDataAvailable(type: string): Promise<boolean> {
    try {
      const metadata = await this.getData('metadata', type);
      return !!metadata;
    } catch {
      return false;
    }
  }

  // Get offline data status
  async getOfflineStatus(): Promise<{
    odus: boolean;
    cards: boolean;
    audio: boolean;
    learning: boolean;
    storageUsed: number;
  }> {
    const status = {
      odus: await this.isDataAvailable('odu_database'),
      cards: await this.isDataAvailable('card_manifest'),
      audio: await this.isDataAvailable('audio_files'),
      learning: await this.isDataAvailable('learning_content'),
      storageUsed: 0
    };

    // Calculate storage usage
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        status.storageUsed = (estimate.usage || 0) / (1024 * 1024); // Convert to MB
      }
    } catch (error) {
      console.warn('Could not estimate storage usage:', error);
    }

    return status;
  }

  // Clear all offline data
  async clearOfflineData(): Promise<void> {
    if (!this.db) await this.initializeDB();

    const storeNames = ['odus', 'cards', 'audio', 'learning', 'metadata'];
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(storeNames, 'readwrite');

      storeNames.forEach(storeName => {
        transaction.objectStore(storeName).clear();
      });

      transaction.oncomplete = () => {
        // Also clear service worker cache
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ type: 'CLEAR_CACHE' });
        }
        resolve();
      };

      transaction.onerror = () => reject(transaction.error);
    });
  }

  // Get offline Odu by ID
  async getOfflineOdu(id: string): Promise<any> {
    try {
      const odus = await this.getData('odus');
      return odus.find((odu: any) => odu.id === id);
    } catch {
      return null;
    }
  }

  // Search offline Odus
  async searchOfflineOdus(query: string): Promise<any[]> {
    try {
      const odus = await this.getData('odus');
      const searchTerm = query.toLowerCase();
      
      return odus.filter((odu: any) => 
        odu.name?.toLowerCase().includes(searchTerm) ||
        odu.meaning?.toLowerCase().includes(searchTerm) ||
        odu.guidance?.toLowerCase().includes(searchTerm)
      );
    } catch {
      return [];
    }
  }
}

// Export singleton instance
export const offlineManager = new OfflineManager();
export default offlineManager;