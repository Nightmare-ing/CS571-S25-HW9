import { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import CS571 from "@cs571/mobile-client";
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {
    const [msgs, setMsgs] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    function fetchNewData() {
        setIsLoading(true);
        fetch(
            `https://cs571.org/rest/s25/hw9/messages?chatroom=${props.name}`,
            {
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                },
            },
        )
            .then((res) => res.json())
            .then((data) => {
                setMsgs(data.messages);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        fetchNewData();
    }, []);

    return (
        <View style={styles.container}>
            {msgs ? (
                <FlatList
                    style={{ flex: 1, alignSelf: "stretch" }}
                    data={msgs}
                    refreshing={isLoading}
                    onRefresh={fetchNewData}
                    keyExtractor={(item) => item.id}
                    renderItem={(renderObj) => (
                        <BadgerChatMessage {...renderObj.item} />
                    )}
                />
            ) : (
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    Loading...
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: "3%",
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BadgerChatroomScreen;
