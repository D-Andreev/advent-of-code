package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
	"unicode"
)

type Coords struct {
	x int
	y int
}

type Number struct {
	value  int
	length int
	coords Coords
}

type Range struct {
	y    int
	minX int
	maxX int
}

func main() {
	lines := parseInput("input")
	var numbers []Number
	symbols := make(map[string]string)

	for y, line := range lines {
		chars := []rune(line)
		for x := 0; x < len(chars); x++ {
			ch := chars[x]
			numberAsStr := ""
			if unicode.IsDigit(ch) {
				numberAsStr += string(ch)
				for m := x + 1; m < len(chars); m++ {
					if unicode.IsDigit(chars[m]) {
						numberAsStr += string(chars[m])
					} else {
						break
					}
				}
				n, err := strconv.Atoi(numberAsStr)
				if err != nil {
					log.Fatal(err)
				}
				numbers = append(numbers, Number{
					value:  n,
					length: len(numberAsStr),
					coords: Coords{
						x: x,
						y: y,
					},
				})
				x += len(numberAsStr) - 1
			} else if ch != '.' {
				symbols[fmt.Sprint(y)+":"+fmt.Sprint(x)] = string(ch)
			}
		}
	}

	sum := 0
	for _, n := range numbers {
		if n.coords.y >= 1 {
			// checkTop
			start := n.coords.x - 1
			if start < 0 {
				start = 0
			}
			end := n.coords.x + n.length
			if end >= len(lines[0]) {
				end = len(lines[0]) - 1
			}
			hasSymbol := false
			for x := start; x >= 0 && x <= end; x++ {
				symbolKey := fmt.Sprint(n.coords.y-1) + ":" + fmt.Sprint(x)
				_, ok := symbols[symbolKey]
				if ok {
					hasSymbol = true
					break
				}
			}
			if hasSymbol {
				sum += n.value
				continue
			}
		}
		if n.coords.y < len(lines)-1 {
			// check bottom
			start := n.coords.x - 1
			if start < 0 {
				start = 0
			}
			end := n.coords.x + n.length
			if end >= len(lines[0]) {
				end = len(lines[0]) - 1
			}
			hasSymbol := false
			for x := start; x >= 0 && x <= end; x++ {
				symbolKey := fmt.Sprint(n.coords.y+1) + ":" + fmt.Sprint(x)
				_, ok := symbols[symbolKey]
				if ok {
					hasSymbol = true
					break
				}
			}
			if hasSymbol {
				sum += n.value
				continue
			}
		}
		if n.coords.x >= 1 {
			// check left
			symbolKey := fmt.Sprint(n.coords.y) + ":" + fmt.Sprint(n.coords.x-1)
			_, ok := symbols[symbolKey]
			if ok {
				sum += n.value
				continue
			}
		}
		if n.coords.x < len(lines[0])-1 {
			// check right
			symbolKey := fmt.Sprint(n.coords.y) + ":" + fmt.Sprint(n.coords.x+n.length)
			_, ok := symbols[symbolKey]
			if ok {
				sum += n.value
				continue
			}
		}
	}

	fmt.Printf("Part one: %d\n", sum)

	gearRatioSum := 0
	for k, s := range symbols {
		if s != "*" {
			continue
		}

		coordsSplit := strings.Split(k, ":")
		y, err := strconv.Atoi(coordsSplit[0])
		if err != nil {
			log.Fatal(err)
		}
		x, err := strconv.Atoi(coordsSplit[1])
		if err != nil {
			log.Fatal(err)
		}
		workingNumbers := make([]Number, len(numbers))
		copy(workingNumbers, numbers)

		var gears []int
		topRange := &Range{
			minX: x - 1,
			maxX: x + 1,
			y:    y - 1,
		}
		if topRange.minX >= 0 && topRange.maxX < len(lines[0]) && y >= 0 && y < len(lines) && len(gears) < 2 {
			for i, n := range workingNumbers {
				if n.coords.y != topRange.y {
					continue
				}
				nStart := n.coords.x
				nEnd := n.coords.x + n.length - 1
				for j := topRange.minX; j <= topRange.maxX; j++ {
					if j >= nStart && j <= nEnd {
						gears = append(gears, n.value)
						workingNumbers = removeIndex(workingNumbers, i)
						break
					}
				}
			}
		}
		bottomRange := &Range{
			minX: x - 1,
			maxX: x + 1,
			y:    y + 1,
		}
		if bottomRange.minX >= 0 && bottomRange.maxX < len(lines[0]) && y >= 0 && y < len(lines) && len(gears) < 2 {
			for i, n := range workingNumbers {
				if n.coords.y != bottomRange.y {
					continue
				}
				nStart := n.coords.x
				nEnd := n.coords.x + n.length - 1
				for j := bottomRange.minX; j <= bottomRange.maxX; j++ {
					if j >= nStart && j <= nEnd {
						gears = append(gears, n.value)
						workingNumbers = removeIndex(workingNumbers, i)
						break
					}
				}
			}
		}
		leftRange := &Range{
			minX: x - 1,
			maxX: x - 1,
			y:    y,
		}
		if leftRange.minX >= 0 && leftRange.maxX < len(lines[0]) && y >= 0 && y < len(lines) && len(gears) < 2 {
			for i, n := range workingNumbers {
				if n.coords.y != leftRange.y {
					continue
				}
				nStart := n.coords.x
				nEnd := n.coords.x + n.length - 1
				for j := leftRange.minX; j <= leftRange.maxX; j++ {
					if j >= nStart && j <= nEnd {
						gears = append(gears, n.value)
						workingNumbers = removeIndex(workingNumbers, i)
						break
					}
				}
			}
		}
		rightRange := &Range{
			minX: x + 1,
			maxX: x + 1,
			y:    y,
		}
		if rightRange.minX >= 0 && rightRange.maxX < len(lines[0]) && y >= 0 && y < len(lines) && len(gears) < 2 {
			for i, n := range workingNumbers {
				if n.coords.y != rightRange.y {
					continue
				}
				nStart := n.coords.x
				nEnd := n.coords.x + n.length - 1
				for j := rightRange.minX; j <= rightRange.maxX; j++ {
					if j >= nStart && j <= nEnd {
						gears = append(gears, n.value)
						workingNumbers = removeIndex(workingNumbers, i)
						break
					}
				}
			}
		}

		if len(gears) >= 2 {
			gearRatioSum += gears[0] * gears[1]
		}
	}

	fmt.Printf("Part two: %d", gearRatioSum)
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

func removeIndex(s []Number, index int) []Number {
	if index >= len(s) {
		return s
	}
	return append(s[:index], s[index+1:]...)
}
