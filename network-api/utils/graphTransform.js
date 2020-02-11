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

    console.log(root)
    if(root){
        given = edges.filter((edge)=>{
            return (edge.source === root.id)
        })
    
        received = edges.filter((edge)=>{
            return (edge.target === root.id)
        })
    
        given.map((edge)=>{
            let related = nodes.find((n)=>{return n.id === edge.target})
            edge.target = related
            return edge
        })
    
        received.map((edge)=>{
            let related = nodes.find((n)=>{return n.id === edge.source})
            edge.source = related
            return edge
        })
    }

    return {
        root:root,
        received:received,
        given:given
    }
}

module.exports = {
    graphToTree:depthGraphToTree
}