/** Public marketing configuration only. Never put account data or credentials here. */
export const siteConfig: {
  name: string;
  englishName: string;
  url: string;
  githubUrl: string;
  miniProgramCode: string | null;
  miniProgramUrl: string | null;
  desktopDownloads: {
    macos: string;
    windows: string;
  };
} = {
  name: "口袋令牌",
  englishName: "otpouch",
  url: "https://otpouch.app",
  githubUrl: "https://github.com/otpouch/otpouch",
  // Official release code supplied by the owner; preserve the original image.
  miniProgramCode: "/miniprogram-code.jpg",
  // Optional official WeChat URL Link. Leave null until a real link is available.
  miniProgramUrl: null,
  desktopDownloads: {
    macos: "/download/latest/macos",
    windows: "/download/latest/windows",
  },
};
