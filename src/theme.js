import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = createTheme({
    palette:{
        type: "light",
        primary: {
            light: '#d7675b',
            main: '#CD4132',
            dark: '#8f2d23',
            contrastText: '#fff',
        },secondary: {
            light: '#4d4d4d',
            main: '#212121',
            dark: '#171717',
            contrastText: '#fff',
        },
        background:{
            paper: '#fff',
            // default: '#eceff1'
            default: '#fff' 
        }
    },

    overrides: {
        MuiCssBaseline: {
        
          '@global': {
            'html, body, #root': {
              minHeight:'100%',
              position:'relative',
                fontFamily: [
                  "Montserrat", 
                  // "Arial", 
                  '-apple-system',
                  'BlinkMacSystemFont',
                  '"Segoe UI"',
                  'Roboto',
                  '"Helvetica Neue"',
                  'Arial',
                  'sans-serif',
                  '"Apple Color Emoji"',
                  '"Segoe UI Emoji"',
                  '"Segoe UI Symbol"',
                ].join(','),
            },
          },
        },
        MuiButton: {

            root: {
                boxShadow: 'none',
                textTransform: 'none',
                fontSize: 16,
                lineHeight: 1.5,
                borderColor: '#007bff',
                borderRadius: 8,
                paddindTop: 8,
                paddindBottom: 8,
                fontFamily: [
                  '-apple-system',
                  'BlinkMacSystemFont',
                  '"Segoe UI"',
                  'Roboto',
                  '"Helvetica Neue"',
                  'Arial',
                  'sans-serif',
                  '"Apple Color Emoji"',
                  '"Segoe UI Emoji"',
                  '"Segoe UI Symbol"',
                ].join(','),
                '&:hover': {
                  boxShadow: 'none',
                },
                '&:active': {
                  boxShadow: 'none',
                },
              },
        },
      },
    props: {
        MuiButton: {
            style:{
                boxShadow: "none", 
            }
        },

      },

});

export const themeAppBar = {
  'dark': {
    color: 'transparent',
    style: {
      color: '#fff',
      borderBottom: 'none',
      overflow: 'visible',
    }
  },
  'light': {
    color: 'secondary',
    style: {
      backgroundColor: '#fff',
      color: '#000',
      borderBottom: '1px solid #eceff1',
      overflow: 'visible',
    }
  }
}

export const themeApp = responsiveFontSizes(theme);