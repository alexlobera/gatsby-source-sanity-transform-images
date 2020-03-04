import { GraphQLInt, GraphQLString } from "gatsby/graphql";
import { createRemoteFileNode } from "gatsby-source-filesystem";
import { ImageFormatType } from "./types";

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
            type: ImageFormatType
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
          const url = `${source.url}?fit=${fit}${format ? `&fm=${format}`: ''}${width ? `&w=${width}` : ''}${height ? `&h=${height}` : ''}`;
          return createRemoteFileNode({
            url,
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
