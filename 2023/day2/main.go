package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"
)

type Color string

const (
	Red   string = "red"
	Green string = "green"
	Blue  string = "blue"
)

type Set struct {
	red   int
	green int
	blue  int
}

type Game struct {
	id    int
	sets  []Set
	power int
}

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

	maxRed := 12
	maxGreen := 13
	maxBlue := 14
	partOne(lines, maxRed, maxGreen, maxBlue)
	// Should not be parsing by sets at all but too lazy to fix
	partTwo(lines, maxRed, maxGreen, maxBlue)
}

func partOne(lines []string, maxRed, maxGreen, totalBlue int) {
	idsSum := 0
	for _, l := range lines {
		g := parseGame(l)
		possible := true
		for _, s := range g.sets {
			if exceedsTotal(&s, maxRed, maxGreen, totalBlue) {
				possible = false
				break
			}
			if exceedsTotal(&s, maxRed, maxGreen, totalBlue) {
				possible = false
				break
			}
		}
		if possible {
			idsSum += g.id
		}
	}

	fmt.Println(idsSum)
}

func partTwo(lines []string, maxRed, maxGreen, maxBlue int) {
	powerSum := 0
	for _, l := range lines {
		g := parseGame(l)
		powerSum += g.power
	}

	fmt.Println(powerSum)
}

func parseGame(line string) *Game {
	split := strings.Split(line, ": ")

	id, err := strconv.Atoi(strings.Split(split[0], " ")[1])
	if err != nil {
		log.Fatal(err)
	}
	var sets []Set
	g := &Game{
		id:    id,
		sets:  sets,
		power: 1,
	}

	setsSplit := strings.Split(split[1], "; ")
	for _, s := range setsSplit {
		var parsedSet = parseSet(s)
		sets = append(sets, parsedSet)
	}

	g.sets = sets
	maxRed := 1
	maxGreen := 1
	maxBlue := 1
	for _, s := range g.sets {
		if s.red > maxRed {
			maxRed = s.red
		}
		if s.green > maxGreen {
			maxGreen = s.green
		}
		if s.blue > maxBlue {
			maxBlue = s.blue
		}
	}
	g.power = maxRed * maxGreen * maxBlue
	return g
}

func exceedsTotal(set *Set, maxRed, maxGreen, maxBlue int) bool {
	if set.red > maxRed || set.green > maxGreen || set.blue > maxBlue {
		return true
	}

	return false
}

func parseSet(setsInput string) Set {
	var set Set
	rocksSplit := strings.Split(setsInput, ", ")

	for _, rocks := range rocksSplit {
		rockSplit := strings.Split(rocks, " ")
		c, err := strconv.Atoi(rockSplit[0])
		if err != nil {
			log.Fatal(err)
		}
		color := rockSplit[1]
		if color == Red {
			set.red += c
		} else if color == Green {
			set.green += c
		} else if color == Blue {
			set.blue += c
		}
	}

	return set
}
