import requests
import os
import time
import logging
from bs4 import BeautifulSoup
URL = 'https://www.maynoothuniversity.ie/news-events/latest-news'
page = requests.get(URL)
div_list = {}
soup = BeautifulSoup(page.content, 'html.parser')
div1 = soup.find(class_="row odd first last cf m3_1 m4_1")
first_h2 = div1.select('h2')[0].text
first_p = div1.select('p')[0].text
second_p = div1.select('p')[1].text

div1text ='<p id="innerseminar">' + first_h2 + '\n' + first_p + '\n' +  second_p + '\n' + '</p>'

div2 = soup.find(class_="row odd first cf m3_1 m4_1")
first_h2 = div2.select('h2')[0].text
first_p = div2.select('p')[0].text
second_p = div2.select('p')[1].text

div2text ='<p id="innerseminar">' + first_h2 + '\n' + first_p + '\n' +  second_p + '\n' + '</p>'

div3 = soup.find(class_="row even cf m3_2 m4_2")

first_h2 = div3.select('h2')[0].text
first_p = div3.select('p')[0].text
second_p = div3.select('p')[1].text

div3text ='<p id="innerseminar">' + first_h2 + '\n' + first_p + '\n' +  second_p + '\n' + '</p>'


divalltext = div1text + '\n' + div2text + '\n' + div3text

f = open("/home/pi/MagicMirror/modules/MMM-Maynooth-Information/webdumps/newsdump.txt", "w")
f.write(divalltext)
f.close()
