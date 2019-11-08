# Datavisualisation with D3

## Requirements
* Terminal
* Code Editor

## Install
1. Run the terminal
2. `git clone https://github.com/sarkis1997/functional-programming`
3. Open the complete file in your code editor of choice.
5. `npm i` or `npm install`.
6. `npm run dev` to start the local development server.
    * the app will rebuild everytime you make a change.
    
## Concept
I came with the idea to make something like a collapsible force layout (https://bl.ocks.org/mbostock/1062288). The idea is to collect a type of collection and to show the geolocations of it. Each circle will stand for a continent and the size of it will stand for the amount. I've chosen for this style of data visualization, because I think that the interaction fits good in my concept. And it's also scalable. If I would like I could bring the whole collection in map. First I'll bring up the type of object and after the geolocation with the size.

<img src="https://github.com/sarkis1997/functional-programming/blob/master/src/assets/concept.png">


## Features
* Click to explore
* Hover for details

## API
The API is a dataset of around 700.000 objects of the NMVW. 
I have fetched all the objects.

To be more specific, I have fetched on geographical location starting on the top level and going down levels untill the lowest level. I just need to count the amount of object per geographical location.

* [Geographical location](https://collectie.wereldculturen.nl/thesaurus/?query=search=purl=[termmaster2]&showtype=record#/query/662d3ba5-da86-4dd1-a76f-90863ec0a547)
* Objects

### Query


## License
<a href="https://github.com/sarkis1997/functional-programming/blob/master/LICENSE">MIT</a> @ Sarkis Moeradjan
