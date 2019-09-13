"use strict";

exports.__esModule = true;
exports.createResolvers = exports.setFieldsOnGraphQLNodeType = void 0;

var _graphql = require("gatsby/graphql");

var _gatsbySourceFilesystem = require("gatsby-source-filesystem");

const setFieldsOnGraphQLNodeType = ({
  type
}) => {
  if (type.name === `SanityImageAsset`) {
    return {
      localFile: {
        type: `File`,
        args: {
          width: {
            type: _graphql.GraphQLInt,
            defaultValue: 600
          },
          format: {
            type: _graphql.GraphQLString,
            defaultValue: "jpg"
          },
          height: {
            type: _graphql.GraphQLInt
          },
          fit: {
            type: _graphql.GraphQLString,
            defaultValue: "crop"
          }
        }
      }
    };
  } // by default return empty object


  return {};
};

exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType;

const createResolvers = ({
  actions: {
    createNode
  },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const resolvers = {
    SanityImageAsset: {
      localFile: {
        resolve: (source, {
          width,
          height,
          fit,
          format
        }) => {
          return (0, _gatsbySourceFilesystem.createRemoteFileNode)({
            url: `${source.url}?w=${width}&fm=${format}${height ? `&h=${height}` : ""}&fit=${fit}`,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    }
  };
  createResolvers(resolvers);
};

exports.createResolvers = createResolvers;