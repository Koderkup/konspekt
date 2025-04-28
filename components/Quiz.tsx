import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    const req = require("../../konspekt/questions.json");
    setQuestions(req);
    setAnswers(Array(req.length).fill(null)); // Инициализируем массив ответов
    setResults(Array(req.length).fill(null)); // Инициализируем массив результатов
  }, []);

  const handleAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const newResults = questions.map((question, index) =>
      answers[index] === question.correct ? "correct" : "incorrect"
    );
    setResults(newResults);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(questions.length / 2) - 1)
    );
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * 2; // 2 вопроса на странице
  const currentQuestions = questions.slice(startIndex, startIndex + 2); // Получаем текущие вопросы

  return (
    <View style={styles.container}>
      {currentQuestions.map((question, index) => (
        <View key={question.id} style={styles.questionContainer}>
          <Text style={styles.question}>{question.question}</Text>
          {question.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                answers[startIndex + index] === option && styles.selectedOption,
              ]}
              onPress={() => handleAnswer(startIndex + index, option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          {results[startIndex + index] && (
            <Text
              style={
                results[startIndex + index] === "correct"
                  ? styles.correct
                  : styles.incorrect
              }
            >
              {results[startIndex + index] === "correct"
                ? "Правильно!"
                : "Неправильно!"}
            </Text>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.checkButton} onPress={checkAnswers}>
        <Text style={styles.buttonText}>Проверить</Text>
      </TouchableOpacity>
      <View style={styles.pagination}>
        <Button
          title="Назад"
          onPress={goToPrevPage}
          disabled={currentPage === 0}
        />
        <Button
          title="Вперед"
          onPress={goToNextPage}
          disabled={startIndex + 2 >= questions.length}
        />
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
    position: "absolute",
    bottom: 20,
    right: 20,
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
});

export default Quiz;
