import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="workout/index" options={{ headerShown: false }} />
                <Stack.Screen name="workout/form/index" options={{ headerShown: false }} />
                <Stack.Screen name="group/index" options={{ headerShown: false }} />
                {/* ... outras rotas ... */}
            </Stack>
        </QueryClientProvider>
    );
}