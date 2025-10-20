import { Audio } from "expo-av";
import { useEffect, useState } from "react";

const SOUND_FILES = {
    pause: require("@assets/sounds/click.mp3"),    
    countdown: require("@assets/sounds/beep.mp3"),       
    end: require("@assets/sounds/beepFinish.mp3"),        
};

const soundMap: { [key in keyof typeof SOUND_FILES]?: Audio.Sound } = {};

export default function useSoundPlayer() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadSounds = async () => {
            try {
                for (const key in SOUND_FILES) {
                    const soundKey = key as keyof typeof SOUND_FILES;
                    const { sound } = await Audio.Sound.createAsync(SOUND_FILES[soundKey]);
                    soundMap[soundKey] = sound;
                }
                setIsLoaded(true);
            } catch (e) {
                console.error("Erro ao carregar sons:", e);
            }
        };

        loadSounds();

        return () => {
            for (const key in soundMap) {
                if (soundMap[key as keyof typeof SOUND_FILES]) {
                    soundMap[key as keyof typeof SOUND_FILES]?.unloadAsync();
                }
            }
        };
    }, []);

    const playSound = async (soundKey: keyof typeof SOUND_FILES) => {
        if (!isLoaded) {
            console.warn("Sons ainda não carregados.");
            return;
        }

        const sound = soundMap[soundKey];
        if (sound) {
            try {
                await sound.stopAsync();
                await sound.setPositionAsync(0); 
                await sound.playAsync();
            } catch (e) {
                console.error(`Erro ao tocar som ${soundKey}:`, e);
            }
        }
    };

    return { playSound, isLoaded };
}