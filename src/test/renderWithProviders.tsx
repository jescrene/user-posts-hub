import type { ReactElement } from 'react';
import { render } from '@testing-library/react';

import AppProviders from '@/providers/AppProviders';

/**
 * Renders a component inside the same providers the application uses.
 * @param ui - Element to render.
 */
export const renderWithProviders = (ui: ReactElement) => render(<AppProviders>{ui}</AppProviders>);
