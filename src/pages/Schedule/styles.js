import React from 'react';
import {Platform,StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Platform.OS === "android" ? 10 : 0,
        width: "100%",
        height: "auto",
        //backgroundColor:"#423e3c"
    },
    title:{
        fontSize: 20,
    }
})

export default styles;