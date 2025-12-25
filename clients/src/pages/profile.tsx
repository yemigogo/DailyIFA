import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      age: user?.age || 12, // Defaults to Isaiah's age if not set
      year: user?.year || 2025
    }
  });

  const onSubmit = async (data: any) => {
    try {
      await apiRequest("PATCH", "/api/user", data);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({ 
        title: "Profile Updated", 
        description: "Your age and reading year have been saved." 
      });
    } catch (error) {
      toast({ 
        title: "Update Failed", 
        description: "Could not save your profile changes.", 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <Card className="border-amber-200 shadow-lg">
        <CardHeader className="bg-amber-50/50">
          <CardTitle className="text-amber-900">Spiritual Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age">User Age</Label>
              <Input 
                id="age"
                type="number" 
                {...register("age", { valueAsNumber: true })} 
                placeholder="Enter age (e.g., 12 for Isaiah)"
              />
              <p className="text-xs text-muted-foreground italic">
                This age determines if you receive Youth, Adult, or Elder guidance.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Current Reading Year</Label>
              <Input 
                id="year"
                type="number" 
                {...register("year", { valueAsNumber: true })} 
                placeholder="2025"
              />
              <p className="text-xs text-muted-foreground italic">
                Used for your annual spiritual cycle.
              </p>
            </div>

            <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors">
              Save Profile & Update Readings
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}