import { Player } from "@react-native-community/audio-toolkit";
import React, { useEffect, useRef, useState } from "react"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';


type PlayState = "play" | "pause";

interface Props {
    audioUrl: string
}


const AudioComponent = (props: Props) => {
    const [progress, setProgress] = useState(0);
    const [icon, setIcon] = useState<PlayState>("play");
    const localState = useRef(null);

    if (localState.current === null) {
        localState.current = {
            lastSeek: 0,
            player: null,
            audioUrl: "Unknown"
        };
    }

    const playToggle = () => {
        console.log("playToggle called");
        if (icon === 'pause') {
            getPlayer().pause();
            setIcon("play");

        } else {
            getPlayer().play();
            setIcon("pause");
        }

    }

    const isPlaying = () => {
        return icon === "pause";
    }

    const getPlayer = () => {
        return localState.current.player;
    }

    /**
     * Start a timer to track progress
     */
    useEffect(() => {
        let interval;
        if (isPlaying()) {
            console.log("begin timer");
            interval = setInterval(() => {
                const progress = Math.max(0, getPlayer().currentTime) / getPlayer().duration;
                if (!isNaN(progress) && shouldUpdateProgressBar())
                    setProgress(progress);
            }, 100);
        }

        return () => {
            if (interval)
                clearInterval(interval)
        }
    }, [icon]);

    useEffect(() => {
        localState.current.player = new Player(props.audioUrl, {
            autoDestroy: false,
            continuesToPlayInBackground: true
        }).prepare((err: any) => {
            console.log("Error", err);
        });


        return (() => {
            getPlayer().stop();
            getPlayer().destroy();
        })
    }, []);

    const seek = (percentage) => {
        if (!getPlayer())
            return;

        localState.current.lastSeek = Date.now();
        let position = percentage * getPlayer().duration;
        getPlayer().seek(position, () => {

        });

    }

    const shouldUpdateProgressBar = () => {
        return Date.now() - localState.current.lastSeek > 200;
    }

    return (
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={playToggle}>
                <View style={{ backgroundColor: 'red', width: 100, height: 100 }}>
                    <Icon size={24} name={icon}></Icon>
                </View>

            </TouchableOpacity>
            <Slider step={0.0001} style={{ flex: 1 }} value={progress} onValueChange={seek} />
        </View>
    )
}

export { AudioComponent }