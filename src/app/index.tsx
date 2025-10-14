import { AppBar, H1, ViewMain } from "@/component";

export default function App() {
    return (
        <ViewMain>
            <AppBar back={false} />
            <H1>Training Timer</H1>
        </ViewMain>
    );
}