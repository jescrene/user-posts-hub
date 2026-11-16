import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '@/test/renderWithProviders';

import PanelContainer from '../PanelContainer';

describe('PanelContainer', () => {
    it('is a region named by its title that announces its subtitle', () => {
        renderWithProviders(
            <PanelContainer subtitle="10 users" title="Users">
                <p>Content</p>
            </PanelContainer>,
        );

        const region = screen.getByRole('region', { name: 'Users' });
        expect(region).toHaveTextContent('Content');
        expect(screen.getByText('10 users')).toHaveAttribute('aria-live', 'polite');
    });
});
