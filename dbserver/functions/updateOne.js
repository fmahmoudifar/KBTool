exports = function({ query, headers, body}, response) {
    const result = context.services
    	.get("mongodb-atlas")
    	.db("examples")
    	.collection("people")
    	.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body()));

    return result;
};
