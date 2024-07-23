module.exports = {
  plugins: [
    require('flowbite/plugin')
    
  ],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",  "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",], 
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans'],
      },
  
      backgroundImage: {
        "neo-gradient": "linear-gradient(104.56deg, #007FFF 3.1%, #0253FC 98.78%)",
        "btn-prime-bg": "linear-gradient(104.56deg, #007FFF 3.1%, #0253FC 98.78%)", 
        "btn-prime-hover": "linear-gradient(133.15deg, #0C5EE0 3.02%, #0253FC 100%)", 
        "btn-prime-active": "linear-gradient(135deg, #0A50BF 0%, #0253FC 100%)",
        "dark": '#000000',
        "light":"F4F4F4",
      },
      colors: {
        
        primary: {
          bg: '#FFFFFF',
          text: '#161616',
          icon: '#262626',
          divider:"#E0E0E0",
          border:"#0F6FFF",
          lable:"#000000",
        

        },
        secondary: {
          bg: '#F4F4F4',
          text: '#525252',
          icon: '#525252',
          divider:"#6F6F6F",
          btn:{
            default: "#FFFFFF",
            border: "#E0E0E0",
            hover: "#E5E5E5",
            active: "#C6C6C6"
          }
        },
        danger:{
        tertiary:{
          bg:'#DA1E28',
          text:"#FFFFFF",
          btn:{
            default: "#DA1E28",
            border: "#DA1E28",
            hover: "#BE1B22",
            active: "#A2171D"
          }
        }},
        tertiary:{
          bg: '#E0E0E0',
          text: '#A8A8A8'
        },
        overLay:{
          bg:"rgba(22, 22, 22, 0.5)"
        },
        error: {
          text: '#DA1E28'
        },
        interact:{
          ui:{
            default01: "#FFFFFF",
            deafult02: "#F4F4F4",
            hover: "#E5E5E5",
            active: "#E0E0E0"
          },

          accent:{
            default: "#0F6FFF",
            hover: "#0C5EE0", 
            active: "#0A50BF"
          }
        },
        focus:{
          "01": "#0F6FFF",
          "02": "#FFFFFF"
        },
        support:{
          "01": "#DA1E28",
          "03": "#76A43D",
          "05": "#FF5722"
        },
        disabled:{
          "01": "#FFFFFF",
          "02": "#c6c6c6"
        },
        field:{
          "01" : "#FFFFFF",
          "02" : "#F4F4F4"
        },
        warning: '#f57922',
        success: '#24a148',
        info: '#f1c21b',
      },
      
      borderRadius:{
      "50":"50px"
      },  
      maxWidth:{
        "700": "700px",
        "600": "600px"
      }, 
      maxHeight:{
        "700": "700px",
        "600": "600px",
        "modal": "470px"
      },
      zIndex:{
        "10000": "10000"
      },
      width:{
        "95": "95%"
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        "16": 'repeat(16, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      gridColumnStart: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
      },
      gridColumnEnd: {
        '13': '13',
        '14': '14',
        '15': '15',
        '16': '16',
        '17': '17',
      }
    },
  },
};
