import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function Component() {
  const id = useId();
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Textarea with button</Label>
      <Textarea id={id} placeholder="Leave a comment" />
      <Button variant="outline" className="w-full">
        Send
      </Button>
    </div>
  );
}
