/**
 * Centralized Sanity environment configuration.
 * Validates required public vars at runtime and exposes shared constants.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
);

/** Used by the Presentation tool and draft mode (optional, server-only). */
export const readToken = process.env.SANITY_API_READ_TOKEN;

/** Studio URL for stega / visual editing overlays. */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio';

function assertValue<T>(value: T | undefined, errorMessage: string): T {
  if (value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}
