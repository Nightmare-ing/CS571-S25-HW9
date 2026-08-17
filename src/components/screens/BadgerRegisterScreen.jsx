import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function BadgerRegisterScreen(props) {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [confirmedPin, setConfirmedPin] = useState("");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContentStyle}
                >
                    <Text style={{ fontSize: 36, paddingBottom: 36 }}>
                        Join BadgerChat!
                    </Text>

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={setUsername}
                    />

                    <Text style={styles.label}>PIN</Text>
                    <TextInput
                        style={styles.input}
                        value={pin}
                        keyboardType="number-pad"
                        secureTextEntry={true}
                        onChangeText={setPin}
                    />

                    <Text style={styles.label}>Confirm PIN</Text>
                    <TextInput
                        style={styles.input}
                        value={confirmedPin}
                        keyboardType="number-pad"
                        secureTextEntry={true}
                        onChangeText={setConfirmedPin}
                    />

                    <View style={styles.buttons}>
                        <Button
                            color="darkred"
                            title="Signup"
                            onPress={() => {
                                if (username === "" || pin === "") {
                                    Alert.alert(
                                        "Warning",
                                        "You must provide both a name and a pin!",
                                    );
                                } else if (!/^\d{7}$/.test(pin)) {
                                    Alert.alert(
                                        "Warning",
                                        "A pin must be 7 digits",
                                    );
                                } else if (pin !== confirmedPin) {
                                    Alert.alert("Warning", "Pins do not match");
                                } else {
                                    props
                                        .handleSignup(username, pin)
                                        .then(() => {
                                            setUsername("");
                                            setPin("");
                                            setConfirmedPin("");
                                        });
                                }
                            }}
                        />
                        <Button
                            color="grey"
                            title="Nevermind!"
                            onPress={() => props.setIsRegistering(false)}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContentStyle: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "70%",
        height: 40,
        borderWidth: 1,
        margin: 12,
        padding: 10,
        alignItems: "stretch",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    buttons: {
        width: "70%",
        paddingTop: 24,
        paddingHorizontal: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default BadgerRegisterScreen;
