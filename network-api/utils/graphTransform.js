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

    if(root){
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

        //max weight of someone who you recommended
        var maxEdgeGivenW = given.reduce((prev, curr)=>{
            let currentValue = curr.target.metadata.weight;
            return (prev.target.metadata.weight > currentValue)?prev:curr;
        })
        
        //max weight of someone who you received recommendations from
        var maxEdgeReceiW = received.reduce((prev, curr)=>{
            let currentValue = curr.source.metadata.weight;
            return (prev.source.metadata.weight > currentValue)?prev:curr;
        })

        //max weight of a recommendation given
        var maxGiven = given.reduce((prev, curr)=>{
            console.log(prev)
            return (prev.metadata.weight>curr.metadata.weight)?prev:curr;
        })

        //max weight of a recommendation received
        var maxReceived = received.reduce((prev, curr)=>{
            return (prev.metadata.weight>curr.metadata.weight)?prev:curr;
        })
    }

    return {
        root:root,
        received:received,
        given:given,
        maxEdgeGivenW:maxEdgeGivenW.target.metadata.weight,
        maxEdgeReceiW:maxEdgeReceiW.source.metadata.weight,
        maxGiven:maxGiven.metadata.weight,
        maxReceived:maxReceived.metadata.weight
    }
}

module.exports = {
    graphToTree:depthGraphToTree
}