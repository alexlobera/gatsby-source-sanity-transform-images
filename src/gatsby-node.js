import { GraphQLInt, GraphQLString } from "gatsby/graphql";
import { createRemoteFileNode } from "gatsby-source-filesystem";

export const setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === `SanityImageAsset`) {
    return {
      localFile: {
        type: `File`,
        args: {
          width: {
            type: GraphQLInt
          },
          format: {
            type: GraphQLString,
            defaultValue: "jpg"
          },
          height: {
            type: GraphQLInt
          },
          fit: {
            type: GraphQLString,
            defaultValue: "crop"
          }
        }
      }
    };
  }

  // by default return empty object
  return {};
};

export const createResolvers = ({
  actions: { createNode },
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const resolvers = {
    SanityImageAsset: {
      localFile: {
        resolve: (source, { width, height, fit, format }) => {
          return createRemoteFileNode({
            url: `${source.url}?fm=${format}${width ? `&w=${width}` : ""}${
              height ? `&h=${height}` : ""
            }&fit=${fit}`,
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
