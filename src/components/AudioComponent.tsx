import { Player } from "@react-native-community/audio-toolkit";
import React, { useEffect, useRef, useState } from "react"
import { Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

const SAMPLE_AUDIO = "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3";

const player = new Player(SAMPLE_AUDIO, {
    autoDestroy: false,
    continuesToPlayInBackground: true
}).prepare((err: any) => {
    console.log("Error", err);
    player.play();
});

const AudioComponent = () => {
    const [progress, setProgress] = useState(0);
    const [icon, setIcon] = useState("pause");

    const playToggle = () => {
        if(icon==='pause')
        {
            player.pause();
            setIcon("play");

        }else{
            player.play();
            setIcon("pause");
        }
       
    }

    /**
     * Start a timer to track progress
     */
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(!isNaN(player.duration))
                setProgress(Math.max(0,player.currentTime)/player.duration);
        }, 100);
        return ()=>clearInterval(interval)
    }, []);

    useEffect(() => {
        console.log("play")
       

        return (() => {
            player.stop();
        })
    }, []);

    return (
        <View style={{ flexDirection: 'row', flex: 1, alignItems:'center' }}>
            <TouchableOpacity onPress={playToggle}>
                <Icon size={24} name={icon}></Icon>
            </TouchableOpacity>
            <Slider step={0.0001} style={{flex:1}} value={progress}/>
        </View>
    )
}

export { AudioComponent }