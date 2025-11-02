import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function getCroppedImg(
  imageSrc: string,
  pixelCrop: PixelCrop
): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Canvas not supported"));
        return;
      }

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg");
    };
    image.onerror = () => reject(new Error("Image load error"));
  });
}


export function formatNumber(num: number): string {
  return num.toLocaleString("en-US"); 
}

export function formatDate(isoString: Date): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US"); 
}

// Example
// 👉 "10/20/2025"

export function daysLeft(targetDate: string | Date): number {
  const now = new Date();
  const end = new Date(targetDate);

  // difference in ms
  const diff = end.getTime() - now.getTime();

  // convert ms → days
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

// Example
daysLeft("2025-10-20T22:56:51.836Z"); 
// 👉 e.g. 27 (depending on today's date)

export function formatToShortDate(isoString: string | Date): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Example
formatToShortDate("2024-03-21T10:00:00.000Z");
// 👉 "21 Mar 2024"

export function removeUnderscores(input: string): string {
  return input.replace(/_/g, " ");
}

// usage


export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return Math.max(1, diffDays)
}

export function getImageUrl(path: string): string {
  if (path.startsWith("http")) return path
  // return `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(path)}`
  return path
}

