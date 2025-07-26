'use client';

import { useDashStore } from '@/lib/store';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type FormDataType = {
  title: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  price: string;
  sqft: string;
  description: string;
};

type InputType = {
            id: string,
            label: string,
            type: string,
            placeholder: string,
          }


export default function AddProperty() {
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    sqft: '',
    description: '',
  });

  const { toggleAddProperty } = useDashStore();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close component when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        toggleAddProperty();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleAddProperty]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const total = images.length + acceptedFiles.length;
      if (total > 4) {
        alert('You can only upload up to 4 images.');
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
    accept: { 'image/*': [] },
    multiple: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Images:', images);

    // Upload logic here
  };

  return (
    <section
      ref={wrapperRef}
      className="bg-white p-6 rounded-xl shadow-lg max-w-4xl mb-8 mx-auto mt-10 w-full"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Text Inputs */}
        {([
          {
            id: 'title',
            label: 'Title',
            type: 'text',
            placeholder: 'e.g. Modern Studio Apartment',
          },
          {
            id: 'location',
            label: 'Location',
            type: 'text',
            placeholder: 'e.g. East Legon, Accra',
          },
          { id: 'bedrooms', label: 'Bedrooms', type: 'number' },
          { id: 'bathrooms', label: 'Bathrooms', type: 'number' },
          {
            id: 'price',
            label: 'Price (GHS)',
            type: 'number',
            placeholder: 'e.g. 1500',
          },
          {
            id: 'sqft',
            label: 'Square Footage (sqft)',
            type: 'number',
            placeholder: 'e.g. 2400',
          },
        ] as InputType[]).map((input) => (
          <div className="flex flex-col" key={input.id}>
            <label
              htmlFor={input.id}
              className="mb-1 font-medium text-sm"
            >
              {input.label}
            </label>
            <input
              id={input.id}
              name={input.id}
              type={input.type}
              value={formData[input.id as keyof FormDataType]}
              onChange={handleChange}
              className="border rounded-md px-3 py-2"
              placeholder={input.placeholder || ''}
              required
            />
          </div>
        ))}

        {/* Description */}
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="description"
            className="mb-1 font-medium text-sm"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 min-h-[100px]"
            placeholder="Describe the property..."
            required
          />
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="mb-1 font-medium text-sm block">
            Upload Images (max 4)
          </label>
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

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {previews.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="rounded-md w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-2">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-900 w-full md:w-auto"
          >
            Add Property
          </button>
          <button
            type="button"
            onClick={toggleAddProperty}
            className="bg-gray-200 text-black px-6 py-2 rounded-md hover:bg-gray-300 w-full md:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
