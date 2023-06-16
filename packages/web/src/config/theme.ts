import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#ffe7e9',
      100: '#ffc8cd',
      200: '#ff9aa1',
      300: '#ff6c75',
      400: '#ff3e49',
      500: '#ff385c',
      600: '#e13253',
      700: '#c42c4a',
      800: '#a72742',
      900: '#891e37',
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Stepper: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
});
