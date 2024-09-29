import { FileUploaded } from '@/app/api/types/chat.ts';

export const imagesTypes = ['webp', 'png', 'jpeg', 'jpg', 'gif'];

export const isFileIsImage = (file: FileUploaded): boolean => {
  const {
    data: { type },
  } = file;
  if (!type) return false;
  for (const elem of imagesTypes) {
    if (type.slice(type.indexOf('/') + 1, type.length).toLowerCase() === elem) return true;
  }
  return false;
};
