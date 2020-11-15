import { AudioComponent } from '@src/components/AudioComponent';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

const SAMPLE_AUDIO = "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3";
const RAIN_AUDIO = "https://d11l60ot7b7zda.cloudfront.net/uploads%2Fdd1da8c9-0b9c-465e-9496-e285dd9b1106%2Frain-thunder-30.mp3?Expires=1605988013&Signature=KQ38K8~AnoONqEf27IWb01hYohLWYE7zG11ZPQfvbPP0geSSt1g3jKd4KIOaUL7LaYAQflRYWykz~05tXFWCQxz0tiPJK21bLL-61hXNRrFH6UdxDvC4JVeHYpLMlWQZoZKe5LxA0UFioefFWuQiqcCdBHz71MokmdDghsVAB-1CIFycNENxvfnBgk5f0C86pI-fhOXxwkZ~6U4d--3u1qHsYf4iLoZ0U7ueInpztr21es2injvF5OOz710rT2aZua~SvLnLWhIGPcFphYx3UUKkntmxoidrAaaogg2SnI7zlhc1PljiO3GVwyId5BmYDc8VAcsuaowF08UML16d9A__&Key-Pair-Id=APKAIDI7QAJQ35O5BKCA";

const MasterScreen = (props: Props) => {

    useEffect(() => {

    }, []);

    const onMenuPress = () => {
        console.log(props.navigation.state);// { key: 'Home', routeName: 'Home' }
        console.log("Menu pressed");
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: 'red', flexDirection: 'row', alignItems: 'center' }}>

                <TouchableOpacity style={{ backgroundColor: 'yellow' }}
                    onPress={() => onMenuPress()}>
                    <Text>Menu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 15 }}>

                <AudioComponent audioUrl={SAMPLE_AUDIO} />
                <AudioComponent audioUrl={RAIN_AUDIO} />

            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }