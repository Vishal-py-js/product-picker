import React, { useRef, useState } from 'react'
import styled from 'styled-components'

const icon1 = "/assets/icons/icon1.svg"
const edit = "/assets/icons/edit.svg"
const close = "/assets/icons/close.svg"
const dropdown = "assets/icons/dropdown-icon.svg"


const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    

    .container{
        display: flex;
        text-align: left;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        gap: 20px;
        img{
            height: 20px;
        }
    }

    .show{
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 4px;
        align-self: flex-end;
        text-decoration: underline;
        color: blue;
        cursor: pointer;
        #dropdown{
            margin-top: 5px;
            height: 10px;
        }
    }

    .select-product{
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        width: fit-content;
        gap: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 8px 15px;
        color: rgba(0, 0, 0, 0.8);
        font-weight: 500;
        font-size: 19px;
        img{
            cursor: pointer;
        }
    }

    .discount-cont{
        width: 300px;
        height: 100%;
    }

    button{
        background: #008060;
        border: 2px solid #008060;
        border-radius: 4px;
        color: #fff;
        padding: 10px 20px;
        cursor: pointer;
        height: 100%;
        width: 100%;
        font-size: 16px;
        border-radius: 4px;
    }

    .variants-cont{
        display: flex;
        flex-direction: column;
        width: 90%;
        align-self: flex-end;
        gap: 10px;
    }

    .variant{
        display: flex;
        align-self: flex-end;
        align-items: center;
        gap: 20px;
        width: 90%;
        padding: 0 15px;
        justify-content: space-between;
        img{
            height: 20px;
        }
        div{
            width: 70%;
            height: 100%;
            border: 1px solid gray;
            border-radius: 30px;
            padding: 10px 0px;
        }
    }

    .discount{
        display: flex;
        height: 100%;
        gap: 10px;
        input{
            font-size: 16px;
            padding: 0 10px;
            border: 1px solid lightgray;
            :focus{
                outline: 1px solid #008060;
            }
        }
        select{
            font-size: 16px;
            border: 1px solid lightgray;
            option{
                color: white;
                position: absolute;
                height: 60px;
                border: none;
                background-color: #008060;
                font-size: 16px;
                padding: 5px;
                border-radius: none;
                :hover{
                    background: none;
                }
            }
            :focus{
                outline: 1px solid #008060;
            }
        }
    }

    .img-cont{
        transition: 0.5s;
        transform: rotate(-180deg);
    }
`

function AddProduct({item, step}) {

    const[showVariants, setShowVariants] = useState(false)
    const[showDiscount, setDiscount] = useState(false)
    const dragIt = useRef();
    const dragOverIt = useRef();
    
    const [list, setList] = useState(item);

    const dragStart = (e, position) => {
        e.stopPropagation()
        dragIt.current = position;
    };
    
    const dragEnter = (e, position) => {
        e.stopPropagation()
        dragOverIt.current = position;
    };
    
    const drop = (e) => {
        e.stopPropagation()
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragIt.current];
        copyListItems.splice(dragIt.current, 1);
        copyListItems.splice(dragOverIt.current, 0, dragItemContent);
        dragIt.current = null;
        dragOverIt.current = null;
        setList(copyListItems)
    };


    const removeVariant = (index) => {
        const updList = [...list]
        updList.splice(index, 1)
        setList(updList)
    }


    const dropDownHandler = () => {
        const element = document.getElementById("dropd")
        const el = document.getElementById("dropdown")
        element.addEventListener("click", function(){
            if(showVariants){
                el.classList.add("img-cont")
            }else{
                el.classList.remove("img-cont")
            }
        })
        setShowVariants(!showVariants)
    }

    const handleDiscount = () => {
        setDiscount(true)
    }


    return (
        <Container>
            <div className='container'>
                <img src={icon1} alt=""/>
                <p>{step}.</p>
                <div className='select-product'>
                    <small>
                        {
                            item?item.length > 0? item[0].name: "Select Product":""
                        }
                    </small>
                    <img src={edit} alt=""/>
                </div>
                <div className='discount-cont'>
                    {
                        showDiscount?
                            <div className='discount'>
                                <input />
                                <select>
                                    <option>Flat off</option>
                                    <option>% off</option>
                                </select>
                            </div>
                            :<button onClick={handleDiscount}>Add Discount</button>
                    }
                </div>
            </div>

            <div className='show' id="dropd" onClick={()=>dropDownHandler()}>
                <small>{showVariants?"hide":"show"} variants</small>
                <img id="dropdown" src={dropdown} alt=""/>
            </div>
                
                {
                    showVariants?list.map((variant, index) => (

                            <div className='variant'
                                onDragStart={(e) => dragStart(e, index)}
                                onDragEnter={(e) => dragEnter(e, index)}
                                onDragEnd={drop}
                                key={index}
                                draggable
                                
                            >
                                <img src={icon1} alt=""/>
                                <div>{variant.variants.title}</div>
                                <img onClick={()=>removeVariant(index)} style={{height: "18px", cursor:"pointer"}} src={close} alt=""/>
                            </div>
                    )):""
                }
        </Container>
    )
}

export default AddProduct