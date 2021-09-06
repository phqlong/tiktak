import React, { useRef, useState, useEffect } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const typingTimeoutRef = useRef(null);

    let history = useHistory()

    useEffect(() => {
        // SET -- 100 -- CLEAR, SET -- 300 --> SUBMIT
        // SET -- 300 --> SUBMIT
        if (typingTimeoutRef.current)
            clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => {
            updateSearchUrl();
        }, 500);
    }, [keyword]);

    function updateSearchUrl() {
        if (keyword) {
            history.push(`/search?keyword=${keyword}`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        updateSearchUrl();
    }

    return (
        <Form className="col-5" onSubmit={handleSearchSubmit}>
            <InputGroup>
                <Form.Control
                    className="search-input"
                    type="text"
                    placeholder="Search something..."
                    onChange={(e) => setKeyword(e.target.value)}
                    autoComplete="on"
                />
                <Button
                    type="submit"
                    className="btn btn-search"
                    variant='dark'
                    size="small"
                >
                    <AiOutlineSearch className="search-icon" />
                    Search
                </Button >
            </InputGroup>
        </Form>
    )
}

export default SearchBar;
