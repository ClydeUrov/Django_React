import React, { useMemo } from 'react';


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

export default Component;