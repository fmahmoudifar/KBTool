exports = function({ query, headers, body}, response) {
    const result = context.services
    	.get("mongodb-atlas")
    	.db("test")
    	.collection("names")
    	.insertOne(JSON.parse(body.text()));

    return result;
};

