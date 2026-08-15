import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import CS571 from "@cs571/mobile-client";
import * as SecureStore from "expo-secure-store";
import BadgerChatroomScreen from "./screens/BadgerChatroomScreen";
import BadgerRegisterScreen from "./screens/BadgerRegisterScreen";
import BadgerLoginScreen from "./screens/BadgerLoginScreen";
import BadgerLandingScreen from "./screens/BadgerLandingScreen";

const ChatDrawer = createDrawerNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [chatrooms, setChatrooms] = useState([]);

    useEffect(() => {
        fetch("https://cs571.org/rest/s25/hw6/chatrooms", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setChatrooms(data);
            });
    }, []);

    async function handleLogin(username, pin) {
        const data = await fetch("https://cs571.org/rest/s25/hw9/login", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                pin: pin,
            }),
        }).then((res) => {
            if (res.status === 401) {
                Alert.alert("Login Error", "Incorrect username or pin");
                return null;
            } else if (res.status === 200) {
                Alert.alert("Login", "Login Successfully!");
                return res.json();
            } else {
                Alert.alert("Internal Error", "Something went wrong!");
                return null;
            }
        });
        if (data) {
            try {
                await SecureStore.setItemAsync(username, data.token);
                setIsLoggedIn(true); // I should really do a fetch to login first!
            } catch (e) {
                Alert.alert("Internal Error", e);
            }
        }
    }

    async function handleSignup(username, pin) {
        const data = await fetch("https://cs571.org/rest/s25/hw9/register", {
            method: "POST",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                pin: pin,
            }),
        }).then((res) => {
            if (res.status === 200) {
                Alert.alert("Register", "Sign up successfully!");
                return res.json();
            }
            if (res.status === 409) {
                Alert.alert("Register Error", "The user already exists!");
                return null;
            }
            if (res.status === 413) {
                Alert.alert(
                    "Register Error",
                    "'Username' must be 64 characters or fewer!",
                );
                return null;
            }
        });

        if (data) {
            try {
                await SecureStore.setItemAsync(username, data.token);
                setIsLoggedIn(true); // I should really do a fetch to register first!
            } catch (e) {
                Alert.alert("Internal Error", e);
            }
        }
    }

    if (isLoggedIn) {
        return (
            <NavigationContainer>
                <ChatDrawer.Navigator>
                    <ChatDrawer.Screen
                        name="Landing"
                        component={BadgerLandingScreen}
                    />
                    {chatrooms.map((chatroom) => {
                        return (
                            <ChatDrawer.Screen key={chatroom} name={chatroom}>
                                {(props) => (
                                    <BadgerChatroomScreen name={chatroom} />
                                )}
                            </ChatDrawer.Screen>
                        );
                    })}
                </ChatDrawer.Navigator>
            </NavigationContainer>
        );
    } else if (isRegistering) {
        return (
            <BadgerRegisterScreen
                handleSignup={handleSignup}
                setIsRegistering={setIsRegistering}
            />
        );
    } else {
        return (
            <BadgerLoginScreen
                handleLogin={handleLogin}
                setIsRegistering={setIsRegistering}
            />
        );
    }
}
