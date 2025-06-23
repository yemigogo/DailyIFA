import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, Star, StarOff, BookOpen, Edit, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { getQueryFn, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/date-utils";
import type { DivinationLogWithOdu, DivinationLog } from "@shared/schema";
import OduTraditionalImage from "./odu-traditional-image";

export default function DivinationLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<DivinationLog | null>(null);
  const { ts } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: logs, isLoading } = useQuery({
    queryKey: ["/api/divination-logs"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const createLogMutation = useMutation({
    mutationFn: async (logData: any) => {
      return await apiRequest("POST", "/api/divination-logs", logData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/divination-logs"] });
      setIsCreateOpen(false);
      toast({
        title: ts("Log Saved", "Àkọsílẹ̀ Ti Pamọ́"),
        description: ts("Your divination log has been saved successfully.", "A ti fi àkọsílẹ̀ àfọ̀ṣẹ rẹ pamọ́ dáadáa."),
      });
    },
    onError: () => {
      toast({
        title: ts("Error", "Àṣìṣe"),
        description: ts("Failed to save log. Please try again.", "Kò lè pamọ́ àkọsílẹ̀. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan sí i."),
        variant: "destructive",
      });
    },
  });

  const updateLogMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return await apiRequest("PUT", `/api/divination-logs/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/divination-logs"] });
      setEditingLog(null);
      toast({
        title: ts("Log Updated", "Àkọsílẹ̀ Ti Ṣe Àtúnṣe"),
        description: ts("Your divination log has been updated.", "A ti ṣe àtúnṣe àkọsílẹ̀ àfọ̀ṣẹ rẹ."),
      });
    },
  });

  const deleteLogMutation = useMutation({
    mutationFn: async (id: number) => {
      return await apiRequest("DELETE", `/api/divination-logs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/divination-logs"] });
      toast({
        title: ts("Log Deleted", "Àkọsílẹ̀ Ti Pajẹ"),
        description: ts("Your divination log has been deleted.", "A ti pa àkọsílẹ̀ àfọ̀ṣẹ rẹ jẹ."),
      });
    },
  });

  const toggleStarMutation = useMutation({
    mutationFn: async ({ id, starred }: { id: number; starred: boolean }) => {
      return await apiRequest("PUT", `/api/divination-logs/${id}`, { starred });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/divination-logs"] });
    },
  });

  const filteredLogs = (logs as DivinationLogWithOdu[] || []).filter(log =>
    log.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.context?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.odu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const LogForm = ({ log, onSubmit }: { log?: DivinationLog; onSubmit: (data: any) => void }) => {
    const [formData, setFormData] = useState({
      question: log?.question || "",
      context: log?.context || "",
      interpretation: log?.interpretation || "",
      outcome: log?.outcome || "",
      tags: log?.tags?.join(", ") || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="question">{ts("Question Asked", "Ìbéèrè Tí A Béèrè")}</Label>
          <Input
            id="question"
            value={formData.question}
            onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
            placeholder={ts("What did you ask about?", "Kí ni o béèrè nípa rẹ̀?")}
          />
        </div>

        <div>
          <Label htmlFor="context">{ts("Life Context", "Ìpò Ayé")}</Label>
          <Textarea
            id="context"
            value={formData.context}
            onChange={(e) => setFormData(prev => ({ ...prev, context: e.target.value }))}
            placeholder={ts("What was happening in your life?", "Kí ni ń ṣẹlẹ̀ nínú ayé rẹ?")}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="interpretation">{ts("Your Interpretation", "Ìtumọ̀ Rẹ")}</Label>
          <Textarea
            id="interpretation"
            value={formData.interpretation}
            onChange={(e) => setFormData(prev => ({ ...prev, interpretation: e.target.value }))}
            placeholder={ts("How did you interpret the reading?", "Báwo ni o ṣe túmọ̀ kíka náà?")}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="outcome">{ts("Actual Outcome", "Èsì Gangan")}</Label>
          <Textarea
            id="outcome"
            value={formData.outcome}
            onChange={(e) => setFormData(prev => ({ ...prev, outcome: e.target.value }))}
            placeholder={ts("What actually happened?", "Kí ni ó ṣẹlẹ̀ gangan?")}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="tags">{ts("Tags", "Àwọn Àmì") + " (" + ts("comma separated", "pín pẹ̀lú kọ́ńmà") + ")"}</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder={ts("love, career, family", "ìfẹ́, iṣẹ́, ìdílé")}
          />
        </div>

        <Button type="submit" className="w-full">
          {log ? ts("Update Log", "Ṣe Àtúnṣe Àkọsílẹ̀") : ts("Save Log", "Pamọ́ Àkọsílẹ̀")}
        </Button>
      </form>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100">
          {ts("Divination Logs", "Àwọn Àkọsílẹ̀ Àfọ̀ṣẹ")}
        </h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              {ts("New Log", "Àkọsílẹ̀ Tuntun")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{ts("Create New Divination Log", "Ṣẹ̀dá Àkọsílẹ̀ Àfọ̀ṣẹ Tuntun")}</DialogTitle>
            </DialogHeader>
            <LogForm onSubmit={(data) => createLogMutation.mutate(data)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={ts("Search logs...", "Wa àwọn àkọsílẹ̀...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredLogs.map((log) => (
          <Card key={log.id} className="bg-white dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <OduTraditionalImage
                    oduName={log.odu.name}
                    pattern={log.odu.pattern}
                    size={60}
                  />
                  <div className="flex-1">
                    <CardTitle className="text-amber-900 dark:text-amber-100 text-lg">
                      {log.odu.name}
                    </CardTitle>
                    <p className="text-sm text-amber-700 dark:text-amber-300 italic">
                      {log.odu.nameYoruba}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-amber-600 dark:text-amber-400">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(new Date(log.date))}
                      </span>
                      {log.question && (
                        <span className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {ts("Question", "Ìbéèrè")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStarMutation.mutate({ id: log.id, starred: !log.starred })}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    {log.starred ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingLog(log)}
                    className="text-amber-600 hover:text-amber-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteLogMutation.mutate(log.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {log.question && (
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    {ts("Question:", "Ìbéèrè:")}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{log.question}</p>
                </div>
              )}

              {log.context && (
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    {ts("Context:", "Ìpò:")}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{log.context}</p>
                </div>
              )}

              {log.interpretation && (
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    {ts("Interpretation:", "Ìtumọ̀:")}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{log.interpretation}</p>
                </div>
              )}

              {log.outcome && (
                <div>
                  <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                    {ts("Outcome:", "Èsì:")}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{log.outcome}</p>
                </div>
              )}

              {log.tags && log.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {log.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredLogs.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {ts("No divination logs found.", "Ko sí àkọsílẹ̀ àfọ̀ṣẹ kankan.")}
            </p>
          </Card>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingLog} onOpenChange={() => setEditingLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{ts("Edit Divination Log", "Ṣe Àtúnṣe Àkọsílẹ̀ Àfọ̀ṣẹ")}</DialogTitle>
          </DialogHeader>
          {editingLog && (
            <LogForm
              log={editingLog}
              onSubmit={(data) => updateLogMutation.mutate({ id: editingLog.id, data })}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}