import { GraphQLEnumType } from "gatsby/graphql";

export const ImageFormatType = new GraphQLEnumType({
  name: 'SanityTransformImagesImageFormat',
  values: {
    JPG: { value: 'jpg' },
    PJPG: { value: 'pjpg' },
    PNG: { value: 'png' },
    WEBP: { value: 'webp' },
  },
});

export const ImageFitType = new GraphQLEnumType({
  name: `SanityTransformImagesImageFit`,
  values: {
    CROP: { value: 'crop', description: 'Crops the image to fill the size you specified when you specify both w and h' },
    CLIP: { value: 'clip', description: 'The image is resized to fit within the bounds you specified without cropping or distorting the image.' },
    FILL: { value: 'fill', description:  'Like clip, but the any free area not covered by your image is filled with the color specified in the bg parameter.' },
    FILLMAX: { value: 'fillmax', description: 'Places the image within box you specify, never scaling the image up. If there is excess room in the image, it is filled with the color specified in the bg parameter.' },
    MAX: { value: 'max', description: 'Fit the image within the box you specify, but never scaling the image up.' },
    SCALE: { value: 'scale', description: 'Scales the image to fit the constraining dimensions exactly. The resulting image will fill the dimensions, and will not maintain the aspect ratio of the input image.' },
    MIN: { value: 'min', description: 'Resizes and crops the image to match the aspect ratio of the requested width and height. Will not exceed the original width and height of the image.' },
  },
})
