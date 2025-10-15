import { useTheme } from "@/hook";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ViewFormProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

export default function ViewForm({ children, scrollable = false, style }: ViewFormProps) {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = StyleSheet.create({
        flex: {
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        
            backgroundColor: colors.background,
        },
        inner: {
            flex: 1,
            justifyContent: "center",
            padding: 20,
        },
        scrollContent: {
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
        },
    });

    const Container = scrollable ? ScrollView : View;
    const containerProps = scrollable ? { contentContainerStyle: [styles.scrollContent, style] } : { style: [styles.inner, style] };

    return (
        <KeyboardAvoidingView
            style={ styles.flex }
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Container {...(containerProps as any)}>
                {children}
            </Container>
        </KeyboardAvoidingView>
    );
}