tempSet = set()

with open("wordlist2.txt") as file:
    for line in file.readlines():
        tempSet.add(line.rstrip())


with open("wordList.txt", "w") as file:
    for line in tempSet:
        file.write(line)
        file.write('\n')


