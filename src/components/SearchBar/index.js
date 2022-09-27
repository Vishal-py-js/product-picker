import React , {useState} from 'react'
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Input from './input'
const search = '/assets/icons/search.svg'


const SearchbarContainer = styled.div`
    position: relative;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 40px;
    min-width: 200px;
    form{
        background: rgba(250, 250, 250, 0.2);

        border: 1px solid rgba(0, 0, 0, 0.2);
        border: 2px solid rgba(0, 128, 96, 1);
        box-sizing: border-box;
        border-radius: 3px; 
        position: relative;
        z-index: 5;
        display: flex;
        gap: 25px;
        width: 100%;
        height: fit-content;
        justify-content:flex-start;
        align-items:center;
        padding: 5px 30px; 
    }
    
    
`

const Suggestions = styled.div`
    position: absolute;
    top: 44px;
    width: 86.5%;
    height: fit-content;
    transform: scalex(1.05); 
    border-radius: 0 0 17px 17px;
    z-index: 2;
    border-radius: 4px;
    padding:10px 25px;
    border: 1px solid gray;
    background-color: whitesmoke;

    .suggestions{
        position: relative;
        width: 100%;
        height: fit-content;
        min-height: 30px;
        transform: scalex(1.05); 
        border-radius: 0 0 17px 17px;
        z-index: -1;
        display: flex;
        align-items: flex-start;
        

        .search{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        p{
            cursor: pointer;
        }
    }
`

const Searchbar = () => {

    const [isDropdownShown, setDropdownShow] = useState(false)
    const [query, setQuery] = useState('')


    const handleChangeQuery = (e) => {
        setQuery(e.target.value)
        if(e.target.value===""){
            setDropdownShow(false)
        } else{
            setDropdownShow(true)
        }
        
    }
    const products = useSelector(state=>state.products.products)

    let productNames = []
    products.map(product => {
        productNames.push(product)
    })

    let searchResults = productNames.filter(function(str) {return str.title.toLowerCase().includes(query.toLowerCase())})

    return(
        <SearchbarContainer>
            <form>
                <img src={search} alt="magnifier" />
                <Input  
                    value={query} 
                    onChange={handleChangeQuery}  
                    placeholder="Search product" 
                />
                
            </form>
                {
                isDropdownShown && 
                    <Suggestions>
                        <div className='suggestions'>
                            {
                                searchResults.length==0?"No products found":
                                searchResults.map((res) => (
                                    <div key={res.id} className='search'>
                                        <p >{res.title}</p>
                                        <hr />
                                    </div>
                                ))
                            }
                        </div>
                    </Suggestions>
                }
            </SearchbarContainer>
    )
}

export default Searchbar