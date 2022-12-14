exports = function({ query, headers, body}, response) {
    const result = context.services
    	.get("mongodb-atlas")
    	.db("examples")
    	.collection("people")
    	.findByIdAndUpdate(query.params.id, JSON.parse(body.text()));

    return result;
};

