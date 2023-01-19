import styled from "styled-components";

export const GIF_BACKGROUND = "https://img1.picmix.com/output/stamp/normal/0/4/1/6/1526140_3f2af.gif";
export const IMAGE_BACKGROUND = "https://img.freepik.com/vector-premium/fondo-transparente-videojuegos_6997-1230.jpg?w=2000)";
export const GIF_LOADING = "https://ikeasistencia.com/img/loading.gif";

export const DivDetalles = styled.div `
margin-bottom: 20px;
`

export const ButtonDetalles = styled.button `
cursor:pointer;
font-weight: 900;
width: 80px;
height: 40px;
background: gray;
color: white;
border-radius: 5px;
transition: 0.5s;
&:hover {
    color: red;
    width: 100%;
}
`

export const DivCard = styled.div `
margin: 3%;
width: 300px;
display: inline-block;
text-align: center;
background: black;
border-radius: 10%;
border: 10px solid gray;
transition: 0.5s;
&:hover {
    width: 310px;
    border: 10px solid red;
}
`

export const ImgCard = styled.img `
width: 100%;
height: 100%;
border-top-left-radius: 10%;
border-top-right-radius: 10%;

`

export const LabelTitle = styled.label `
    background-image: url(${GIF_BACKGROUND});
    background-size: cover;
    color: #CB3234;
    border: none;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 900;
    margin: 26px 10px 10px 10px;
    padding: 10px;
    display:inline-block;
`

export const ButtonSelect = styled.button `
    cursor:pointer;
    background: #CB3234;
    color: black;
    border: none;
    border-radius: 2vw;
    font-size: 15px;
    font-weight: 900;
    margin: 10px;
    width: 300px;
    &:hover {
        text-decoration:line-through;
        text-decoration-color: black;
        text-decoration-thickness: 0.4rem;
    }
`

export const Error = styled.h3 `
    display: inline-block;
    font-size: 20px;
    font-weight: 900;
    width: 500px;
    color: #CB3234;
    background: none;
`

export const ContenedorDetail = styled.div `
    display: flex;
    background-color : rgba(255,255,255,0.9);
    align-items: center;
    justify-content: center;
    margin: 100px;
    @media (max-width: 600px) {
        display: block;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`
export const MostrarOcultar = styled.button `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    margin: 8px;
    width: 200px;
    height: 40px;
    position: static;
    background: gray;
    border: 0px;
    border-radius: 16px;
    color: white;

    transition: 0.5s;
    &:hover {
        color: red;
        width: 100%;
    }
`

export const ButtonCreate = styled.button `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    width: 200px;
    height: 40px;
    position: static;

    color: #CB3234;
    background-image: url(${GIF_BACKGROUND});
    background-size: cover;

    border: 5px solid black;
    border-top: 0px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`

export const Titulo = styled.p `
    color: white;
    background: black;
    height: auto;
    width: 100%;
    font-size: 50px;
    font-weight: 900;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 25px 0px 25px 0px;
    padding: 25px 0px 25px 0px;
    @media (max-width: 600px) {
        font-size: 30px;
    }
`

export const ButtonCargar = styled.button `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    margin: 8px;
    width: 100px;
    height: 40px;
    position: static;
    background-image: url(${GIF_BACKGROUND});
    background-size: cover;
    border: 0px;
    border-radius: 16px;
    color: #CB3234;
`

export const SelectFilter = styled.select `
    cursor:pointer;

    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: -0.02em;

    padding: 4px;
    padding-left:15px;
    margin: 8px;
    width: 300px;
    height: 40px;
    position: static;
    background-image: url(${GIF_BACKGROUND});
    border: 0px;
    border-radius: 16px;
    color: #CB3234;

    option {
        color: white;
        background: black;
        font-weight: 900;
        font-size: 15px;
        line-height: 150%;
        letter-spacing: -0.02em;
        border: 0px !important;
        border-radius: 16px;
      }
`

export const Button1 = styled.button `
   cursor:pointer;
   background-image: url(${GIF_BACKGROUND});
   color: #CB3234;
   border: 5px solid black;
   width: 15vw;
   height: 10vh;
   border-radius: 1vw;
   font-size: 2vw;
   font-weight: 900;
`

export const InputSearch = styled.input `
    background: black;
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 20px;
    font-weight: 900;
    position: static;
    height: 40px;
    width: 400px;
    padding-left: 20px;
    margin: 20px 10px 0px 0px;
    ::placeholder {
        color: white;
        opacity: 0.5;
    }
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button
    {
    -webkit-appearance: none;
    margin: 0;
    }
`
export const ContenedorFiltros = styled.div `
    display: inline-block;
    justify-content: center;
    background-color: rgba(255,255,255,0.8);
    border: 5px solid black;
    padding: 30px;
    display: inline-block;
    margin: 30px;
`

export const ContenedorFiltrosPadre = styled.div `
    display: flex;
    align-items: center;
    justify-content: space-around;
    @media (max-width: 1000px) {
        display: block;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`
