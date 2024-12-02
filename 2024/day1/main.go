package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	// partOne()
	var score int64
	left, right := readInput("./input.txt")
	rightMap := make(map[int64]int64)

	for i := 0; i < len(right); i++ {
		_, ok := rightMap[right[i]]
		if !ok {
			rightMap[right[i]] = 1
			continue
		}
		rightMap[right[i]]++
	}

	for i := 0; i < len(left); i++ {
		count, ok := rightMap[left[i]]
		if ok {
			score += left[i] * count
		}
	}

	fmt.Println(score)
}

func partOne() {
	var total int64
	left, right := readInput("./small-input.txt")

	sort.Slice(left, func(i, j int) bool { return left[i] < left[j] })
	sort.Slice(right, func(i, j int) bool { return right[i] < right[j] })

	for i := 0; i < len(left); i++ {
		if left[i] > right[i] {
			total += left[i] - right[i]
		} else {

			total += right[i] - left[i]
		}
	}

	fmt.Println(total)
}

func readInput(path string) ([]int64, []int64) {
	var left []int64
	var right []int64
	dat, err := os.ReadFile(path)
	if err != nil {
		panic(err)
	}

	str := string(dat)
	rows := strings.Split(str, "\n")

	for _, s := range rows {
		if len(s) == 0 {
			break
		}
		split := strings.Fields(s)
		l, err := strconv.ParseInt(split[0], 0, 64)
		if err != nil {
			panic(err)
		}
		left = append(left, l)
		r, err := strconv.ParseInt(split[1], 0, 64)
		if err != nil {
			panic(err)
		}
		right = append(right, r)
	}

	return left, right
}
