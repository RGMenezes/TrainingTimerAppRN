import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Tempo em que os dados são considerados frescos (fresh). Após isso, são 'stale' (velhos)
            staleTime: 1000 * 60 * 5,
            // Evita refetching agressivo
            refetchOnWindowFocus: false, 
        },
    },
});