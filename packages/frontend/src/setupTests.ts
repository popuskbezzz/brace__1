import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('@twa-dev/sdk', () => ({
  default: {
    initData: '',
  },
}));
