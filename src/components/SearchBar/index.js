import { useEffect, useRef, useState } from "react";
import { InputContainer, StyledIcon, StyledInput, StyledForm, Dropdown, DropdownRow } from "./styled"
import { AiOutlineSearch } from 'react-icons/ai';


export default function SearchBar() {
    const array = [
        { nome: "Joao Avaters", url: "https://static.wikia.nocookie.net/avatar/images/c/ce/Aang.png/revision/latest?cb=20161129194603&path-prefix=pt-br" },
        { nome: "Joao Amongus", url: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec" },
        { nome: "Carlinhos Carlotes", url: " " },
        { nome: "Charles AJIsdjia", url: " " }]

    const [value, setValue] = useState("");
    const [showSearch, setShowSearch] = useState(false)
    const [filterArray, setFiltered] = useState([])
    const searchInputRef = useRef(null);

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


    function handleChange(e) {
        setValue(e.target.value)
        const newFiltered = filterSearch(e.target.value)
        setFiltered(newFiltered);

        if (e.target.value.length >= 3 && newFiltered.length !== 0) {
            setShowSearch(true)
        }
        else { setShowSearch(false) }
    }

    function filterSearch(value) {
        return(array.filter((u) => {
            const searchTerm = value.toLowerCase();
            const fullName = u.nome.toLowerCase();

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
                    onChange={handleChange}
                    onClick={handleChange}
                    />
                <StyledIcon> <AiOutlineSearch /></StyledIcon>
                <Dropdown showSearch={showSearch}>
                    {
                        filterArray.map((u) => (
                            <DropdownRow>
                                <img src={u.url} alt="user image"/>
                                <h3>{u.nome}</h3>
                            </DropdownRow>
                        ))
                            .slice(0, 10)
                    }
                </Dropdown>

            </StyledForm>

            <h1> AAAA AAA AAA </h1>
        </InputContainer>
    )

}