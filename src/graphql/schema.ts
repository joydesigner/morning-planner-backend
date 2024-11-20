import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLNonNull, GraphQLInputObjectType } from "graphql";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

// User type definition
const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: { type: GraphQLString },
        profileName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    },
});

// Signup input type
const SignupInputType = new GraphQLInputObjectType({
    name: "SignupInput",
    fields: {
        profileName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
});

// Root mutation
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        registerUser: {
            type: UserType,
            args: {
                input: { type: SignupInputType },
            },
            resolve: async (_: any, { input }: any) => {
                const { profileName, email, password } = input;

                // Check if the user already exists
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error("User with this email already exists.");
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create and save a new user
                const newUser = new User({
                    profileName,
                    email,
                    password: hashedPassword,
                });

                await newUser.save();

                return {
                    id: newUser._id.toString(),
                    profileName: newUser.profileName,
                    email: newUser.email,
                    createdAt: newUser.createdAt.toISOString(),
                    updatedAt: newUser.updatedAt.toISOString(),
                };
            },
        },
    },
});

// Root query
const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        getUserByEmail: {
            type: UserType,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve: async (_: any, { email }: any) => {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error("User not found.");
                }
                return {
                    id: user._id.toString(),
                    profileName: user.profileName,
                    email: user.email,
                    createdAt: user.createdAt.toISOString(),
                    updatedAt: user.updatedAt.toISOString(),
                };
            },
        },
    },
});

// Export the GraphQL schema
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});