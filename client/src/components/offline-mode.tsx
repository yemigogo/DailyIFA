import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Wifi, WifiOff, CheckCircle, AlertCircle, HardDrive, Database, Image, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface OfflineResource {
  id: string;
  name: string;
  description: string;
  type: 'database' | 'images' | 'audio' | 'cards' | 'complete';
  size: string;
  essential: boolean;
  downloaded: boolean;
  url: string;
  icon: React.ReactNode;
}

interface DownloadProgress {
  resourceId: string;
  progress: number;
  status: 'downloading' | 'completed' | 'error';
}

export default function OfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineResources, setOfflineResources] = useState<OfflineResource[]>([]);
  const [downloadProgress, setDownloadProgress] = useState<DownloadProgress[]>([]);
  const [totalStorageUsed, setTotalStorageUsed] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize offline resources
    const resources: OfflineResource[] = [
      {
        id: 'odu-database',
        name: 'Complete 256 Odu Database',
        description: 'All Odu combinations with meanings, guidance, and patterns',
        type: 'database',
        size: '2.5 MB',
        essential: true,
        downloaded: false,
        url: '/api/offline/odu-database',
        icon: <Database className="w-5 h-5" />
      },
      {
        id: 'odu-cards',
        name: 'Authentic Odu Card Images',
        description: '256 traditional card images from your Excel data',
        type: 'cards',
        size: '45 MB',
        essential: true,
        downloaded: false,
        url: '/api/offline/odu-cards',
        icon: <Image className="w-5 h-5" />
      },
      {
        id: 'audio-pronunciations',
        name: 'Yoruba Audio Pronunciations',
        description: 'Authentic Nigerian pronunciation files',
        type: 'audio',
        size: '12 MB',
        essential: false,
        downloaded: false,
        url: '/api/offline/audio',
        icon: <FileText className="w-5 h-5" />
      },
      {
        id: 'learning-content',
        name: 'Learning Center Content',
        description: 'Ifá wisdom, Orisha profiles, and educational materials',
        type: 'database',
        size: '3.1 MB',
        essential: false,
        downloaded: false,
        url: '/api/offline/learning-content',
        icon: <FileText className="w-5 h-5" />
      },
      {
        id: 'complete-package',
        name: 'Complete Offline Package',
        description: 'Everything you need for full offline access',
        type: 'complete',
        size: '62.6 MB',
        essential: true,
        downloaded: false,
        url: '/api/offline/complete-package',
        icon: <HardDrive className="w-5 h-5" />
      }
    ];

    setOfflineResources(resources);
    checkStorageUsage();
    checkDownloadedResources();
  }, []);

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        toast({
          title: "Back Online",
          description: "Internet connection restored. You can now download new resources.",
        });
      } else {
        toast({
          title: "Offline Mode",
          description: "No internet connection. Using downloaded resources.",
          variant: "destructive",
        });
      }
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, [toast]);

  const checkStorageUsage = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        const usedMB = (estimate.usage || 0) / (1024 * 1024);
        setTotalStorageUsed(usedMB);
      } catch (error) {
        console.error('Storage estimate error:', error);
      }
    }
  };

  const checkDownloadedResources = () => {
    // Check which resources are already downloaded in localStorage/IndexedDB
    const updatedResources = offlineResources.map(resource => ({
      ...resource,
      downloaded: localStorage.getItem(`offline_${resource.id}`) === 'true'
    }));
    setOfflineResources(updatedResources);
  };

  const downloadResource = async (resourceId: string) => {
    const resource = offlineResources.find(r => r.id === resourceId);
    if (!resource || !isOnline) return;

    setIsDownloading(true);
    setDownloadProgress(prev => [...prev, { resourceId, progress: 0, status: 'downloading' }]);

    try {
      // Simulate progressive download with fetch
      const response = await fetch(resource.url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      const reader = response.body?.getReader();
      let received = 0;
      const chunks = [];

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          chunks.push(value);
          received += value.length;
          
          const progress = total > 0 ? Math.round((received / total) * 100) : 50;
          
          setDownloadProgress(prev => 
            prev.map(p => 
              p.resourceId === resourceId 
                ? { ...p, progress } 
                : p
            )
          );
          
          // Add small delay to show progress
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      // Store in localStorage (in real app, use IndexedDB for large files)
      const blob = new Blob(chunks);
      const data = await blob.text();
      localStorage.setItem(`offline_${resourceId}`, 'true');
      localStorage.setItem(`offline_data_${resourceId}`, data);

      // Update resource status
      setOfflineResources(prev => 
        prev.map(r => 
          r.id === resourceId 
            ? { ...r, downloaded: true } 
            : r
        )
      );

      setDownloadProgress(prev => 
        prev.map(p => 
          p.resourceId === resourceId 
            ? { ...p, status: 'completed' } 
            : p
        )
      );

      toast({
        title: "Download Complete",
        description: `${resource.name} is now available offline.`,
      });

      await checkStorageUsage();

    } catch (error) {
      setDownloadProgress(prev => 
        prev.map(p => 
          p.resourceId === resourceId 
            ? { ...p, status: 'error' } 
            : p
        )
      );

      toast({
        title: "Download Failed",
        description: `Failed to download ${resource.name}. ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAllEssential = async () => {
    const essentialResources = offlineResources.filter(r => r.essential && !r.downloaded);
    
    for (const resource of essentialResources) {
      await downloadResource(resource.id);
    }
  };

  const clearOfflineData = () => {
    offlineResources.forEach(resource => {
      localStorage.removeItem(`offline_${resource.id}`);
      localStorage.removeItem(`offline_data_${resource.id}`);
    });

    setOfflineResources(prev => 
      prev.map(r => ({ ...r, downloaded: false }))
    );

    toast({
      title: "Offline Data Cleared",
      description: "All downloaded resources have been removed.",
    });

    checkStorageUsage();
  };

  const getDownloadProgress = (resourceId: string) => {
    return downloadProgress.find(p => p.resourceId === resourceId);
  };

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isOnline ? (
            <Wifi className="w-6 h-6 text-green-500" />
          ) : (
            <WifiOff className="w-6 h-6 text-red-500" />
          )}
          <div>
            <h2 className="text-2xl font-bold">
              {isOnline ? 'Online Mode' : 'Offline Mode'}
            </h2>
            <p className="text-muted-foreground">
              {isOnline 
                ? 'Download resources for offline access' 
                : 'Using downloaded resources'}
            </p>
          </div>
        </div>
        
        <Badge variant={isOnline ? "default" : "secondary"} className="text-sm">
          Storage Used: {totalStorageUsed.toFixed(1)} MB
        </Badge>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 flex-wrap">
        <Button 
          onClick={downloadAllEssential}
          disabled={!isOnline || isDownloading}
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Essential Resources
        </Button>
        
        <Button 
          variant="outline" 
          onClick={clearOfflineData}
          disabled={isDownloading}
        >
          Clear Offline Data
        </Button>
      </div>

      {/* Offline Status Alert */}
      {!isOnline && (
        <Alert>
          <WifiOff className="h-4 w-4" />
          <AlertDescription>
            You're currently offline. Downloaded resources are available for use.
            Connect to the internet to download additional content.
          </AlertDescription>
        </Alert>
      )}

      {/* Resources List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offlineResources.map((resource) => {
          const progress = getDownloadProgress(resource.id);
          const isCurrentlyDownloading = progress?.status === 'downloading';
          
          return (
            <Card key={resource.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {resource.icon}
                    <div>
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {resource.size}
                        </Badge>
                        {resource.essential && (
                          <Badge variant="default" className="text-xs">
                            Essential
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {resource.downloaded ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : progress?.status === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <CardDescription>{resource.description}</CardDescription>
                
                {isCurrentlyDownloading && progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Downloading...</span>
                      <span>{progress.progress}%</span>
                    </div>
                    <Progress value={progress.progress} className="h-2" />
                  </div>
                )}
                
                <div className="flex gap-2">
                  {!resource.downloaded ? (
                    <Button
                      onClick={() => downloadResource(resource.id)}
                      disabled={!isOnline || isCurrentlyDownloading}
                      size="sm"
                      className="flex-1"
                    >
                      {isCurrentlyDownloading ? (
                        <>Downloading...</>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1" disabled>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Downloaded
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Storage Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5" />
            Storage Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span>Downloaded Resources:</span>
            <Badge variant="outline">
              {offlineResources.filter(r => r.downloaded).length} / {offlineResources.length}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Total Storage Used:</span>
            <Badge variant="outline">{totalStorageUsed.toFixed(1)} MB</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span>Essential Resources:</span>
            <Badge variant={
              offlineResources.filter(r => r.essential && r.downloaded).length === 
              offlineResources.filter(r => r.essential).length 
                ? "default" : "secondary"
            }>
              {offlineResources.filter(r => r.essential && r.downloaded).length} / {offlineResources.filter(r => r.essential).length}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}