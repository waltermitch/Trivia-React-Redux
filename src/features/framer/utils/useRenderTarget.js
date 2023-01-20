import { useMemo } from 'react';
import { RenderTarget } from 'framer';

export function useRenderTarget() {
    return useMemo(() => RenderTarget.current()
    , []);
}

export function useIsInPreview() {
    return useMemo(() => RenderTarget.current() === RenderTarget.preview
    , []);
}

export function useIsOnCanvas() {
    return useMemo(() => RenderTarget.current() === RenderTarget.canvas
    , []);
}
