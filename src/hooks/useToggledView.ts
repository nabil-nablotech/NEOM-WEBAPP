import { useState } from 'react';

export const useToggledView = () => {
    const [isfirstViewOpen, togglefirstViewOpen] = useState<boolean>(true)


    return {
        isfirstViewOpen,
        togglefirstViewOpen,
    }
}