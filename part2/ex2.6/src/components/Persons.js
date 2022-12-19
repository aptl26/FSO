
const Persons = ({ arr, delPerson }) => {
    return (
        <>
            {arr.map(person =>
                <>
                    <li key={person.name} className={'person'}>
                        {person.name} {person.number} {}
                        <button onClick={() => delPerson(person.id)}>
                            Delete
                        </button>
                    </li>
                    
                </>
            )}
        </>
    )
}
export default Persons