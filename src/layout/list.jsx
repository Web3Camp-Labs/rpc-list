import styled from "styled-components";
import {useEffect, useState} from "react";
import ChainList from "../json/chains.json";
import Alert from 'react-bootstrap/Alert';
import SearchImg from "../images/search.svg";
import ImageArr from "../icons/imageArr.json";

const ListBox = styled.div`
  ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  li{
    border: 2px solid #EDEFF0;
    background: #fff;
    border-radius: 20px;
    width: 32%;
    margin-bottom: 40px;
    text-align: center;
    padding:20px 20px 0;
    //float:left;
    box-sizing: border-box;
    //margin-right: 4%;
    //background: #ff0;
    //&:nth-child(4n){
    //  margin-right: 0;
    //}
    &:hover{
        box-shadow: 0px 20px 40px 0px #F7F7F7;
        border-radius: 20px;
        border: 2px solid #EDEFF0;
    }
    &:last-child:nth-child(3n - 1) {
      margin-right: 34%;
    }
  }

  .title {
    //padding: 20px;
    margin-right: 20px;
    text-align: center;
    font-size: 22px;
    font-family: "Helvetica";
    color: #2D1D0A;
    line-height: 31px;
    margin-top: 20px;
  }

  //img{
  //  width: 96px;
  //  height: 96px;
  //  border-radius: 100px;
  //}
`

const FlexLine  = styled.div`
    display: flex;
  align-items: center;
  img{
    width: 20px;
    height: 20px;
    border-radius: 20px;
    margin-right: 10px;
  }
  .nameRht{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .sym{
    opacity: 0.6;
  }
`


const Tips = styled.div`
    margin-bottom: 20px;
  padding-left: 20px;
`

const BtmUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  padding-top: 20px;
    div{
      border: 1px solid rgba(0,0,0,0.1);
      background: #f8f8f8;
      border-radius: 5px;
      width: 100%;
      text-align: left;
      padding: 10px;
      margin-bottom: 20px;
      cursor: pointer;
      font-size: 14px;
      word-break: break-all;
      &:hover{
        color: #000;
      }
    }
`

const SearchBox = styled.div`
  border: 2px solid #EDEFF0;
  background: #fff;
  border-radius: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 10px 20px;
  width: 66%;
  display: flex;
  align-content: center;
  input{
    border: 0;
    flex-grow: 1;
    margin-left: 10px;
    &:focus{
      outline: none;
    }
  }
`

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
`



export default function List(){
    const [show, setShow] = useState(false);
    const [keyword,setKeyword] = useState('');
    const [list,setList] = useState([]);

    useEffect(()=>{
        let arr = ChainList.sort(compareDESC);
        const aftArr = arr.filter(item=>item.rpc.length)

        setList(aftArr)

    },[])


    const compareDESC = function (obj1, obj2) {
        const val1 = obj1.name;
        const val2 = obj2.name;
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    }


    useEffect(()=>{

        if(!keyword.length){
            let arrAft = ChainList.sort(compareDESC);
            const aftArr = arrAft.filter(item=>item.rpc.length)
            setList(aftArr)
        }else{
            const arr = ChainList.filter((item)=>item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
            let arrAft = arr.sort(compareDESC );
            const aftArr = arrAft.filter(item=>item.rpc.length)
            setList(aftArr)
        }

    },[keyword])

    const handleInput = (e) => {
        const { value } = e.target;
        setKeyword(value)
    };

    const handleCopy = async (text) =>{
        if ("clipboard" in navigator) {
            await navigator.clipboard.writeText(text);
        } else {
            document.execCommand("copy", text);
        }
        setShow(true)
        setTimeout(()=>{
            setShow(false)
        },1000)
    }
    const formatImg = (num) =>{
        const rt = ImageArr.filter((item)=>item.split(".")[0] === num?.toString() )
        if(rt.length){
            return require(`../icons/${rt[0]}`)
        }else{
            return require("../icons/eth.png");
        }

    }
    return <div>
        {
            show &&<Modal>
                <Alert variant="success">
                    Copied to clipboard !
                </Alert>
            </Modal>
        }



        <SearchBox>
            <img src={SearchImg} alt=""/>
            <input type="text" value={keyword} onChange={handleInput} />
        </SearchBox>
        {
            !!keyword.length &&<Tips>Search results with {keyword}</Tips>
        }

        <ListBox>
            <ul>
                {
                    list.map((item,index)=>( <li key={index}>
                        <FlexLine>
                            <img src={formatImg(item.chainId)} alt=""/>
                            <div className="nameRht">
                                <span>{item.name}</span>
                                <span className="sym">{item.nativeCurrency?.symbol}</span>
                            </div>
                        </FlexLine>
                        <BtmUl>
                            {
                                item.rpc?.map((innerItem,index)=>(<div key={`innerItem_${index}`} onClick={ () => handleCopy(innerItem)}>
                                            {innerItem}

                                    </div>))
                            }

                        </BtmUl>
                    </li>))
                }

            </ul>
        </ListBox>
    </div>
}