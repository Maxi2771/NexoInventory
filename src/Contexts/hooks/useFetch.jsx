import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);     
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        setLoading(true);

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("La respuesta no fue exitosa");
                }
                return response.json();
            })

            .then((data) => {
                setData(data);
            })

            .catch((error) => {
                setError(error);
            })

            .finally(() => {
                setLoading(false);
            });

    }, [url]);

    return { data, loading, error };
}
