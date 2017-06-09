# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import re
import pymysql
import ssl
from datetime import datetime
from urllib.request import urlopen
import csv


links = []
prijzen = []
straten = []
steden = []
oppervlaktes = []
websites = []

def kamerVerhuur(paginas, stad):

        #for each page, go through this loop
        for page in range(paginas):
            page = page + 1
            page = str(page)
            url = ("https://www.kamerverhuur.nl/huren/kamers-"+ stad +"/page:"+page)
            gcontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
            html = urlopen(url, context=gcontext)
            bsObj = BeautifulSoup(html, "html.parser")

            for link in bsObj.findAll('', {'class':'thumbnail'}):
                link = ('https://www.kamerverhuur.nl' + link.find('a').get('href'))
                html2 = urlopen(link, context = gcontext)
                bsObj2 = BeautifulSoup(html2, "html.parser")

                links.append(link)
                websites.append('Kamerverhuur')
                steden.append('Amsterdam')

                try:
                    prijzen.append(bsObj2.find('', {'style':'font-size:30px;'}).text.replace(',00 p.m. (incl.)', '').replace(',00 p.m. (excl.)', '').replace(' ', ''))
                except:
                    prijzen.append('00')
                try:
                    straten.append(bsObj2.find('h1').text.replace('Kamer ', '').replace(' Amsterdam', ''))
                except:
                    straten.append('x')
                try:
                    oppervlaktes.append(bsObj2.findAll('', {'style':'font-size:23px;'})[0].text.replace(' m²', '').replace('Oppervlakte: ', ''))
                except:
                    oppervlaktes.append('00')

def rooming(paginas, stad):

    #connect and login  with selenium
    driver = webdriver.PhantomJS(executable_path='phantomjs-2.1.1-macosx/bin/phantomjs')
    driver.get('https://rooming.nl/login')

    #find and insert login
    username = driver.find_element_by_name("_username")
    password = driver.find_element_by_name("_password")
    username.send_keys("godo@malinator.com")
    password.send_keys("123123")

    # submit login and wait for page to load
    clickify = driver.find_element_by_name("_submit")
    clickify.submit()

    currentUrl = "http://www.rooming.nl/woning-huren/" + stad

    #foreach page, go through this loop
    for page in range(paginas):
        page = page + 1
        page = str(page)

        driver.get(currentUrl)
        time.sleep(3)
        driver.find_element_by_link_text(page).click()
        time.sleep(3)
        currentUrl = driver.current_url

        pageSource = driver.page_source
        bsObj = BeautifulSoup(pageSource, "html.parser")

        links_check = []

        for link in bsObj.findAll('', {'class':'zoek-resultaat-tekst'}):
            link = ('http://rooming.nl' + link.find('a').get('href'))
            driver.get(link)
            pageSource = driver.page_source
            bsObj2 = BeautifulSoup(pageSource, "html.parser")

            links.append(link)
            websites.append('Rooming')

            prijzen.append(bsObj2.find('', {'class':'table table-striped'}).findAll('td')[9].text.replace('€ ', ''))
            try:
                oppervlaktes.append(bsObj2.find('', {'class':'table table-striped'}).findAll('td')[7].text.replace(' m²', ''))
            except:
                oppervlaktes.append('00')
            try:
                straten.append(bsObj2.find('', {'class':'table table-striped'}).findAll('td')[3].text)
            except:
                straten.append('x')
            if "haag" in stad:
                steden.append('Den Haag')
            else:
                steden.append(stad)

def kamers(paginas):

        #foreach page, go through this loop
        for page in range(paginas):

            if (page > 0):
                page = (page * 15)
            page = str(page)

            #prepare connection with the website and ensure SSL comptability
            url = ("https://www.kamers.nl/huren/amsterdam/?s="+page)
            gcontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
            html = urlopen(url, context=gcontext)
            bsObj = BeautifulSoup(html, "html.parser")

            #find links
            for link in bsObj.findAll('', {'itemtype':'http://schema.org/PostalAddress'}):
                link = "http://www.kamers.nl" + link.find('a').get('href')

                html2 = urlopen(link, context=gcontext)
                bsObj2 = BeautifulSoup(html2, "html.parser")

                links.append(link)
                steden.append('Amsterdam')
                websites.append('Kamers')

                try:
                    prijzen.append(bsObj2.find('', {'class':'price'}).text.replace('€ ', '').replace(' p/m', '').replace(' Per maand', ''))
                except:
                    prijzen.append('00')
                try:
                    begindata.append(bsObj2.find('tbody').findAll('td')[1].text.replace('  ', '').replace('\n', '').replace(' februari ', '-02-')
                                .replace(' januari ', '-01-').replace(' maart ', '-03-').replace(' april ', '-04-')
                                .replace(' mei ', '-05-').replace(' juni ', '-06-').replace(' juli ', '-07-').replace(' augustus ', '-08-')
                                .replace(' september ', '-09-').replace(' oktober ', '-10-').replace(' november ', '-11-')
                                .replace(' december ', '-12'))
                except:
                    begindata.append(currentData)
                try:
                    oppervlaktes.append(bsObj2.findAll('tbody')[1].findAll('td')[1].text.replace('  ', '').replace('\n', '').replace(' m²', ''))
                except:
                    oppervlaktes.append('00')
                try:
                    omschrijvingen.append(bsObj2.find('', {'class':'description'}).find('div').text)
                except:
                    omschrijvingen.append('x')
                try:
                    straten.append(bsObj2.findAll('', {'itemprop':'title'})[3].text)
                except:
                    straten.append('x')

