import React from "react";
import { Text } from "react-native";

export default function TextAlert({ error }) {
    return (
        <Text style={{ fontSize: 12, color: 'red' }}>
            {error}
        </Text>
    )
}