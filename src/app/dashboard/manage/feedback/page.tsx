"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Trash2, Eye, MoreHorizontal, Filter, Search } from "lucide-react";

const MySwal = withReactContent(Swal);

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  // ✅ Fetch feedbacks from backend
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("/api/feedback");
        const data = await res.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.email.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || f.status === filter;
    return matchesSearch && matchesFilter;
  });

  // ✅ SweetAlert Toast config
  const showToast = (icon: "success" | "error", title: string) => {
    MySwal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: "#1e1e1e",
      color: "#fff",
    });
  };

  // ✅ Delete feedback
  const handleDelete = async () => {
    if (!feedbackToDelete) return;
    try {
      const res = await fetch(`/api/feedback/${feedbackToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete feedback");
      setFeedbacks(feedbacks.filter((f) => f._id !== feedbackToDelete));
      showToast("success", "Feedback deleted successfully");
    } catch (error) {
      showToast("error", "Error deleting feedback");
    } finally {
      setDeleteDialog(false);
      setFeedbackToDelete(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 bg-background min-h-screen"
    >
      <Card className="border border-border shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <CardTitle className="text-2xl font-bold">User Feedback</CardTitle>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter("All")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("New")}>
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("Reviewed")}>
                  Reviewed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedbacks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                    No feedback found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFeedbacks.map((feedback, index) => (
                  <TableRow key={feedback._id} className="hover:bg-muted/50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{feedback.name}</TableCell>
                    <TableCell>{feedback.email}</TableCell>
                    <TableCell>
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setSelectedFeedback(feedback)}
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setFeedbackToDelete(feedback._id);
                              setDeleteDialog(true);
                            }}
                            className="text-destructive flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Feedback Dialog */}
      <Dialog open={!!selectedFeedback} onOpenChange={() => setSelectedFeedback(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedFeedback?.name}</DialogTitle>
            <DialogDescription>
              <p className="text-sm text-muted-foreground">{selectedFeedback?.email}</p>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-3">
            <p className="text-sm leading-relaxed">{selectedFeedback?.message}</p>
            <p className="text-xs text-gray-500">
              Submitted on {new Date(selectedFeedback?.createdAt).toLocaleString()}
            </p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setSelectedFeedback(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Feedback</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this feedback? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
