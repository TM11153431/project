{\rtf1\ansi\ansicpg1252\cocoartf1404\cocoasubrtf470
{\fonttbl\f0\fswiss\fcharset0 ArialMT;\f1\froman\fcharset0 Times-Roman;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 As presented in the first design draft of my product, there are three main parts to the design that are intertwined. The first part (1) commands the two other parts (2) and (3). 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 # (1)
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 This part can be displayed in two fashions: (a) map or (b) list. To display the map, d3 and topojson will be used. The tabs will be simple HTML elements. The list will also be a html element which is populated by the room data in csv or json format. 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 When a city is clicked in this part, the two other views are toggled.
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 # (2)
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 The second part consists first of (a) a short story and a graph with what the data said a couple of years ago. Second (b), a scattergraph which was toggled by the clicked city displays prices and surfaces of the rooms in the given city. 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 # (3)
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 The third and last part contains a table with a listing of all the available rooms in a given city. There is a possibility to filter this list based on price and/or surface. I don\'92t know yet how I\'92m going to build the filter. Furthermore, even though (2) and (3) do not influence (1), they can interact with each other. In fact, when clicking a dot on the scattergraph or a row in the table, the corresponding datapoint in the opposite frame is highlighted in some fashion. 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 # Data needs
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 ## Sources: 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 Kamernet.nl
\f1\fs24 \

\f0\fs30 KamersInNederland.nl
\f1\fs24 \

\f0\fs30 Rooming.nl
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 These are the largest room websites in The Netherlands. I have built scrapers that store the data in csv format. 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 Topojson for the map
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 ## Data
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 I\'92m using geojson for the map and the collected data of the rooms has the following variables: price, link, surface, website, city and street. 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 # Libraries and frameworks
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 Bootstrap
\f1\fs24 \

\f0\fs30 D3
\f1\fs24 \

\f0\fs30 Selenium
\f1\fs24 \

\f0\fs30 BeautifulSoup
\f1\fs24 \

\f0\fs30 Topojson
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
\pard\pardeftab720\sl400\partightenfactor0

\f0\fs30 \cf2 These are just the libraries that I have needed up until now. This will probably change in the coming week or two. 
\f1\fs24 \
\pard\pardeftab720\sl320\partightenfactor0
\cf2 \'a0\
}