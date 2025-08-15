'use client';

import { useEffect, useRef } from 'react';
import { useDashStore } from '@/lib/store';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// shadcn/ui


const ghanaRegions = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra',
  'North East', 'Northern', 'Oti', 'Savannah', 'Upper East', 'Upper West',
  'Volta', 'Western', 'Western North',
];

// Zod schema
const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  region: z.enum(ghanaRegions as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid region' }),
  }),
  country: z.string().default('Ghana'),
});

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  location: locationSchema,
  amenities: z.string().optional(),
});

type FormDataType = z.infer<typeof formSchema>;

export default function AddHouse() {
  const { toggleAddHouse } = useDashStore();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      location: { address: '', city: '', region: '', country: 'Ghana' },
      amenities: '',
    },
  });

  // Close form on outside click
  useEffect(() => {
  const handleClickOutside = (event: PointerEvent) => {
    const target = event.target as Element;

    // If click is inside wrapper → do nothing
    if (wrapperRef.current?.contains(target)) return;

    // If click is inside Radix SelectContent → do nothing
    if (target.closest("[data-radix-select-content]")) return;

    // Otherwise → close
    toggleAddHouse();
  };

  document.addEventListener("pointerdown", handleClickOutside);
  return () => document.removeEventListener("pointerdown", handleClickOutside);
}, [toggleAddHouse]);

  const onSubmit = async (data: FormDataType) => {
    const payload = {
      ...data,
      amenities: data.amenities ? data.amenities.split(',').map((a) => a.trim()) : [],
    };

    const toastId = toast.loading('Adding house...');
    try {
      const res = await fetch('/api/houses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed');

      toast.success('House added successfully!', { id: toastId });
      reset();
      toggleAddHouse();
    } catch {
      toast.error('Failed to add house', { id: toastId });
    }
  };

  return (
    <section
      ref={wrapperRef}
      className="bg-white p-6 mb-8 rounded-xl shadow-lg max-w-3xl mx-auto mt-10 w-full"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New House</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-sm">House Name</label>
          <input
            {...register('name')}
            className={`border rounded-md px-3 py-2 ${errors.name ? 'border-red-500' : ''}`}
            placeholder="e.g. Sunset Villa"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-sm">Description</label>
          <textarea
            {...register('description')}
            className="border rounded-md px-3 py-2 min-h-[80px]"
            placeholder="Describe the house..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Address</label>
          <input
            {...register('location.address')}
            className={`border rounded-md px-3 py-2 ${
              errors.location?.address ? 'border-red-500' : ''
            }`}
            aria-invalid={!!errors.location?.address}
          />
          {errors.location?.address && (
            <p className="text-red-500 text-sm">{errors.location.address.message}</p>
          )}
        </div>

        {/* City */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">City</label>
          <input
            {...register('location.city')}
            className={`border rounded-md px-3 py-2 ${
              errors.location?.city ? 'border-red-500' : ''
            }`}
            aria-invalid={!!errors.location?.city}
          />
          {errors.location?.city && (
            <p className="text-red-500 text-sm">{errors.location.city.message}</p>
          )}
        </div>

        {/* Region (shadcn Select) */}
        <div className="flex flex-col md:col-span-1">
          <label className="mb-1 font-medium text-sm">Region</label>
          <Controller
            control={control}
            name="location.region"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  className={`w-full border rounded-md px-3 py-2 h-10 justify-between ${
                    errors.location?.region ? 'border-red-500' : ''
                  }`}
                  aria-invalid={!!errors.location?.region}
                >
                  <SelectValue placeholder="Select a Region" />
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {ghanaRegions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.location?.region && (
            <p className="text-red-500 text-sm">{errors.location.region.message}</p>
          )}
        </div>

        {/* Country */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-sm">Country</label>
          <input
            {...register('location.country')}
            className="border rounded-md px-3 py-2 bg-gray-50"
            readOnly
          />
        </div>

        {/* Amenities */}
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-sm">Amenities</label>
          <input
            {...register('amenities')}
            className="border rounded-md px-3 py-2"
            placeholder="e.g. Pool, WiFi, Parking"
          />
          <small className="text-gray-500">Separate multiple amenities with commas</small>
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add House'}
          </button>
          <button
            type="button"
            onClick={toggleAddHouse}
            className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
      {/* If you already mount <Toaster /> in your root layout, you can remove this */}
      <Toaster />
    </section>
  );
}
