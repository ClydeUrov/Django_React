import React from 'react';

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

export { ParentComponent };