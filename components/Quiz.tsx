import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import * as FileSystem from "expo-file-system";
import { useThemeColor } from "@/hooks/useThemeColor";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

const Quiz: React.FC = () => {
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#000" },
    "background"
  );
  const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<(string | null)[]>([]);

// const fetchAndUpdateQuestions = async () => {
//   try {
//     const serverUrl = "https://example.com/questions.json";
//     const localPath = FileSystem.documentDirectory + "questions.json";

//     const response = await fetch(serverUrl);
//     const json = await response.json();

    
//     await FileSystem.writeAsStringAsync(localPath, JSON.stringify(json));
//     console.log("Вопросы успешно обновлены и сохранены локально:", localPath);

    
//     setQuestions(json);
//     setAnswers(Array(json.length).fill(null));
//     setResults(Array(json.length).fill(null));
//   } catch (error) {
//     console.error("Ошибка загрузки и обновления вопросов:", error);
//   }
// };
// useEffect(() => {
//   (async () => {
//     const localPath = FileSystem.documentDirectory + "questions.json";
//     try {
//       const fileExists = await FileSystem.getInfoAsync(localPath);
//       let req;
//       if (fileExists.exists) {
//         const fileContent = await FileSystem.readAsStringAsync(localPath);
//         const req = JSON.parse(fileContent);
//         setQuestions(req);
//       } else {
//         const assetContent = await fetch(require("../assets/questions.json"));
//         req = await assetContent.json();
//         setQuestions(req);
//       }
//       setAnswers(Array(req.length).fill(null));
//       setResults(Array(req.length).fill(null));
//     } catch (error) {
//       console.error("Ошибка загрузки вопросов:", error);
//     }
//   })();
// }, []);
  useEffect(() => {
    const req = require("../assets/questions.json");
    setQuestions(req);
    setAnswers(Array(req.length).fill(null));
    setResults(Array(req.length).fill(null));
  }, []);

  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const newResults = questions.map((question, index) => {
      if (answers[index] === null) {
        return null;
      }
      return answers[index] === question.correct ? "correct" : "incorrect";
    });
    setResults(newResults);
  };

  const resetAnswers = () => {
    setAnswers(Array(questions.length).fill(null));
    setResults(Array(questions.length).fill(null));
  };
let timer: NodeJS.Timeout | null = null;
 const handleCheckButtonPress = () => {
   if (timer) {
     clearTimeout(timer);
     timer = null;
     resetAnswers();
   } else {
     timer = setTimeout(() => {
       checkAnswers();
       timer = null;
     }, 300);
   }
 };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(questions.length / 2) - 1)
    );
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * 2;
  const currentQuestions = questions.slice(startIndex, startIndex + 2);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {currentQuestions.map((question, index) => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={[styles.question, { color: textColor }]}>
            {question.question}
          </Text>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                answers[startIndex + index] === option && styles.selectedOption,
              ]}
              onPress={() => handleAnswer(startIndex + index, option)}
            >
              <Text style={[styles.optionText, { color: textColor }]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
          {results[startIndex + index] && (
            <Text
              style={[
                results[startIndex + index] === "correct"
                  ? styles.correct
                  : styles.incorrect,
                { color: textColor },
              ]}
            >
              {results[startIndex + index] === "correct"
                ? "Правильно!"
                : "Неправильно!"}
            </Text>
          )}
        </View>
      ))}
      <View style={styles.pagination}>
        {/* <Button
          title="Назад"
          onPress={goToPrevPage}
          disabled={currentPage === 0}
        />
        <Button
          title="Вперед"
          onPress={goToNextPage}
          disabled={startIndex + 2 >= questions.length}
        /> */}
        <TouchableOpacity
          style={[
            styles.button_pgn,
            currentPage === 0 && styles.disabledButton,
          ]}
          onPress={goToPrevPage}
          disabled={currentPage === 0}
        >
          <Text style={styles.buttonText}>&#8656;</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={handleCheckButtonPress}
        >
          <Text style={styles.buttonText}>Проверить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button_pgn,
            startIndex + 2 >= questions.length && styles.disabledButton,
          ]}
          onPress={goToNextPage}
          disabled={startIndex + 2 >= questions.length}
        >
          <Text style={styles.buttonText}>&#8658;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
    borderRadius: 5,
  },
  selectedOption: {
    backgroundColor: "#d3d3d3",
  },
  optionText: {
    fontSize: 16,
  },
  correct: {
    color: "green",
  },
  incorrect: {
    color: "red",
  },
  checkButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 123, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button_pgn: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 123, 255, 0.9)",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "rgba(0, 123, 255, 0.3)",
    opacity: 0.5,
  },
});

export default Quiz;
