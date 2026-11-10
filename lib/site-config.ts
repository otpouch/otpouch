/** Public marketing configuration only. Never put account data or credentials here. */
export const siteConfig: {
  name: string;
  englishName: string;
  url: string;
  miniProgramCode: string | null;
  miniProgramUrl: string | null;
} = {
  name: "口袋令牌",
  englishName: "otpouch",
  url: "https://otpouch.app",
  // Official release code supplied by the owner; preserve the original image.
  miniProgramCode: "/miniprogram-code.jpg",
  // Optional official WeChat URL Link. Leave null until a real link is available.
  miniProgramUrl: null,
};
