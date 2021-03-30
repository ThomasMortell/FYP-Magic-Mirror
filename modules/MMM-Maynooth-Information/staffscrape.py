import requests
import os
import time
import logging
from bs4 import BeautifulSoup
URL = 'https://www.maynoothuniversity.ie/news-events/upcoming-events'
page = requests.get(URL)
div_list = {}
soup = BeautifulSoup(page.content, 'html.parser')
div1 = soup.find(class_="row odd first cf m3_1 m4_1")
first_h2 = div1.select('h2')[0].text
first_p = div1.select('p')[0].text
second_p = div1.select('p')[2].text

div1text ='<p id="innerseminar">' + first_h2 + first_p + '\n' + '<br>' + second_p + '\n' + '</p>'

div2 = soup.find(class_="row even cf m3_2 m4_2")
first_h2 = div2.select('h2')[0].text
first_p = div2.select('p')[0].text
second_p = div2.select('p')[1].text
third_p = div2.select('p')[2].text

div2text ='<p id="innerseminar">' + first_h2 + '<br>' + '\n' + first_p + '<br>' + '\n' + second_p + '<br>' + '\n' + third_p + '\n' + '</p>'

div3 = soup.find(class_="row odd cf m3_3 m4_3")
first_h2 = div3.select('h2')[0].text
first_p = div3.select('p')[0].text
second_p = div3.select('p')[1].text
third_p = div3.select('p')[2].text

div3text ='<p id="innerseminar">' + first_h2 + '<br>' + '\n' + first_p + '<br>' + '\n' + second_p + '\n' + '</p>'

alldivs = div1text + '\n' + div2text  + '\n' + div3text

f = open("/home/pi/MagicMirror/modules/MMM-Maynooth-Information/webdumps/staffdump.txt", "w")
f.write(alldivs)
f.close()
