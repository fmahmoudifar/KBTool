exports = function({ query, headers, body}, response) {
    const {email} = query;
    const mongodb = context.services.get("mongodb-atlas");
    // query realm app users by email to retrieve userId ?????

    if (userId){
      const collection = mongodb.db('test').collection('names')
      const filter = { userId }
      const update = {
        $set: { variable: true },
      }
      collection.updateOne(filter, update) 
    }
};