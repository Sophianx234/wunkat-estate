// CreateNotificationDialog.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { Bell } from "lucide-react";

export function CreateNotificationDialog({ onCreate }: { onCreate: (n: any) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "system",
    audience: "all",
    sendEmail: false,
  });

  const handleCreate = () => {
    if (!form.title || !form.message) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields.",
      });
      return;
    }

    onCreate({
      _id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString(),
    });

    setForm({ title: "", message: "", type: "system", audience: "all", sendEmail: false });
    setOpen(false);

    Swal.fire({
      icon: "success",
      title: "Notification Created",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2"><Bell className="text-white" />Create Notification</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle> Create New Notification</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Input
            placeholder="Notification Title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />

          <Textarea
            placeholder="Notification Message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          />

          <div className="flex items-center justify-between gap-2">
            <Select
              value={form.type}
              onValueChange={(v) => setForm((p) => ({ ...p, type: v }))}
            >
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="booking">Booking</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={form.audience}
              onValueChange={(v) => setForm((p) => ({ ...p, audience: v }))}
            >
              <SelectTrigger><SelectValue placeholder="Audience" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="user">Tenants</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-start gap-2 mt-3">
            <input
              type="checkbox"
              checked={form.sendEmail}
              onChange={(e) => setForm((p) => ({ ...p, sendEmail: e.target.checked }))}
              className="mt-1 accent-primary"
            />
            <label className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              Also send via email
            </label>
          </div>

          {form.sendEmail && (
            <p className="text-xs text-muted-foreground bg-muted/40 p-2 rounded-md border border-muted mt-1">
          When enabled, this notification will also be delivered via email to all
          selected recipients. Depending on your email settings, delivery might
          take a few seconds.
        </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
