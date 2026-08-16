import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    Button,
    Alert,
} from "react-native";
import CS571 from "@cs571/mobile-client";
import BadgerChatMessage from "../helper/BadgerChatMessage";

function BadgerChatroomScreen(props) {
    const [msgs, setMsgs] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisiable, setModalVisable] = useState(false);

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
                <View style={{ flex: 1, alignSelf: "stretch" }}>
                    <FlatList
                        style={{
                            flex: 1,
                            paddingHorizontal: "3%",
                        }}
                        data={msgs}
                        refreshing={isLoading}
                        onRefresh={fetchNewData}
                        keyExtractor={(item) => item.id}
                        renderItem={(renderObj) => (
                            <BadgerChatMessage {...renderObj.item} />
                        )}
                    />
                    <Button
                        color="crimson"
                        title="ADD POST"
                        onPress={() => {
                            setModalVisable(true);
                        }}
                    />
                </View>
            ) : (
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    Loading...
                </Text>
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisiable}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed");
                    setModalVisable(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ padding: 45 }}>This is a modal</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        backgroundColor: "white",
    },
});

export default BadgerChatroomScreen;