def kamersInNederland(paginas, stad):

    #for each page, go through this loop
    for page in range(paginas):
        page = page + 1
        page = str(page)
        url = ('https://www.kamersinnederland.nl/' + stad +'/pagina/'+page)
        gcontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
        html = urlopen(url, context=gcontext)
        bsObj = BeautifulSoup(html, "html.parser")

        #find links
        for link in bsObj.findAll("", {"class":"col-md-6 col-sm-12 roomBlock"}):
            link = link.get('data-url')
            url2 = (link)
            html2 = urlopen(url2, context=gcontext)
            bsObj2 = BeautifulSoup(html2, "html.parser")

            websites.append('KamersInNederland')
            steden.append('Amsterdam')
            links.append(link)

            try:
                prijzen.append(bsObj2.find('', {'class':'table'}).findAll('td')[6].text.replace('€', '').replace(' p/m excl.', '').replace(' p/m incl.', ''))
            except:
                prijzen.append('00')
            try:
                oppervlaktes.append(bsObj2.find('', {'class':'table'}).findAll('td')[8].text.replace('Contact landlord', '00').replace('m2', ''))
            except:
                oppervlaktes.append('00')
            try:
                straat = bsObj2.findAll('h1')[1].text
                if len(straat) < 30:
                    straten.append(bsObj2.findAll('h1')[1].text)
                else:
                    oppervlaktes.pop()
                    prijzen.pop()
                    links.pop()
                    websites.pop()
                    continue
            except:
                straten.append('x')

def kamerNet(paginas, stad):

        #foreach page, go through this loop
        for page in range(paginas):
            page = page + 1
            page = str(page)

            #prepare connection with the website and ensure SSL comptability
            url = ("https://kamernet.nl/huren/kamer-"+stad+"?pageno="+page)
            gcontext = ssl.SSLContext(ssl.PROTOCOL_TLSv1)
            html = urlopen(url, context=gcontext)
            bsObj = BeautifulSoup(html, "html.parser")

            #prepare link_item
            for link in bsObj.findAll("", {"class":"room-tile rowSearchResultRoom"}):
                links.append(link.get('href'))
                websites.append('kamerNet')
                if "haag" in stad:
                    steden.append('Den Haag')
                else:
                    steden.append(stad)

            #prepare price_item
            for prijs in bsObj.findAll("", {"class":"rent truncate"}):
                prijs = prijs.text
                prijs = prijs.replace('€ ', '')
                prijs = prijs.replace(',-', '')
                prijzen.append(prijs)

            #prepare street_item
            for straat in bsObj.findAll("", {"itemprop":"streetAddress"}):
                straten.append(straat.text)

            #prepare size_item
            for oppervlakte in bsObj.findAll("", {"class":"title truncate"}):
                oppervlakte = oppervlakte.text
                if len(oppervlakte) < 8:
                    oppervlakte = oppervlakte[:2]
                    try:
                        oppervlakte = int(oppervlakte)
                        oppervlaktes.append(oppervlakte)
                    except:
                        straten.pop()
                        prijzen.pop()
                        links.pop()
                        websites.pop()
                        continue

def goThroughAllCitiesAndWebsites():
    kamerNet(20, 'amsterdam')
    kamerNet(22, 'rotterdam')
    kamerNet(16, 'utrecht')
    kamerNet(26, 'groningen')
    kamerNet(3, "den%20haag")
    #give signal that the job is done
    print("Kamernet: done")

    # very little results, so maybe best not to use (can complicate the data)
    #kamerVerhuur(4, 'amsterdam')
    #print('Kamerverhuur: done.')

    rooming(16, 'amsterdam')
    rooming(5, 'groningen')
    rooming(18, "den%20haag")
    rooming(10, 'rotterdam')
    rooming(6, 'amsterdam')

    print('Rooming: done.')

    #kamers(4)
    print('Kamers: done.')

    kamersInNederland(23, 'amsterdam')
    kamersInNederland(2, 'utrecht')
    kamersInNederland(2, 'rotterdam')
    kamersInNederland(1, 'groningen')
    #print('kamersInNederland: done.')

def printList():
    i = 0
    for link in links:
        stad = steden[i]
        straat = straten[i]
        prijs = prijzen[i]
        oppervlakte = oppervlaktes[i]
        #plaatsdatum = plaatsdata[i]
        #begindatum = begindata[i]
        #omschrijving = omschrijvingen[i]
        #afbeelding = afbeeldingen[i]
        #afbeelding2 = afbeeldingen2[i]
        #afbeelding3 = afbeeldingen3[i]
        website = websites[i]
        link = links[i]
        print(stad, straat, prijs, oppervlakte, website, link)
        i += 1

def makeFile():
    i = 0
    with open('rooming_data_0806.csv', 'w') as csvfile:
        fieldnames = ['stad', 'straat', 'prijs', 'oppervlakte', 'website', 'link']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for link in links:
            stad = steden[i]
            straat = straten[i]
            prijs = prijzen[i]
            oppervlakte = oppervlaktes[i]
            #plaatsdatum = plaatsdata[i]
            #begindatum = begindata[i]
            #omschrijving = omschrijvingen[i]
            #afbeelding = afbeeldingen[i]
            #afbeelding2 = afbeeldingen2[i]
            #afbeelding3 = afbeeldingen3[i]
            website = websites[i]
            link = links[i]

            writer.writerow({'stad' : stad, 'straat':straat, 'prijs':prijs, 'oppervlakte': oppervlakte, 'website': website, 'link': link})

            print(stad, straat, prijs, oppervlakte, website, link)

            i += 1

goThroughAllCitiesAndWebsites()
printList()
makeFile()
