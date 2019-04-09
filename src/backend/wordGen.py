# WordGen.py
import json
import urllib.request

word = "computer"
masterSet = set()
tempSet = set()


with open("wordlist.txt") as file:
    for line in file.readlines():
        tempSet.add(line.rstrip())
       
def makeUrl(word):
    return "http://words.bighugelabs.com/api/2/2b015152d27928ac51f6321ca9d17b0f" + word + "/json";

i = 1
for word in tempSet:
    try:
        print("Pass #: {}".format(i))
        i+=1
        response = urllib.request.urlopen(makeUrl(word))
        text = response.read().decode('utf-8')
        jsonResult = json.loads(text)

        for r in jsonResult:
            try:
                temp = jsonResult[r]["syn"]
                masterSet.update(temp)
               # print(temp)
                #for word in temp:
                 #   masterSet.add(word)
            except:
                pass
    except: pass

print("moving to file")
with open("wordlist.txt", "w") as file:
    for line in masterSet:
        file.write(line)
        file.write('\n')
