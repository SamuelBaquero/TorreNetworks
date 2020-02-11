//Pre processes data for graph visualization

const depthGraphToTree = function(data, username){
    let graph = data.graph
    let nodes = graph.nodes
    let edges = graph.edges

    let root = nodes.find((node)=>{
        return (node.metadata.publicId === username)
    })

    let given = []
    let received = []

    given = edges.filter((edge)=>{
        return (edge.source === root.id)
    })

    received = edges.filter((edge)=>{
        return (edge.target === root.id)
    })

    //Finds the metadata of someone who you recommend and append it to target
    given.map((edge)=>{
        let related = nodes.find((n)=>{return n.id === edge.target})
        edge.target = related
        return edge
    })
    
    //Finds the metadata of someone who recommended you and append it to source
    received.map((edge)=>{
        let related = nodes.find((n)=>{return n.id === edge.source})
        edge.source = related
        return edge
    })

    var maxEdgeGivenW = 0
    var maxGiven = 0
    if(given.length>0){
        //max weight of someone who you recommended
        var protMaxEdgeGivenW = given.reduce((prev, curr)=>{
            let currentValue = curr.target.metadata.weight;
            return (prev.target.metadata.weight > currentValue)?prev:curr;
        })
        maxEdgeGivenW = protMaxEdgeGivenW.target.metadata.weight

        //max weight of a recommendation given
        protMaxGiven = given.reduce((prev, curr)=>{
            return (prev.metadata.weight>curr.metadata.weight)?prev:curr;
        })
        maxGiven = protMaxGiven.metadata.weight
    }
    
    var maxEdgeReceiW = 0
    var maxReceived = 0
    if(received.length>0){
        //max weight of someone who you received recommendations from
        var protMaxEdgeReceiW = received.reduce((prev, curr)=>{
            let currentValue = curr.source.metadata.weight;
            return (prev.source.metadata.weight > currentValue)?prev:curr;
        })
        maxEdgeReceiW = protMaxEdgeReceiW.source.metadata.weight

        //max weight of a recommendation received
        var protMaxReceived = received.reduce((prev, curr)=>{
            return (prev.metadata.weight>curr.metadata.weight)?prev:curr;
        })
        maxReceived = protMaxReceived.metadata.weight
    }

    return {
        root:root,
        received:received,
        given:given,
        maxEdgeGivenW:maxEdgeGivenW,
        maxEdgeReceiW:maxEdgeReceiW,
        maxGiven:maxGiven,
        maxReceived:maxReceived
    }
}

module.exports = {
    graphToTree:depthGraphToTree
}