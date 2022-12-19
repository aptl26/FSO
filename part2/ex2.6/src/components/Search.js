import Persons from './Persons'

const Search = ({ search, handleSearch, filteredPersons }) => {
    return (
        <>
            <input value={search} onChange={handleSearch} />
            <ul>
            <Persons arr={filteredPersons}/>
            </ul>
        </>
    )
}

export default Search