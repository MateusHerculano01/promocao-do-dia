import 'styled-components';
import theme from './theme';

declare module 'styled-components' {
  type ThemeType = typeof theme; // Copy all theme properties as a type to ThemeType
  export interface DefaultTheme extends ThemeType { } // extends all properties of ThemeType in DefaultTheme
}