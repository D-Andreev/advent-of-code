package main

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
)

func main() {
	// partOne()
	partTwo()
}

func partOne() {
	input := readInput("./input")
	re := regexp.MustCompile(`mul\([0-9]{1,3},[0-9]{1,3}\)`)
	var sum int64 = 0

	for _, line := range input {
		matches := re.FindAllString(line, -1)
		for _, match := range matches {
			nums := strings.Trim(match[4:len(match)-1], " ")
			split := strings.Split(nums, ",")
			first, _ := strconv.ParseInt(split[0], 10, 64)
			second, _ := strconv.ParseInt(split[1], 10, 64)
			fmt.Println(nums, match, first, second)
			product := first * second
			sum += product
		}
	}
	fmt.Printf("Sum of all multiplications: %d\n", sum)
}

func partTwo() {
	input := readInput("./input")
	re := regexp.MustCompile(`mul\([0-9]{1,3},[0-9]{1,3}\)|(do|don't)\(\)`)
	var sum int64 = 0
	enabled := true

	for _, line := range input {
		matches := re.FindAllString(line, -1)

		for _, match := range matches {
			if match == "do()" {
				enabled = true
				continue
			}
			if match == "don't()" {
				enabled = false
				continue
			}

			if enabled && strings.HasPrefix(match, "mul(") {
				nums := strings.Trim(match[4:len(match)-1], " ")
				split := strings.Split(nums, ",")
				first, _ := strconv.ParseInt(split[0], 10, 64)
				second, _ := strconv.ParseInt(split[1], 10, 64)
				product := first * second
				sum += product
			}
		}
	}

	fmt.Printf("Sum of all enabled multiplications: %d\n", sum)
}

func readInput(path string) []string {
	dat, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}

	str := string(dat)
	rows := strings.Split(str, "\n")
	return rows
}
