// Keep this here!
import "react-native-gesture-handler";

import BadgerChat from "./src/components/BadgerChat";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <>
            <SafeAreaProvider>
                <BadgerChat />
            </SafeAreaProvider>
        </>
    );
}
