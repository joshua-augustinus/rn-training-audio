import { AudioComponent } from '@src/components/AudioComponent';
import React, { useEffect } from 'react';
import {  Text,  TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerActions, NavigationDrawerProp } from 'react-navigation-drawer';

/**
 * https://reactnavigation.org/docs/4.x/typescript
 */
type Props = {
    navigation: NavigationDrawerProp<{ userId: string, routeName: string }>;
}

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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding:5 }}>

                <AudioComponent />

            </View>
        </SafeAreaView>

    );

}

MasterScreen.navigationOptions = {}

export { MasterScreen }