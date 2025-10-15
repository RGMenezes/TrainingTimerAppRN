// src/components/input/Input.tsx

import { useTheme } from "@/hook"; // Seu hook de tema
import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Small from "../text/Small";

interface InputProps extends TextInputProps{
    label?: string
}

export default function Input({ label, style, onBlur, ...rest }: InputProps) {
    const theme = useTheme();
    const [focus, setFocus] = useState(false);

    const styles = StyleSheet.create({
        input: {
            height: 48,
            paddingHorizontal: 16,
            marginVertical: 4,

            borderBottomWidth: 1,
            borderColor: focus ? theme.colors.primary : theme.colors.shadow,
            color: theme.colors.onBackground,
            fontSize: 16,
        },
    });

    return (
        <View>
            <Small color={theme.colors.onBackground}>{label}</Small>
            <TextInput
                onFocus={() => setFocus(!focus)}
                onBlur={(e) => {
                    setFocus(!focus);
                    if(onBlur) onBlur(e);
                }}
                style={[styles.input, style]}
                placeholderTextColor={theme.colors.placeHolder}
                {...rest}
            />
        </View>
    );
}