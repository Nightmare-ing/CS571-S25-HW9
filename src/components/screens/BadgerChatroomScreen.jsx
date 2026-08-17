import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Modal,
    Button,
    Alert,
    Pressable,
} from "react-native";
import CS571 from "@cs571/mobile-client";
import BadgerChatMessage from "../helper/BadgerChatMessage";
import { TextInput } from "react-native-gesture-handler";

function BadgerChatroomScreen(props) {
    const [msgs, setMsgs] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisiable, setModalVisable] = useState(false);

    const [modalTitle, setModalTitle] = useState("");
    const [modalBody, setModalBody] = useState("");
    const hasTitleAndBody = modalTitle !== "" && modalBody !== "";

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
                        <Text
                            style={{
                                fontSize: 20,
                                paddingBottom: 12,
                                fontWeight: "bold",
                            }}
                        >
                            Create A Post
                        </Text>
                        <Text style={styles.postLabel}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={modalTitle}
                            onChangeText={setModalTitle}
                        />
                        <Text>Body</Text>
                        <TextInput
                            style={[styles.input, { height: 60 }]}
                            multiline={true}
                            textAlignVertical="top"
                            value={modalBody}
                            onChangeText={setModalBody}
                        />
                        <View style={styles.postButtons}>
                            <Pressable
                                style={[
                                    styles.buttonContainer,
                                    {
                                        backgroundColor: hasTitleAndBody
                                            ? "crimson"
                                            : "whitesmoke",
                                        elevation: hasTitleAndBody ? 6 : 0,
                                    },
                                ]}
                                disabled={!hasTitleAndBody}
                                onPress={() => {
                                    console.log(modalTitle, modalBody);
                                }}
                            >
                                <Text
                                    style={{
                                        color: hasTitleAndBody
                                            ? "white"
                                            : "darkgray",
                                        fontWeight: "bold",
                                    }}
                                >
                                    CREATE POST
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.buttonContainer,
                                    { backgroundColor: "darkgray" },
                                ]}
                                onPress={() => {
                                    setModalVisable(false);
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white",
                                        fontWeight: "bold",
                                    }}
                                >
                                    CANCEL
                                </Text>
                            </Pressable>
                        </View>
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
        width: "80%",
        borderRadius: 20,
        backgroundColor: "white",
        padding: 24,
    },
    input: {
        borderWidth: 1,
        margin: 12,
        padding: 10,
    },
    postLabel: {
        fontSize: 16,
    },
    postButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "2%",
    },
    buttonContainer: {
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonText: {
        fontWeight: "bold",
    },
});

export default BadgerChatroomScreen;
