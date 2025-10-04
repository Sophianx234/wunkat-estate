"use client";

import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useParams, useRouter } from "next/navigation";
import { FiDollarSign, FiDroplet } from "react-icons/fi";
import { IoBedOutline, IoImageOutline } from "react-icons/io5";
import Link from "next/link";
import { useDashStore } from "@/lib/store";

// ✅ Schema
const roomSchema = z.object({
  houseId: z.string().min(1, "Please select a house"),
  name: z.string().min(2, "Room name must be at least 2 characters"),
  price: z.string().min(1, "Price is required"),
  available: z.enum(["available", "pending"]),
  description: z.string().optional(),
  beds: z
    .string()
    .transform((val) => (val === "" ? undefined : Number(val)))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message: "Number of beds must be a non-negative number",
    })
    .optional(),
  baths: z
    .string()
    .transform((val) => (val === "" ? undefined : Number(val)))
    .refine((val) => val === undefined || (!isNaN(val) && val >= 0), {
      message: "Number of baths must be a non-negative number",
    })
    .optional(),
  planType: z.enum(["monthly", "yearly"], {
    required_error: "Please select a plan type",
  }),
});

type RoomFormData = z.infer<typeof roomSchema>;
type HouseType = { _id: string; name: string };

export type AddPropertyProps = {
  type?: "admin" | "user";
};

export default function AddProperty() {
  const [houses, setHouses] = useState<HouseType[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ SweetAlert Toast Config
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  // Fetch houses
  useEffect(() => {
    async function fetchHouses() {
      try {
        const res = await fetch("/api/houses");
        const data = await res.json();
        setHouses(data);
      } catch {
        Toast.fire({ icon: "error", title: "Failed to fetch houses" });
      }
    }
    fetchHouses();
  }, []);

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      houseId: "",
      name: "",
      price: "",
      available: "",
      description: "",
      beds: undefined,
      baths: undefined,
      planType: "monthly",
    },
  });

  // Dropzone
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length + acceptedFiles.length > 4) {
        Toast.fire({
          icon: "error",
          title: "You can only upload up to 4 images",
        });
        return;
      }

      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prev) => [...prev, ...acceptedFiles]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Submit
  const onSubmit = async (data: RoomFormData) => {
    if (images.length === 0) {
      Toast.fire({ icon: "error", title: "Please upload at least one image" });
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    images.forEach((file) => formData.append("images", file));

    try {
      const res = await fetch("/api/rooms", { method: "POST", body: formData });

      if (!res.ok) {
        throw new Error("Failed to add room");
      }

      Toast.fire({
        icon: "success",
        title: "Room added successfully!",
      });

      router.push("/dashboard/manage/rooms");
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  return (
    <section
      ref={wrapperRef}
      className="p-6 rounded-xl max-w-5xl mx-auto mt-10 w-full"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="shadow-sm px-3 py-5 bg-white rounded-lg ">
            <h2 className=" font-semibold mb-2 pl-2">Property Information</h2>

            {/* IMAGE UPLOAD */}
            <div className="border-2 border-dashed rounded-xl  p-10 text-center">
              <div
                {...getRootProps()}
                className="cursor-pointer flex flex-col items-center justify-center space-y-2"
              >
                <input {...getInputProps()} />
                <IoImageOutline className="text-4xl text-gray-400" />
                <p className="text-gray-500">
                  {isDragActive
                    ? "Drop the images here..."
                    : "Drop your images here, or click to browse"}
                </p>
                <span className="text-xs text-gray-400">
                  (max 4 images, PNG/JPG/GIF)
                </span>
              </div>
            </div>
          </div>
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {previews.map((src, index) => (
                <img
                  alt=""
                  key={index}
                  src={src}
                  className="rounded-md w-full h-32 object-cover"
                />
              ))}
            </div>
          )}

          {/* PROPERTY INFO */}
          <div className="shadow bg-white px-4 py-3 pt-5 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* House */}
              <FormField
                control={form.control}
                name="houseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Name</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={"Select a house"} />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.isArray(houses) && houses.length > 0 ? (
                          houses.map((house) => (
                            <SelectItem key={house._id} value={house._id}>
                              {house.name}
                            </SelectItem>
                          ))
                        ) : (
                          <p className="text-gray-500 px-2">
                            No houses available
                          </p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Room Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${"e.g. Master Bedroom"}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (GHS)</FormLabel>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        type="number"
                        placeholder={`${"1500"}`}
                        {...field}
                        className="pl-9"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Beds */}
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Beds</FormLabel>
                    <div className="relative">
                      <IoBedOutline className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        type="number"
                        placeholder={`${"2"}`}
                        {...field}
                        className="pl-9"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Baths */}
              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Baths</FormLabel>
                    <div className="relative">
                      <FiDroplet className="absolute left-3 top-3 text-gray-400" />
                      <Input
                        type="number"
                        placeholder={`${"1"}`}
                        {...field}
                        className="pl-9"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="planType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plan Type</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`${"Select a plan"}`} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Available */}
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pt-4">Property Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`${"Enter property details..."}`}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end items-center pt-4 gap-4">
              <Link
                href="/dashboard/properties"
                className="border border-gray-500 py-1 rounded-sm px-3"
              >
                Cancel
              </Link>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adding..." : "Add Property"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
