import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ setSearchParams }) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        if (input.trim()) {
            setSearchParams((prevParams) => ({
                ...prevParams,
                q: input,
            }));
        }
    };

    return (
        <View style={styles.header}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={"black"}
                    placeholder="Enter a location"
                    onChangeText={setInput}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSearch}
                    activeOpacity={0.9}
                >
                    <MaterialIcons name="search" size="25" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 10,
        textAlign: "center",
        borderWidth: 2,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
    inputContainer: {
        alignItems: "center",
        flexDirection: "row",
    },
    button: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        justifyContent: "center",
        marginBottom: 20,
        marginLeft: 20,
        height: 40,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
