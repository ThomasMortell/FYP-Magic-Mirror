import cv2
import numpy as np
import os
import logging
import time

time.sleep(10)

path = 'ImageBank'
orb = cv2.ORB_create(1000, 1.2)

#### Import Images
images = []
classNames= []
myList = os.listdir(path)
print('Number of classes detected', len(myList))
for photo in myList:
    imgCur = cv2.imread(os.path.join(path,photo))
    images.append(imgCur)
    classNames.append(os.path.splitext(photo)[0])
print(classNames)
 
def findDes(images):
    desList=[]
    for img in images:
        kp,des = orb.detectAndCompute(img,None)
        desList.append(des)
    return desList
 
def findID(img, desList,thres=35):
    kp2,des2 = orb.detectAndCompute(img,None)
    bf = cv2.BFMatcher()
    matchList=[]
    finalVal = -1
    try:
        for des in desList:
            matches = bf.knnMatch(des, des2, k=2)
            good = []
            for m, n in matches:
                if m.distance < 0.75 * n.distance:
                    good.append([m])
            matchList.append(len(good))
    except:
        pass
    logging.basicConfig(filename='Datacollection.txt', level=logging.DEBUG, format='')
    logging.info(matchList)
    print(matchList)
    if len(matchList)!=0:
        if max(matchList) > thres:
            finalVal = matchList.index(max(matchList))
        if max(matchList) < thres:
            user = ""
            print("No USER FOUND")
            f = open("/home/pi/MagicMirror/modules/MMM-Identification-Card-Recognition-OpenCV/public/userlist.txt", "w")
            f.write(user)
            f.close()

    return finalVal

        
desList = findDes(images)
print(len(desList))

cap = cv2.VideoCapture(0)
 
while True:
 
    success, img2 = cap.read()
    imgOriginal = img2.copy()
    img2 = cv2.cvtColor(img2,cv2.COLOR_BGR2GRAY)
 
    id = findID(img2,desList)
    if id != -1:
        user = classNames[id]
        print("User Detected: {}!".format(classNames[id]))
        f = open("/home/pi/MagicMirror/modules/MMM-Identification-Card-Recognition-OpenCV/public/userlist.txt", "w")
        f.write(user)
        f.close()
        time.sleep(120)
