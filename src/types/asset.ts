'use client';

import { z } from 'zod';

export const AssetCategoryEnum = z.enum([
  'MACHINERY',
  'LIVESTOCK',
  'STRUCTURE',
  'GARDEN',
  'TOOL',
]);

export const MaintenanceLogSchema = z.object({
  id: z.string().uuid(),
  performedAt: z.date(),
  description: z.string().min(3, 'Description must be at least 3 characters long'),
  cost: z.number().nonnegative('Cost cannot be a negative value'),
  technician: z.string().optional(),
});

export const AssetSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Asset name must be at least 2 characters long'),
  category: AssetCategoryEnum,
  location: z.string(),
  acquiredAt: z.date(),
  status: z.enum(['ACTIVE', 'MAINTENANCE', 'RETIRED']),
  maintenanceHistory: z.array(MaintenanceLogSchema).default([]),
});

export type AssetCategory = z.infer<typeof AssetCategoryEnum>;
export type MaintenanceLog = z.infer<typeof MaintenanceLogSchema>;
export type Asset = z.infer<typeof AssetSchema>;

export const CreateAssetSchema = AssetSchema.omit({
  id: true,
  maintenanceHistory: true,
});

export type CreateAssetInput = z.infer<typeof CreateAssetSchema>;
