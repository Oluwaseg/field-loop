'use client';

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from '@/sanity/env';
import { schemaTypes } from '@/sanity/schemaTypes';
import { structure } from '@/sanity/structure';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  name: 'field-loop',
  title: 'FieldLoop CMS',
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({ structure }),
    ...(isDev ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
});
