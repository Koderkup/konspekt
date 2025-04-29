import { Image, StyleSheet, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Loading from "@/components/Loading";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        isLoading ? (
          <Loading />
        ) : (
          <Image
            source={require("@/assets/images/partial-icon.png")}
            style={styles.reactLogo}
          />
        )
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Добро пожаловать!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Шаг 1: Интерактивный конспект</ThemedText>
        <ThemedText>
          Перейдите на страницу{" "}
          <ThemedText type="defaultSemiBold"> УЧИТЬСЯ</ThemedText> для
          ознакомления с конспектом. Для этого нажмите кнопку{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "УЧИТЬСЯ",
              android: "УЧИТЬСЯ",
              web: "УЧИТЬСЯ",
            })}
          </ThemedText>{" "}
          внизу экрана.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Шаг 2: УЧИТЬСЯ</ThemedText>
        <ThemedText>
          Выберите из предложенных варианты ответа на вопрос.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Шаг 3: ПРОВЕРИТЬ свои знания.</ThemedText>
        <ThemedText>
          Когда Вы готовы{" "}
          <ThemedText type="defaultSemiBold">
            кликните по кнопке ПРОВЕРИТЬ
          </ThemedText>{" "}
          для теста своих знаний{" "}
          <ThemedText type="defaultSemiBold">Или СБРОС</ThemedText> чтобы начать
          занаво.{" "}
          <ThemedText type="defaultSemiBold">
            ПРОВЕРИТЬ&gt;&gt; СБРОС
          </ThemedText>{" "}
          &#128168;{" "}
          <ThemedText type="defaultSemiBold">
            Всё просто! &#128512; Желаем успехов!
          </ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
