import { useCallback, useMemo, useState, type FormEvent } from 'react';

import type { NewPostValues } from '../../../types/newPostValues';
import { validateNewPost, type NewPostErrors } from '../../../utils/validateNewPost';

type TouchedFields = Record<keyof NewPostValues, boolean>;

const EMPTY_VALUES: NewPostValues = { body: '', title: '' };
const UNTOUCHED: TouchedFields = { body: false, title: false };

/**
 * Business hook of the new post form: keeps the typed values, validates them and clears them
 * once the post is created. A field shows its error only after the person leaves it or tries to
 * publish, so the form does not complain while it is being filled in.
 * @param params.onSubmit - Creates the post; resolves to whether it was created.
 * @param params.submitting - Whether the post is being sent, so it is not sent twice.
 */
export const useNewPostForm = ({
    onSubmit,
    submitting,
}: {
    onSubmit: (values: NewPostValues) => Promise<boolean>;
    submitting: boolean;
}) => {
    const [values, setValues] = useState<NewPostValues>(EMPTY_VALUES);
    const [touched, setTouched] = useState<TouchedFields>(UNTOUCHED);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const errors = useMemo(() => validateNewPost(values), [values]);

    /** Errors of the fields the person already left, or of every field after a submit attempt. */
    const visibleErrors = useMemo<NewPostErrors>(
        () => ({
            body: submitAttempted || touched.body ? errors.body : undefined,
            title: submitAttempted || touched.title ? errors.title : undefined,
        }),
        [errors, submitAttempted, touched],
    );

    /**
     * @param field - Field that changed.
     * @param value - New value of the field.
     */
    const changeValue = useCallback((field: keyof NewPostValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
    }, []);

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
