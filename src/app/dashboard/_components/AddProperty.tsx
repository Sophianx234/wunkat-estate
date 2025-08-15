'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDashStore } from '@/lib/store';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

const roomSchema = z.object({
  houseId: z.string().min(1, 'Please select a house'),
  name: z.string().min(2, 'Room name must be at least 2 characters'),
  price: z.string().min(1, 'Price is required'),
  available: z.boolean(),
  description: z.string().optional(),
});

type RoomFormData = z.infer<typeof roomSchema>;
type HouseType = { _id: string; name: string };

export default function AddProperty() {
  const [houses, setHouses] = useState<HouseType[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { toggleAddProperty } = useDashStore();

  // Fetch houses
  useEffect(() => {
    async function fetchHouses() {
      try {
        const res = await fetch('/api/houses');
        const data = await res.json();
        setHouses(data);
      } catch {
        toast.error('Failed to fetch houses');
      }
    }
    fetchHouses();
  }, []);

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      houseId: '',
      name: '',
      price: '',
      available: true,
      description: '',
    },
  });

  // Click outside to close



  // Dropzone handler
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > 4) {
      toast.error('You can only upload up to 4 images.');
      return;
    }
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...acceptedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  }, [images]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  const onSubmit = async (data: RoomFormData) => {
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    images.forEach((file) => formData.append('images', file));

    try {
      const res = await fetch('/api/rooms', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Failed to add room');
      toast.success('Room added successfully!');
      toggleAddProperty();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <section ref={wrapperRef} className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mb-8 mx-auto mt-10 w-full">
      <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* House Name */}
          <FormField
            control={form.control}
            name="houseId"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>House Name</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a house" />
                  </SelectTrigger>
                  <SelectContent>
                    {houses.map(house => (
                      <SelectItem key={house._id} value={house._id}>
                        {house.name}
                      </SelectItem>
                    ))}
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
                  <Input placeholder="e.g. Master Bedroom" {...field} />
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
                <FormControl>
                  <Input type="number" placeholder="e.g. 1500" {...field} />
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
              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">Available</FormLabel>
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the room..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <div className="md:col-span-2">
            <FormLabel className='mb-2'>Upload Images (max 4)</FormLabel>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-md px-4 py-10 text-center cursor-pointer ${
                isDragActive ? 'border-black' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              <p className="text-gray-500">
                {isDragActive
                  ? 'Drop the images here...'
                  : 'Drag & drop up to 4 images, or click to select'}
              </p>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previews.map((src, index) => (
                  <img key={index} src={src} className="rounded-md w-full h-32 object-cover" />
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-2">
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto">
              {form.formState.isSubmitting ? 'Adding...' : 'Add Room'}
            </Button>
            <Button type="button" variant="secondary" onClick={toggleAddProperty} className="w-full md:w-auto">
              Cancel
            </Button>
          </div>

        </form>
      </Form>
    </section>
  );
}
