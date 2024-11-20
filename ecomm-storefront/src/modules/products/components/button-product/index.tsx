
"use client";
import styled from 'styled-components';

const Pwrapper = styled.div`
display: inline-block;
  vertical-align: top;
  position: relative;
  width: auto;
  text-align: center;
  margin: -20px -20px;
  line-height: 20px;
  padding: 10px 20px;
  
	background: #dab3df;
	background:
		linear-gradient(135deg, transparent 10px, #dab3df 0) top left,
		linear-gradient(225deg, transparent 10px, #dab3df 0) top right,
		linear-gradient(315deg, transparent 10px, #dab3df 0) bottom right,
		linear-gradient(45deg,  transparent 10px, #dab3df 0) bottom left;
	background-size: 50% 50%;
	background-repeat: no-repeat;
	background-image:
		radial-gradient(circle at 0 0, rgba(204,0,0,0) 14px, #dab3df 15px),
		radial-gradient(circle at 100% 0, rgba(204,0,0,0) 14px, #dab3df 15px),
		radial-gradient(circle at 100% 100%, rgba(204,0,0,0) 14px, #dab3df 15px),
		radial-gradient(circle at 0 100%, rgba(204,0,0,0) 14px, #dab3df 15px);
`
const WrapperContainer = styled.div`
  margin: 50px;
  display: block;
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`;
const WrapperButton = styled.div`
  font-size: 25px;
  color: black;
  height: auto;
  margin: 10px;
  font-family: 'VT323';
  
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-transform: uppercase;
  
  cursor: pointer;
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
    line-height: 0;
  
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges; /* Firefox */
  image-rendering: -o-crisp-edges; /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  
  border-style: solid;
  border-width: 20px;
  -moz-border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;
  -webkit-border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;
  -o-border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;
  border-image: url(https://i.imgur.com/sREM8Yn.png) 20 stretch;
`;
export default function ButtonProduct() {
    return (
      <WrapperContainer>
        <WrapperButton>
          <Pwrapper>
          <p>Add To Cart</p>
          </Pwrapper>
        </WrapperButton>
      </WrapperContainer>
    )
  }