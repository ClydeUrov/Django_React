import React, { useMemo, useState } from 'react';

var fruit = {
    name: "Banana",
    scientificName: "Musa"
};
var { name, scientificName } = fruit;


function ParentComponent() {
    return (
        <ChildComponent
            name="John Doe"
            age={25}
        />
    );
}

function ChildComponent({ name, age }) {
    return (
        <p>
            My name is {name} and I am {age} years old.
        </p>
    );
}

function expensiveCalculation(data) {
    // Do some expensive calculation with the data object
    const filteredData = data.filter((item) => item.enabled);
    const sortedData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
    const message = sortedData.map((item) => item.name).join(', ');
    return { message };
}

function Component() {
    
    // Use useMemo to memoize the expensive calculation
    const processedData = useMemo( () => {
        const data = [
            { name: 'John', enabled: true },
            { name: 'Alice', enabled: true },
            { name: 'Bob', enabled: false },
            { name: 'Charlie', enabled: true },
            { name: 'Diana', enabled: false },
        ];
        // Do some expensive calculation with the data
        return expensiveCalculation(data);
    }, []);

    return(
        <div>
            {/* Use the processed data in the component */}
            <p>{processedData.message}</p>
        </div>
    );
}

function Form() {
    // // Use useState to manage the state of the input field
    // const [inputValue, setInputValue] = useState('');

    // // Function to handle changes to the input field
    // function handleChange(event) {
    //     setInputValue(event.target.value);
    // };

    // return (
    //     <div>
    //     <form>
    //         <label htmlFor = "name">Name:</label>
    //         <input
    //             type="text"
    //             id="name"
    //             value={inputValue}
    //             onChange={handleChange}
    //         />
            
    //     </form>
    //     <p>Input value: {inputValue}</p>
    //     <p>Input value 2: {setInputValue}</p>
    //     </div>
    // );

    // Use a ref to manage the state of the input field
    
    const inputRef = React.useRef();

    // Function to handle the form submission
    function handleSubmit(event) {
        event.preventDefault();

        // Do something with the input value here
        // For example, you might send the input value to an
        // API or save it to the database
        // sendInputValue(inputRef.current.value);
        console.log(inputRef.current.value);

        // Clear the input after submitting
        inputRef.current.value = '';
    }

    // function sendInputValue(value) {
    //     console.log(value); // send value to API or do something else
    // }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor = "name">Name:</label>
                <input
                    type="text"
                    id="name"
                    dafaultValue=""
                    ref={inputRef}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

function Counter() {
    const [count, setCount] = useState(0);
    function handleIncrement() {
        setCount(count + 1);
    }

    return (
        <div>
            <p>The counter is at {count}.</p>
            <button onClick={handleIncrement}>Increment</button>
        </div>
    )
}

const Context = React.createContext();

function Appy() {
    // Set some initial data in the context
    const data = {
        message: "Hello, world!"
    };

    return (
        // Provide the data to the components inside the Provider
        <Context.Provider value={data}>
            <Componenty />
        </Context.Provider>
    );
}

function Componenty() {
    // Use the useContext Hook to access the data in the context
    const context = React.useContext(Context);

    return (
        <p>{context.message}</p>
    );
}

export { ParentComponent, Appy,  Counter, Form, Component };