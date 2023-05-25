import {useState} from "react";

export const useFetch = (callback) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetch = async () => {
        try {
            setError('');
            setLoading(true);
            await callback();
        } catch (e) {
            const error = typeof e === 'object' ? e.message : e;
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return [fetch, loading, error];
};
