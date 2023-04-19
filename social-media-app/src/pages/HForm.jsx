import React from 'react';

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

export default Form;