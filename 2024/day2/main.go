package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	// partOne()
	partTwo()
}

func readInput(path string) [][]int {
	dat, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}

	var reports [][]int
	str := string(dat)
	rows := strings.Split(str, "\n")
	for _, r := range rows {
		if len(r) == 0 {
			break
		}
		split := strings.Split(r, " ")
		var levels []int
		for _, s := range split {
			l, err := strconv.Atoi(s)
			if err != nil {
				panic(err)
			}
			levels = append(levels, l)
		}

		reports = append(reports, levels)
	}
	return reports
}

func partOne() {
	input := readInput("./input.txt")
	unsafeCount := getUnsafeReports(input)
	fmt.Println(unsafeCount)
}

func partTwo() {
	input := readInput("./input.txt")
	unsafeIdx := []int{}
	for j, row := range input {
		order := "asc"
		if row[0] > row[1] {
			order = "desc"
		}
		for i := 0; i < len(row)-1; i++ {
			first := row[i]
			second := row[i+1]

			currentOrder := "asc"
			if first > second {
				currentOrder = "desc"
			}
			if currentOrder != order {
				unsafeIdx = append(unsafeIdx, j)
				break
			}
			diff := math.Abs(float64(first - second))
			if diff < 1 || diff > 3 {
				unsafeIdx = append(unsafeIdx, j)
				break
			}
		}
	}

	singleBadLevel := 0
	for _, idx := range unsafeIdx {
		for i := 0; i < len(input[idx]); i++ {
			row := input[idx]
			rowWithoutI := make([]int, 0, len(row)-1)
			for j := range row {
				if j != i {
					rowWithoutI = append(rowWithoutI, row[j])
				}
			}
			order := getOrder(rowWithoutI)
			isSafe := isReportSafe(rowWithoutI, order)
			if isSafe {
				singleBadLevel++
				break
			}
		}
	}
	fmt.Println(len(input) - (len(unsafeIdx) - singleBadLevel))
}

func getUnsafeReports(input [][]int) int {
	unsafe := 0
	for _, row := range input {
		order := getOrder(row)
		if !isReportSafe(row, order) {
			unsafe++
		}
	}

	return len(input) - unsafe
}

func isReportSafe(row []int, order string) bool {
	isSafe := true
	for i := 0; i < len(row)-1; i++ {
		first := row[i]
		second := row[i+1]

		currentOrder := "asc"
		if first > second {
			currentOrder = "desc"
		}
		if currentOrder != order {
			isSafe = false
			break
		}
		diff := math.Abs(float64(first - second))
		if diff < 1 || diff > 3 {
			isSafe = false
			break
		}
	}

	return isSafe
}

func getOrder(row []int) string {
	order := "asc"
	if row[0] > row[1] {
		order = "desc"
	}
	return order
}
