import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View, TextInput } from "react-native";

function BadgerLoginScreen(props) {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");

    return (
        <View style={styles.container}>
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
            <View style={styles.buttons}>
                <Button
                    style={{ padding: 36 }}
                    color="crimson"
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
                            props.handleLogin(username, pin).then(() => {
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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

export default BadgerLoginScreen;
