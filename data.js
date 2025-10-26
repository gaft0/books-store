export const DataModule = (() => {
    const getBooks = () => {
        return fetch('https://68fe03f77c700772bb128a9a.mockapi.io/book')

        .then((response) => {
            if (!response.ok) {
                throw new Error('Error');
            }
            return response.json();
        })

        .catch((error) => {
            console.error('Fetch error', error);
            return [];
        });
    }

    return { getBooks };
})();