import { createContext, useContext, useState, ReactNode } from 'react';

interface ImageLoadContextType {
    heroLoaded: boolean;
    setHeroLoaded: (loaded: boolean) => void;
}

const ImageLoadContext = createContext<ImageLoadContextType>({
    heroLoaded: false,
    setHeroLoaded: () => { },
});

export function ImageLoadProvider({ children }: { children: ReactNode }) {
    const [heroLoaded, setHeroLoaded] = useState(false);

    return (
        <ImageLoadContext.Provider value={{ heroLoaded, setHeroLoaded }}>
            {children}
        </ImageLoadContext.Provider>
    );
}

export function useImageLoad() {
    return useContext(ImageLoadContext);
}
