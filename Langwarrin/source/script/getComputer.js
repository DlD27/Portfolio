fetch('http://localhost:3000/api/programs/computer')
    .then(response => response.json())  
    .then(programs => {
        const categoryContainer = document.getElementById('computerList');
        programs.forEach(program => {
            console.log(`Program Category: ${program.category}`);
            console.log(`Category Container:`, categoryContainer);
                // create a tag
                const aElement = document.createElement('a');
                // dynamically create link by querying serviceName
                aElement.href = `detail.html?_id=${program._id}&program=${encodeURIComponent(program.serviceName)}`;

                const imageContainer = document.createElement('div');
                imageContainer.className = 'image-container';

                const imgElement = document.createElement('img');
                imgElement.src = program.image;
                imgElement.alt = program.serviceName;

                const h3Element = document.createElement('h3');
                h3Element.textContent = program.serviceName;

                const pElement = document.createElement('p');
                pElement.textContent = program.brief;

                imageContainer.appendChild(imgElement);
                imageContainer.appendChild(h3Element);
                imageContainer.appendChild(pElement);

                aElement.appendChild(imageContainer);
                categoryContainer.appendChild(aElement);
            }
        )
    })
    .catch(error => {
        console.error('Error fetching programs:', error);
        computerList.innerHTML = '<p>Error loading programs. Please try again later.</p>';
    });