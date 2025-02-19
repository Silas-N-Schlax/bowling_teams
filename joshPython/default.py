import json
import statistics

file = open('data/scores.json','r')
data = json.load(file)

playerScores = {}

scores = []

for i in data['scores']:
    scoresList = i['scores']
    average = statistics.mean(scoresList)
    scores.append(average)

    playerScores[i['playerName']] =  average


print(dict(sorted(playerScores.items(), key=lambda item: item[1])))
print(sorted(scores))
print(statistics.mean(scores))