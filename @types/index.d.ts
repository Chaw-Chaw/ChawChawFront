import "styled-components";
declare module "*.svg" {
  const content: any;
  export default content;
}

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius?: string;
    bodyBackgroundColor: string;
    bodyFontColor: string;
    id?: string;
    primaryColor: string;
    secondaryColor: string;
    setTheme: () => void;

    colors?: {
      main: string;
      secondary: string;
    };
  }
}
