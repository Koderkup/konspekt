import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const Loading = () => {
  const word = "ВОИРО";
  const letters = word.split("");

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.horizontal}>
          {letters.map((letter, index) => (
            <View key={index} style={styles.spinnerContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>{letter}</Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  spinnerContainer: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  loadingText: {
    position: "absolute",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Loading;
