exports = function({ query, headers, body}, response) {
    
  const docs = context.services
    .get("mongodb-atlas")
    .db("test")
    .collection("names")
    .find({})
    .toArray();
    
  return docs;
};
