import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import * as validation from "../utils/validations";

export default function InputDefault(props) {
    const [value, setValue] = useState(null)

    return (

        <TextInput
            style={styles.button}
            value={value}
            maxLength={props.maxLength}
            onChangeText={(event) => setValue(validation[props.check](event))}
        />
    )
}

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#ccced9',
        borderRadius: 6,
        borderWidth: 1,
        height: 40,
        paddingLeft: 10
    }
})