import { useCallback, useMemo, useState, type FormEvent } from 'react';

import { useUiTexts } from '@/hooks/useUiTexts';

import { newPostFormUiTexts } from '../../../constants/newPostFormUiTexts';
import type { NewPostValues } from '../../../types/newPostValues';
import { validateNewPost } from '../../../utils/validateNewPost';

type TouchedFields = Record<keyof NewPostValues, boolean>;

const EMPTY_VALUES: NewPostValues = { body: '', title: '' };
const UNTOUCHED: TouchedFields = { body: false, title: false };

interface UseNewPostFormParams {
    /** Creates the post; resolves to whether it was created. */
    onSubmit: (values: NewPostValues) => Promise<boolean>;
    /** Whether the post is being sent, so it is not sent twice. */
    submitting: boolean;
    /** Called when a field changes. */
    onEdit: () => void;
}

/**
 * Business hook of the new post form: keeps the typed values, validates them and clears them
 * once the post is created. A field shows its error only after the person leaves it or tries to
 * publish, so the form does not complain while it is being filled in.
 */
export const useNewPostForm = ({ onEdit, onSubmit, submitting }: UseNewPostFormParams) => {
    const [values, setValues] = useState<NewPostValues>(EMPTY_VALUES);
    const [touched, setTouched] = useState<TouchedFields>(UNTOUCHED);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const texts = useUiTexts(newPostFormUiTexts);
    const errors = useMemo(() => validateNewPost(values), [values]);

    /**
     * Messages of the fields the person already left, or of every field after a submit attempt,
     * in the language of the interface.
     */
    const visibleErrors = useMemo<Partial<Record<keyof NewPostValues, string>>>(
        () => ({
            body: (submitAttempted || touched.body) && errors.body ? texts.bodyRequired : undefined,
            title:
                (submitAttempted || touched.title) && errors.title
                    ? texts.titleRequired
                    : undefined,
        }),
        [errors, submitAttempted, texts, touched],
    );

    /**
     * @param field - Field that changed.
     * @param value - New value of the field.
     */
    const changeValue = useCallback(
        (field: keyof NewPostValues, value: string) => {
            setValues((current) => ({ ...current, [field]: value }));
            onEdit();
        },
        [onEdit],
    );

    /**
     * @param field - Field the person left.
     */
    const touchField = useCallback((field: keyof NewPostValues) => {
        setTouched((current) => ({ ...current, [field]: true }));
    }, []);

    const handleSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (submitting) return;
            setSubmitAttempted(true);

            if (Object.keys(errors).length > 0) return;

            if (await onSubmit({ body: values.body.trim(), title: values.title.trim() })) {
                setValues(EMPTY_VALUES);
                setTouched(UNTOUCHED);
                setSubmitAttempted(false);
            }
        },
        [errors, onSubmit, submitting, values],
    );

    return { changeValue, errors: visibleErrors, handleSubmit, touchField, values };
};
