const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;

const wishes = [
    { id: '1', name: 'Пылесос', link: 'http...', price: 18000, img: 'допустим, картинка', userId: '2'},
    { id: '2', name: 'Кроссовки', link: 'http...', price: 5000, img: 'допустим, картинка', userId: '1'},
    { id: '3', name: 'Машина', link: 'http...', price: 350000, img: 'допустим, картинка', userId: '2'},
    { id: '4', name: 'Сумка', link: 'http...', price: 350000, img: 'допустим, картинка', userId: '2'},
    { id: '5', name: 'Дрель', link: 'http...', price: 350000, img: 'допустим, картинка', userId: '1'},
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
        user: {
            type: UserType,
            resolve(parent, args) {
                return users.find(user => user.id === parent.userId);
            }
        }
    }),
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastname: { type: GraphQLString },
        email: { type: GraphQLString },
        wishes: {
            type: new GraphQLList(WishType),
            resolve(parent, args) {
                return wishes.filter(wish => wish.userId == parent.id);
            }
        }
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        getWishById: {
            type: WishType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return wishes.find(wish => wish.id == args.id);
            }
        },
        getUserById: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return users.find(user => user.id == args.id);
            }
        },
        getAllWishes: {
            type: new GraphQLList(WishType),
            resolve(parent, args) {
                return wishes;
            }
        },
        getAllUsers: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users;
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});