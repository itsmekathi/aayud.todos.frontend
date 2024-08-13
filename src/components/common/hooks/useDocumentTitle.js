import { useEffect } from 'react';

export default function useDocumentTitle(title) {
    useEffect(() => {
        document.title = title;
    }, [title]); // This effect will re-run only if title changes
}