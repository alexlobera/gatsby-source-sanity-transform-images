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

    const urlSpecificSize = argumentsFirstCall.SanityImageAsset.localFile.resolve(
      { url: "randon-url" },
      { width: 30, height: 20, fit: "crop", format: "jpg" }
    ).url;

    expect(urlSpecificSize).toBe("randon-url?fm=jpg&w=30&h=20&fit=crop");

    const urlOriginalSize = argumentsFirstCall.SanityImageAsset.localFile.resolve(
      { url: "randon-url" },
      { fit: "crop", format: "jpg" }
    ).url;

    expect(urlOriginalSize).toBe("randon-url?fm=jpg&fit=crop");
  });

  it("should extend the SanityImageAsset type adding a localFile field of type File", () => {
    const extendedSanityImageAsset = setFieldsOnGraphQLNodeType({
      type: { name: "SanityImageAsset" }
    });

    expect(extendedSanityImageAsset.localFile.type).toBe("File");
    expect(extendedSanityImageAsset.localFile.args).toMatchSnapshot();
  });
});
