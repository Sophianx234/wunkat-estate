'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useDashStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { z } from 'zod';
import Swal from 'sweetalert2';

export const ghanaRegions = [
  'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra',
  'North East', 'Northern', 'Oti', 'Savannah', 'Upper East', 'Upper West',
  'Volta', 'Western', 'Western North',
];

// ✅ Zod schema
const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  region: z.enum(ghanaRegions as [string, ...string[]], {
    errorMap: () => ({ message: 'Please select a valid region' }),
  }),
  country: z.string().min(1, 'Country is required'),
});

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  location: locationSchema,
  amenities: z.string().optional(),
  smartLockSupport: z.boolean(),
  lockStatus: z.enum(['locked', 'unlocked']).optional(),
});

type FormDataType = z.infer<typeof formSchema>;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export default function EditHouse() {
  const [loading, setLoading] = useState(true);
  const { toggleAddHouse } = useDashStore();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { id } = useParams(); // ✅ fetch id from URL
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormDataType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      location: { address: '', city: '', region: ghanaRegions[0], country: 'Ghana' },
      amenities: '',
      smartLockSupport: false,
      lockStatus: 'locked',
    },
  });

  const smartLockEnabled = watch('smartLockSupport');

  // ✅ Fetch house on mount
  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await fetch(`/api/houses/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch house');
        const data = await res.json();
        console.log('House data:', data);

        reset({
          name: data.name,
          description: data.description || '',
          location: {
            address: data.location?.address || '',
            city: data.location?.city || '',
            region: data.location?.region || ghanaRegions[0],
            country: data.location?.country || 'Ghana',
          },
          amenities: data.amenities?.join(', ') || '',
          smartLockSupport: data.smartLockSupport || false,
          lockStatus: data.lockStatus || 'locked',
        });
      } catch (err) {
        console.error(err);
        Toast.fire({ icon: 'error', title: 'Failed to load house details' });
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHouse();
  }, [id, reset]);

  // ✅ Submit updated house
  const onSubmit = async (data: FormDataType) => {
    console.log('Updating with data:', data);
    const payload = {
      ...data,
      amenities: data.amenities
        ? data.amenities.split(',').map((a) => a.trim())
        : [],
      lockStatus: data.smartLockSupport ? data.lockStatus : undefined,
    };

    
    // Show loading toast
    Toast.fire({ icon: 'info', title: 'Updating house...', didOpen: () => Swal.showLoading() });

    try {
      const res = await fetch(`/api/houses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update');

      Toast.fire({ icon: 'success', title: 'House updated successfully!' });
      router.push('/dashboard/manage/houses'); // ✅ redirect after update
    } catch {
      Toast.fire({ icon: 'error', title: 'Failed to update house' });
    }
  };

  if(loading){
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  }
  return (
    <section ref={wrapperRef} className="rounded-xl h-full ml-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
        <div className="bg-white mt-10 p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col md:col-span-2">
            <h2 className="text-base font-semibold mb-5">
              Edit House Information
            </h2>
            <label className="mb-1 font-medium text-sm">Name</label>
            <input
              {...register('name')}
              className={`border rounded-md px-3 py-2 ${
                errors.name ? 'border-red-500' : ''
              }`}
              placeholder="e.g. Sunset Villa"
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
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
            />
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">City</label>
            <input
              {...register('location.city')}
              className={`border rounded-md px-3 py-2 ${
                errors.location?.city ? 'border-red-500' : ''
              }`}
            />
          </div>

          {/* Region */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-sm">Region</label>
            <Controller
              control={control}
              name="location.region"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`w-full border rounded-md px-3 py-2 h-10 justify-between ${
                      errors.location?.region ? 'border-red-500' : ''
                    }`}
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
        </div>

        {/* Amenities + Description */}
        <div className="bg-white mt-2 p-6 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium text-sm">Amenities</label>
            <input
              {...register('amenities')}
              className="border rounded-md px-3 py-2"
              placeholder="e.g. Pool, WiFi, Parking"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label className="mb-1 font-medium text-sm">Description</label>
            <textarea
              {...register('description')}
              className="border rounded-md px-3 py-2 min-h-[80px]"
              placeholder="Describe the house..."
            />
          </div>

          {/* Smart Lock */}
          <div className="flex items-center gap-3 md:col-span-2 mt-2">
            <Label htmlFor="smartLockSupport">Support Smart Lock</Label>
            <Controller
              control={control}
              name="smartLockSupport"
              render={({ field }) => (
                <Switch
                  id="smartLockSupport"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Lock Status */}
          {smartLockEnabled && (
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium text-sm">
                Default Lock Status
              </label>
              <Controller
                control={control}
                name="lockStatus"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full border rounded-md px-3 py-2 h-10 justify-between">
                      <SelectValue placeholder="Select lock status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="locked">Locked</SelectItem>
                      <SelectItem value="unlocked">Unlocked</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-4 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update House'}
            </button>
            <button
              type="button"
              onClick={toggleAddHouse}
              className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <Toaster position="bottom-right" />
    </section>
  );
}
