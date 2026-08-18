import { useState } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.scrollContentStyle}>
                    <Text style={{ fontSize: 36, paddingBottom: 36 }}>
                        BadgerChat Login
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
                    <View style={styles.loginSignupButtons}>
                        <Button
                            color="darkred"
                            title="Login"
                            onPress={() => {
                                if (username === "" || pin === "") {
                                    Alert.alert(
                                        "Login Error",
                                        "You must provide both a name and a pin!",
                                    );
                                } else if (!/^\d{7}$/.test(pin)) {
                                    Alert.alert(
                                        "Login Error",
                                        "Your pin is a 7-digit number!",
                                    );
                                } else {
                                    props
                                        .handleLogin(username, pin)
                                        .then(() => {
                                            setUsername("");
                                            setPin("");
                                        });
                                }
                            }}
                        />
                        <Button
                            color="grey"
                            title="Signup"
                            onPress={() => props.setIsRegistering(true)}
                        />
                    </View>
                    <Button
                        color="gray"
                        title="CONTINUE AS GUEST"
                        onPress={() => {
                            props.handleGuest();
                        }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
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
    loginSignupButtons: {
        width: "70%",
        paddingVertical: 24,
        paddingHorizontal: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default BadgerLoginScreen;
