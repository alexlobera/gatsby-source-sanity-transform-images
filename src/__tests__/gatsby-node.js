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

    const { url } = argumentsFirstCall.SanityImageAsset.localFile.resolve(
      { url: "randon-url" },
      { width: 30, height: 20, fit: "crop", format: "jpg" }
    );

    expect(url).toBe("randon-url?w=30&fm=jpg&h=20&fit=crop");
  });

  it("should extend the SanityImageAsset type adding a localFile field of type File", () => {
    const extendedSanityImageAsset = setFieldsOnGraphQLNodeType({
      type: { name: "SanityImageAsset" }
    });

    expect(extendedSanityImageAsset.localFile.type).toBe("File");
    expect(extendedSanityImageAsset.localFile.args).toMatchSnapshot();
  });
});
