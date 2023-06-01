import { useEffect, useRef, useState } from "react";
import { InputContainer, StyledIcon, StyledInput, StyledForm, Dropdown, DropdownRow } from "./styled"
import { AiOutlineSearch } from 'react-icons/ai';
import { getUsers } from "../../service/users";

//import { useNavigate } from "react-router-dom";


export default function SearchBar() {
    let users = [];

    const [value, setValue] = useState("");
    const [showSearch, setShowSearch] = useState(false)
    const [filterArray, setFiltered] = useState([])
    const searchInputRef = useRef(null);
    //const navigate = useNavigate();

    useEffect(() => { //Funcao p/ fechar dropdown quando clicar fora do input
        const handleClickOutside = (event) => {
          if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setShowSearch(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);   
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []); 


    async function handleChange(e) {
        setValue(e.target.value)
        
        users = await getUsers();

        const newFiltered = filterSearch(e.target.value)
        setFiltered(newFiltered);

        if (e.target.value.length >= 3 && newFiltered.length !== 0) {
            setShowSearch(true)
        }
        else { setShowSearch(false) }
    }

    function filterSearch(value) {
        return(users.filter((u) => {
            const searchTerm = value.toLowerCase();
            const fullName = u.username.toLowerCase();

            return fullName.includes(searchTerm)
        }))
    }

    return (
        <InputContainer>
            <StyledForm ref={searchInputRef} >
                <StyledInput
                    placeholder="Search for people"
                    type="text"
                    value={value}
                    minLength={3}
                    debounceTimeout={300}
                    onChange={handleChange}
                    onClick={()=>handleChange}
                    />
                <StyledIcon> <AiOutlineSearch /></StyledIcon>
                <Dropdown showSearch={showSearch}>
                    {
                        filterArray.map((u) => (
                            <DropdownRow key={u.id} onClick={()=>console.log(`navigate(/user/${u.id})`)}>
                                <img src={u.picture_url} alt=""/>
                                <h3>{u.username}</h3>
                            </DropdownRow>
                        ))
                            .slice(0, 10)
                    }
                </Dropdown>
            </StyledForm>
        </InputContainer>
    )

}