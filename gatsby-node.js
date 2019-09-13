"use strict";

var _require = require('gatsby/graphql'),
    GraphQLInt = _require.GraphQLInt,
    GraphQLString = _require.GraphQLString;

var _require2 = require("gatsby-source-filesystem"),
    createRemoteFileNode = _require2.createRemoteFileNode;

exports.setFieldsOnGraphQLNodeType = function (_ref) {
  var type = _ref.type;

  if (type.name === "SanityImageAsset") {
    return {
      localFile: {
        type: "File",
        args: {
          width: {
            type: GraphQLInt,
            defaultValue: 600
          },
          format: {
            type: GraphQLString,
            defaultValue: 'jpg'
          },
          height: {
            type: GraphQLInt
          },
          fit: {
            type: GraphQLString,
            defaultValue: 'crop'
          }
        }
      }
    };
  } // by default return empty object


  return {};
};

exports.createResolvers = function (_ref2) {
  var createNode = _ref2.actions.createNode,
      cache = _ref2.cache,
      createNodeId = _ref2.createNodeId,
      createResolvers = _ref2.createResolvers,
      store = _ref2.store,
      reporter = _ref2.reporter;
  var resolvers = {
    SanityImageAsset: {
      localFile: {
        resolve: function resolve(source, _ref3) {
          var width = _ref3.width,
              height = _ref3.height,
              fit = _ref3.fit,
              format = _ref3.format;
          return createRemoteFileNode({
            url: "".concat(source.url, "?w=").concat(width, "&fm=").concat(format).concat(height ? "&h=".concat(height) : '', "&fit=").concat(fit),
            store: store,
            cache: cache,
            createNode: createNode,
            createNodeId: createNodeId,
            reporter: reporter
          });
        }
      }
    }
  };
  createResolvers(resolvers);
};