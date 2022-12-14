exports = function({ query, headers, body}, response) {
    
  const docs = context.services
    .get("mongodb-atlas")
    .db("test")
    .collection("names")
    .find(query.params.id)
    .toArray();
    
  return docs;
};


