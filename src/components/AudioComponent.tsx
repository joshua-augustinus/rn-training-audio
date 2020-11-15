import { Player } from "@react-native-community/audio-toolkit";
import React, { useEffect, useRef, useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
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
    const [isReady, setIsReady] = useState(false);
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
            if (err) {
                Alert.alert(err.message);
            } else {
                setIsReady(true);
            }
        });

        getPlayer().on("ended", onEnded);

        return (() => {
            getPlayer().stop();
            getPlayer().destroy();
        })
    }, []);

    const onEnded = () => {
        setIcon("play");
    }

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

    if (!isReady) {
        return <View style={styles.container}></View>;
    }
    else {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={playToggle}>
                    <View style={styles.playButton}>
                        <Icon size={24} name={icon} style={styles.playIcon}></Icon>
                    </View>

                </TouchableOpacity>
                <Slider step={0.0001} style={{ flex: 1 }} value={progress} onValueChange={seek} />
            </View>
        )
    }

}

export { AudioComponent }


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', flex: 1, alignItems: 'center'
    },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#D1D1D1',
        justifyContent: 'center',
        alignItems: 'center'
    },

    playIcon: {
        color: '#FFFFFF',
    },

});
