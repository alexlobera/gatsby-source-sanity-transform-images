jest.mock(`gatsby-source-filesystem`);
import {
  createResolvers as pluginCreateResolvers,
  setFieldsOnGraphQLNodeType
} from "../gatsby-node";
import expect from "expect";

describe("createResolvers", () => {
  it("should define a resolver for the localFile field in SanityImageAsset type", () => {
    const createResolvers = jest.fn();

    pluginCreateResolvers({ createResolvers, actions: {} });

    const argumentsFirstCall = createResolvers.mock.calls[0][0];
    expect(argumentsFirstCall.SanityImageAsset).not.toBeFalsy();
    expect(argumentsFirstCall.SanityImageAsset.localFile).not.toBeFalsy();
  });

  it("should extend the SanityImageAsset type adding a localFile field of type File", () => {
    const extendedSanityImageAsset = setFieldsOnGraphQLNodeType({
      type: { name: "SanityImageAsset" }
    });

    expect(extendedSanityImageAsset.localFile.type).toBe("File");
    expect(extendedSanityImageAsset.localFile.args).toMatchSnapshot();
  });
});
