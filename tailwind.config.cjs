/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        listStyleType:{
            "square":'square',
            "decimal": 'decimal',
        },
      extend: {
        
        height:{
            'border':'2px',
            '70':'70%',
            '70vh':'70vh',
        },
        width:{
            '20vw':'20vw',
            '18vw':'18vw',
            '25vw':'25vw'
        },
        minHeight:{
            '200':'200px',
            '150':'150px',
            
        },
        minWidth:{
            '50':'50px',
            '300':'300px'
        },
        backgroundColor:{
            'editor':'rgb(40,40,40)',
        },
        backgroundImage: {
            'star': "url('../SaturnMoon_Sojuel_1824.jpg')",
            'starRiver':"url('../star.jpg')",
            'modern':"url('../modern.jpeg')",
            "jupiter":"url('../mu.png')",
            "water":"url('../1.png')",
            "forest":"url('../forest.png')"
           },
        backgroundSize:{
            '100%':"100% 100%",
            '400%':"400% 400%"
        },
        letterSpacing:{
            "title":'.5rem'
        },
        zIndex:{
            "under":-1,
            "underer":-5,
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
            "bg":"bg 5s ease infinite"
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
