/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        height:{
            'border':'2px',
            '70':'70%',
        },
        minHeight:{
            '200':'200px',
            '150':'150px'
        },
        backgroundImage: {
            'star': "url('../src/assets/SaturnMoon_Sojuel_1824.jpg')",
            'starRiver':"url('../src/assets/star.jpg')",
            'modern':"url('../src/assets/modern.jpeg')",
            "jupiter":"url('../src/assets/mu.png')"
           },
        backgroundSize:{
            '100%':"100% 100%",
            '400%':"400% 400%"
        },
        letterSpacing:{
            "title":'.5rem'
        },
        zIndex:{
            "under":-1
        },
        lineHeight:{
            "16":'4rem',
            "20":'5rem',
            '40':'10rem'
        },
        animation:{ 
            "rotate":"rotatex 2s ease-in-out",
            "ripple":"ripple 4s ease-in-out infinite",
            "shake":"shake 1s cubic-bezier(.315,.605,.375,.925) forwards;",
            "bg":"bg 10s ease infinite"
        },
        keyframes: {
            bg:{
                "0%":{
                    backgroundPosition: "0% 50%"
                },
               "50%":{
                    backgroundPosition: "100% 100%"
                },
                "100%":{
                    backgroundPosition:"0% 50%"
                }
            },
            rotatex:{
                "0%":{transform:"rotateX(90deg)"},
                "100%":{transform:"rotateX(0deg)"}
            },
            ripple:{
                "0%":{width:'0%',backgroundColor:'white'},
                "50%":{width:'20%',backgroundColor:'#1abc9c'},
                "100%":{width:'0%',backgroundColor:'white'}
            },
            shake:{
                "0%":{
                    transform: "perspective(1600px) rotateX(0) rotateY(0) translateZ(0)"
                },
               " 16% ":{
                    transform: "perspective(1600px) rotateX(10deg) rotateY(5deg) translateZ(32px)"
                },
                "100%" :{
                    transform: "perspective(1600px) rotateX(0) rotateY(0) translateZ(65px)"
                },
            }
        }
      },
    },
    plugins: [],
  }
