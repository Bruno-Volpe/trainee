import './style.css'
import 'bootstrap';

const boxOpen = () => {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('click', () => {
            const oldClass = box.children[1].classList;
            if (oldClass.contains('show')) {
                box.children[1].classList.remove('show');
            } else {
                box.children[1].classList.add('show');
            }
        });
    });
};

let toggle = false;
/* Call this function to add events, first parameter: text, second parameter: 
event name, third parameted: year */
const toggleBox = (text, eventName, eventYear) => {
    const html = `
    <div class="timeline-item ">
            <div class="content box ${toggle ? "right" : ""}">
                <h2>${eventName}</h2>
                <p>${text}</p>
            </div>
            <div class="timeline-icon">${eventYear}</div>
        </div>
    `


    const timeline = document.querySelector(".timeline");
    const element = document.createElement("div");
    element.innerHTML = html;
    timeline.appendChild(element);
    toggle = !toggle
}

/* is called when the site is load, and should be responsabel
to get all events from databse */
const getBoxes = async () => {
    try {
        const response = await fetch('http://localhost:5000/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
        });

        const data = await response.json();

        if (response.status === 404) {
            window.alert("Erro ao carregar eventos, tente novamente mais tarde");
        }

        // Assuming data is an array of posts, modify this part based on your actual response structure
        data.forEach(({ text, eventName, eventYear }) => {
            toggleBox(text, eventName, eventYear);
        });

        boxOpen();
    } catch (err) {
        console.error(err);
    }
};

getBoxes()
