import { describe, expect, it } from 'vitest';

import { parseApiEnvelope } from '@/shared/api/httpClient';
import { ApiError, type ApiEnvelope } from '@/shared/api/types';

describe('httpClient parseApiEnvelope', () => {
  it('returns payload when data exists', () => {
    const envelope: ApiEnvelope<{ status: string }> = {
      data: { status: 'ok' },
      error: null,
      pagination: {
        page: 1,
        page_size: 20,
        total: 40,
        pages: 2,
      },
    };

    const parsed = parseApiEnvelope(envelope);
    expect(parsed.data.status).toBe('ok');
    expect(parsed.pagination?.total).toBe(40);
  });

  it('throws ApiError when backend error returned', () => {
    const envelope: ApiEnvelope<null> = {
      data: null,
      error: { type: 'validation_error', message: 'Bad data' },
      pagination: null,
    };

    expect(() => parseApiEnvelope(envelope)).toThrow(ApiError);
  });

  it('throws when data is null but no error', () => {
    const envelope: ApiEnvelope<null> = {
      data: null,
      error: null,
      pagination: null,
    };

    expect(() => parseApiEnvelope(envelope)).toThrowError('Empty response payload');
  });
});
