from bs4 import BeautifulSoup
import requests
r = requests.get("https://www.tagindex.com/stylesheet/properties/").content

soup = BeautifulSoup(r,"html.parser")

tags = soup.select(".property")

answer = []
discription = []

for tag in tags:
    answertag = tag.string
    answer.append(answertag)
    
tag2 = soup.select("tr")
for tag in tag2:
     data = tag.select("td")
    #   print(data)
     if len(data) > 3:
        # print(data[2].string)
        discription.append(data[1].string)



for i in range(0,len(answer)):

    print('"'+str(i+1)+'":{"answer":"'+str(answer[i])+'",\n'
    +'"discription":"'+str(discription[i])+'"},\n')