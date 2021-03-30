import requests
import os
import time
import logging
from bs4 import BeautifulSoup
URL = 'https://www.maynoothuniversity.ie/hamilton/seminars/student-seminar-series'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')

results = soup.find(id='node-page-454347')
first_h2 = results.select('h2')[0].text
first_p = results.select('p')[0].text
second_p = results.select('p')[1].text
third_p = results.select('p')[2].text
fourth_p = results.select('p')[3].text
fifth_p = results.select('p')[4].text

alltext = first_h2 + '\n' + first_p + '\n' + second_p + '\n' + third_p + '\n' + fourth_p + '\n' + fifth_p
# print(johnson)

f = open("/home/pi/MagicMirror/modules/MMM-Maynooth-Information/webdumps/studentdump.txt", "w")
f.write(alltext)
f.close()
