from bs4 import BeautifulSoup
import requests
r = requests.get("https://javascript.programmer-reference.com/js-list-browserobject/").content

soup = BeautifulSoup(r,"html.parser")

answer = []
discription = []

# tags = soup.select("tr")
# for tag in tags:
#         answertag = tag.selrct("td")
#         if len(answertag) > 1:
#                 answer.append(answertag[1].string)
tags = soup.select("tr")
for tag in tags:
    data2 =tag.select("td")
    if len(data2) > 1:
        answer.append(data2[0].string)

tag2 = soup.select("tr")
for tag in tag2:
        data =tag.select("td")
        if len(data) > 1:
                discription.append(data[1].string)

for i in range(0,len(answer)):

    print('"'+str(i+1)+'":{"answer":"'+str(answer[i])+'",\n'
    +'"discription":"'+str(discription[i])+'"},\n')