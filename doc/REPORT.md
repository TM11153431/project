# Report

In this file, there is first an explanation of the tackled problem with an introduction of the product. Then, the process is discussed in ample detail. The used technology and features of the product are then highlighted and finally, there are guidlines for further development. 

## The problem

In The Netherlands, there are several room-offering websites which each have different rooms available. For someone who is searching for a room, this is a problem because he or she has to go through all these different websites to get access to the entire offering. Roemie is a response to this problem. 

## The product

Roemie gathers different offerings on one website. The data is presented in a scattergraph, in tables (as numbers but also as percentage of) and in bar charts. In addition to presenting the data in a visually compelling manner, users can also find single rooms with some critical information (namely the city, street, price and square meters). Users can thus search for rooms by city but also by price, surface and streetname. It is possible to go to the room offer by clicking on the last column.

## The process

There were several big steps to the development of the product:
1. Identifying the problem and imagining a solution
2. Designing the layout and deciding on what I wanted to visualize. 
3. Building scrapers to gather data from different room-offering websites. 
4. Cleaning and formating the data.
5. Building the visualizations. 
6. Linking the visualizations.
7. Tell a story around the visualizations.
8. Remove bugs, clean and format code and write this report. 

Details about the process can be found in the process book. To get an idea, the first week (first four days) was spent on [1] - [3]. The second week (days 5 to 9) was spent on [4] and [5]. The third week (days 10 to 14) was spent on completing [5] and making progress in [6]. The fourth week (days 15 to 19) was spent on finishing [6], [7] and [8].

## Used technology

The used technology is split in three sections: 

1. Scraper
	* Python 3.5.2
	* Selenium 
..* BeautifulSoup4
..* Phantomjs 2.1
	
2. HTML/CSS
..* Bootstrap
..* W3
	
3. Javascript
..* D3 V3
..* D3 Topojson
..* jquery
..* Bootstrap dataTables
	
	
## Features

* When a city (in any visualization/html element) is hovered on, the city is highlighted in the Roemie color in all other visualizations. 
* When hovered out, this function ceases and all elements go back to their color. 
* When a city on all the elements but the scattergraph is clicked, the windows scrolls to the table with a filter on the selected city. 
* When a datapoint on the scattergraph is clicked, the room is selected in the table. 
* All the data is set automatically (and thus easily table - even the totals)
* In the table, one can filter, sort and rearrange. 
* In the table, one can click through to the room offering. 

## Data

The data that has been used was scraped on the folling websites: http://www.rooming.nl; http://kamersinnederland.nl and http://kamernet.nl. The following data was scraped for each room: 

* City
* Scraped website
* Link to the room
* Surface (m2)
* Price (€)
* Streetname

## Guidelines for further development

The largest potential of this product lies in the gathered room offerings. A good next start would be to build more scrapers for a larger room offering. Then the datapoints have to be presented in a more compelling manner. It could be a very nice product if that is done. 
