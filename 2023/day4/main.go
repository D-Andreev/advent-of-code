package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Card struct {
	id             string
	winningNumbers []int
	myNumbers      []int
	matches        int
}

func main() {
	lines := parseInput("input")
	partOne(lines)
	partTwo(lines)
}

func partTwo(lines []string) {
	var cards []*Card
	for _, l := range lines {
		splitCardInput := strings.Split(l, ": ")
		id := strings.ReplaceAll(splitCardInput[0], "Card ", "")
		numbersSplit := strings.Split(splitCardInput[1], " | ")
		winningNumbers := parseIntArray(numbersSplit[0])
		matches := make(map[int]int)

		myNumbers := strings.Fields(numbersSplit[1])
		for _, n := range myNumbers {
			number, err := strconv.Atoi(string(n))
			if err != nil {
				log.Fatal(err)
			}
			matches[number] = 0
		}
		myNumbersArr := parseIntArray(numbersSplit[1])

		matchesCount := 0
		for _, wn := range winningNumbers {
			_, ok := matches[wn]
			if !ok {
				continue
			}
			matchesCount++
		}
		cards = append(cards, &Card{
			id:             id,
			winningNumbers: winningNumbers,
			myNumbers:      myNumbersArr,
			matches:        matchesCount,
		})
	}

	copiesCount := len(cards)
	var copiesArr [][]*Card
	copiesArr = append(copiesArr, cards)
	copiesIdx := 0
	for copiesCount > 0 {
		i := 0
		s := len(copiesArr[copiesIdx])
		cardss := copiesArr[copiesIdx]
		var copies []*Card
		for i < s {
			for m := 1; m <= cardss[i].matches; m++ {
				idx := i + m
				number, err := strconv.Atoi(string(cardss[idx].id))
				if err != nil {
					log.Fatal(err)
				}
				currentCard := cards[number-1]
				var copy Card
				copy.id = currentCard.id
				copy.winningNumbers = append(copy.winningNumbers, currentCard.winningNumbers...)
				copy.myNumbers = append(copy.myNumbers, currentCard.myNumbers...)
				copy.matches = currentCard.matches
				copies = append(copies, &copy)
			}
			i++
		}
		copiesArr = append(copiesArr, copies)
		copiesIdx++
		copiesCount += len(copies) - s
	}

	res := 0
	for _, c := range copiesArr {
		res += len(c)
	}

	fmt.Println(copiesArr)
	fmt.Println(res)
	fmt.Print("\n")
}

func partOne(lines []string) {
	totalScore := 0
	for _, l := range lines {
		splitCardInput := strings.Split(l, ": ")
		numbersSplit := strings.Split(splitCardInput[1], " | ")
		winningNumbers := parseIntArray(numbersSplit[0])
		scores := make(map[int]int)

		myNumbers := strings.Fields(numbersSplit[1])
		for _, n := range myNumbers {
			number, err := strconv.Atoi(string(n))
			if err != nil {
				log.Fatal(err)
			}
			scores[number] = 0
		}

		cardScore := 0
		for _, wn := range winningNumbers {
			_, ok := scores[wn]
			if !ok {
				continue
			}
			if cardScore == 0 {
				cardScore = 1
			} else {
				cardScore *= 2
			}
		}

		totalScore += cardScore
	}

	fmt.Println(totalScore)
}

func parseIntArray(str string) []int {
	var numbers []int
	split := strings.Fields(str)
	for _, n := range split {
		number, err := strconv.Atoi(string(n))
		if err != nil {
			log.Fatal(err)
		}
		numbers = append(numbers, number)
	}
	return numbers
}

func parseInput(path string) []string {
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

	return lines
}
