# TorreNetworks
Torre networks *DEMO VERSION*, show one page with all recommendations given and received by one Torre user with two weight variables shown as color bars.

Acces the demo with this [link](https://infinite-dusk-56912.herokuapp.com)

## Progress Log

1. Idea Conception
The original Torre Networks idea was to visualize the graph network as a d3 circle model using the same principle of weights to shape them and using a search module to find the starting node.

2. Technologies and frameworks
As the application doesn't have its own database, and only consumes third party endpoints, Metheor frameworks and similar are not good options. Reactjs as a front-end framework provide single component re-rendering as data changes giving the option to interact with high amounts of data and avoid re-renderings. Using express allows for a complete javascript project allowing it to be fast in prototyping.

3. API Building
Only one endpoint was enabled


 Endpoint| Params
 --- |---
 api/network/:username | Torre publicId 
 
 *Endpoint Response*
 root- username graph node
 given- list of edges merged with nodes of all who the root recommend
 received- list of edges merged with nodes of all recommendations
 maxEdgeGivenW- Max weight of a node recommended by root
 maxEdgeReceiW- Max weight of a node who recommended root
 maxGiven- Max weight of a recommendation by root
 maxReceived- Max weight of a recommended by root

4. Pre-process data
Development of the algorithm which preprocess data in the backend.

5. Api test

6. Front-end development
Considered D3 but, as times runs out replaced by vanilla CSS3.

7. Added React Router

8. Created production build and heroku app.

### Missing from the original Idea.
- Search Page
- Home Page
- Order criteria for networks page
- Link to users and full routing
