package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

func main() {
	file, err := os.Open("input")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	sc := bufio.NewScanner(file)
	lines := make([]string, 0)
	for sc.Scan() {
		lines = append(lines, sc.Text())
	}
	if err := sc.Err(); err != nil {
		log.Fatal(err)
	}

	partOne(lines)
	partTwo(lines)
}

func partOne(lines []string) {
	s := 0
	for _, l := range lines {
		var digits []string
		for _, c := range l {
			_, err := strconv.Atoi(string(c))
			if err != nil {
				continue
			}
			digits = append(digits, string(c))
			break
		}

		for i := len(l) - 1; i >= 0; i-- {
			_, err := strconv.Atoi(string(l[i]))
			if err != nil {
				continue
			}
			digits = append(digits, string(l[i]))
			break
		}

		if len(digits) == 2 {
			cv := digits[0] + digits[1]
			i, err := strconv.Atoi(cv)
			if err != nil {
				continue
			}
			s += i
		}
	}

	fmt.Println(s)
}

func partTwo(lines []string) {
	numbers := []string{
		"one",
		"two",
		"three",
		"four",
		"five",
		"six",
		"seven",
		"eight",
		"nine",
	}

	s := 0
	for _, l := range lines {
		var digits []int
		// get first digit
		digitAsNumber, digitAsNumberIdx := getFirstDigitFromStr(l)
		digitAsWord, digitAsWordIdx := getFirstDigitWithWords(l, numbers)

		if digitAsNumberIdx != -1 && digitAsNumberIdx < digitAsWordIdx {
			// the first found digit was a number
			digits = append(digits, digitAsNumber)
		} else {
			// the first found digit was with words
			digits = append(digits, digitAsWord)
		}

		// get last digit
		digitAsNumber, digitAsNumberIdx = getLastDigitFromStr(l)
		digitAsWord, digitAsWordIdx = getLastDigitWithWords(l, numbers)

		if digitAsNumberIdx != -1 && digitAsNumberIdx > digitAsWordIdx {
			// the last found digit was a number
			digits = append(digits, digitAsNumber)
		} else {
			// the last found digit was with words
			digits = append(digits, digitAsWord)
		}

		if len(digits) == 2 {
			firstN := strconv.Itoa(digits[0])
			secondN := strconv.Itoa(digits[1])
			concatanated := firstN + secondN
			i, err := strconv.Atoi(concatanated)
			if err != nil {
				continue
			}
			s += i
		}
	}

	fmt.Println(s)
}

func getFirstDigitFromStr(str string) (int, int) {
	for i, s := range str {
		_, err := strconv.Atoi(string(s))
		if err != nil {
			// character is not a number
			continue
		}

		// character is a number
		n, err := strconv.Atoi(string(s))
		if err != nil {
			return -1, -1
		}
		return n, i
	}

	return -1, -1
}

func getFirstDigitWithWords(str string, numbers []string) (int, int) {
	firstIdx := 9223372036854775807
	match := 9223372036854775807
	for i, n := range numbers {
		idx := strings.Index(str, n)
		if idx == -1 {
			continue
		}
		if idx < firstIdx {
			firstIdx = idx
			match = i + 1
		}
	}

	return match, firstIdx
}

func getLastDigitFromStr(str string) (int, int) {
	for i := len(str) - 1; i >= 0; i-- {
		s := str[i]
		_, err := strconv.Atoi(string(s))
		if err != nil {
			// character is not a number
			continue
		}

		// character is a number
		n, err := strconv.Atoi(string(s))
		if err != nil {
			return -1, -1
		}
		return n, i
	}

	return -1, -1
}

func getLastDigitWithWords(str string, numbers []string) (int, int) {
	lastIdx := -1
	match := -1
	for i, n := range numbers {
		idx := strings.LastIndex(str, n)
		if idx == -1 {
			continue
		}
		if idx > lastIdx {
			lastIdx = idx
			match = i + 1
		}
	}

	return match, lastIdx
}
