const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;

const wishes = [
    { id: '1', name: 'Пылесос', link: 'http...', price: 18000, img: 'допустим, картинка'},
    { id: '2', name: 'Кроссовки', link: 'http...', price: 5000, img: 'допустим, картинка'},
    { id: '3', name: 'Машина', link: 'http...', price: 350000, img: 'допустим, картинка'},
];

const users = [
    { id: '1', firstName: 'Иванов', lastname: 'Иван', email: 'ex@mail.ru' },
    { id: '2', firstName: 'Мария', lastname: 'Мариева', email: 'teat@mail.ru' },
];

const WishType = new GraphQLObjectType({
    name: 'Wish',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        link: { type: GraphQLString },
        price: { type: GraphQLInt },
        img: { type: GraphQLString },
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getWishById: {
            type: WishType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return wishes.find(wish => wish.id == args.id)
            }
        },
        getUserById: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return users.find(user => user.id == args.id)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});