import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export default function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<File> {
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
