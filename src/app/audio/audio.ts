import { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';

const events = ['mousedown', 'touchstart'];

export function useInteraction() {
    const [ready, setReady] = useState(false);

    const listener = () => {
        if (!ready) {
            setReady(true);
        }
    };

    useEffect(() => {
        events.forEach((event) => {
            document.addEventListener(event, listener);
        });

        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, listener);
            });
        };
    }, []);

    return ready;
}

export default function useAudio(soundPath: string) {
    const [audio, setAudio] = useState<Howl>();

    const interacted = useInteraction();

    useEffect(() => {
        function createAudioContext() {
            setAudio(new Howl({src: soundPath}));
        }

        createAudioContext();

        return () => {
            if (audio) {
                audio.unload();
            }
        };
    }, [soundPath]);

    return { audio };
}


