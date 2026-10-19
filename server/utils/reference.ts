import { customAlphabet } from 'nanoid';

// Generates reference codes like EC-2026-A8F2
export function generateEnquiryNumber(): string {
  const year = new Date().getFullYear();
  // Safe alphanumeric characters avoiding ambiguous 0/O, 1/I
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomSuffix = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomSuffix += chars[randomIndex];
  }
  return `EC-${year}-${randomSuffix}`;
}
