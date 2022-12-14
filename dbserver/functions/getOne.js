exports = function({ query, headers, body}, response) {
    
  const docs = context.services
    .get("mongodb-atlas")
    .db("test")
    .collection("names")
    .find({headers})
    .toArray();
    
  return docs;
};
