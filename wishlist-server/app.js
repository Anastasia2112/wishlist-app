const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./shema/schema')

const port = 3005;

const app = express();


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, console.log(`Server started on port ${port}`));