import { useCallback, useState, type FormEvent } from 'react';

import type { NewPostValues } from '../../../types/newPostValues';

const EMPTY_VALUES: NewPostValues = { body: '', title: '' };

/**
 * Business hook of the new post form: keeps the typed values and clears them once the post is
 * created.
 * @param onSubmit - Creates the post; resolves to whether it was created.
 */
export const useNewPostForm = (onSubmit: (values: NewPostValues) => Promise<boolean>) => {
    const [values, setValues] = useState<NewPostValues>(EMPTY_VALUES);

    /**
     * @param field - Field that changed.
     * @param value - New value of the field.
     */
    const changeValue = useCallback((field: keyof NewPostValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
    }, []);

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            if (await onSubmit({ body: values.body.trim(), title: values.title.trim() })) {
                setValues(EMPTY_VALUES);
            }
        },
        [onSubmit, values],
    );

    return { changeValue, handleSubmit, values };
};
