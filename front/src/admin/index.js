import './admin.css';

document.querySelector("body").style.display = "block";
const storeButton = document.querySelector("#storeButton");
const findButton = document.querySelector("#findButton");
const deleteButton = document.querySelector("#deleteButton");
const updateButton = document.querySelector("#updateButton");

//Events listenners
storeButton.addEventListener('click', (e) => storeBox(e))
findButton.addEventListener('click', (e) => findBox(e))
deleteButton.addEventListener('click', (e) => deleteBox(e))
updateButton.addEventListener('click', (e) => updateBox(e))

/* is called when the admin clicks the add button function */
const storeBox = async (e) => {
    e.preventDefault();
    const text = document.querySelector("#text").value;
    const eventName = document.querySelector("#eventName").value;
    const eventYear = parseInt(document.querySelector("#eventYear").value);

    try {
        const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body: JSON.stringify({
                text,
                eventName,
                eventYear
            }),
        });

        if (response.status !== 201) { //Codigo para created
            window.alert("Erro ao adicionar evento, tente novamente mais tarde");
            return;
        }

        window.alert('Evento adicionado com sucesso!');
    } catch (err) {
        console.error(err);
        window.alert("Erro ao adicionar evento, tente novamente mais tarde");
    }
};


const findBox = async (e) => {
    e.preventDefault();
    const search = document.querySelector("#search").value;

    try {
        const response = await fetch('http://localhost:5000/getPostByEventName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body: JSON.stringify({
                eventName: search,
            }),
        });

        const result = await response.json();

        if (!result) {
            window.alert("Evento não encontrado");
            return;
        }

        const { text, eventName, eventYear, _id } = result;

        document.querySelector("#textUpdate").value = text;
        document.querySelector("#eventNameUpdate").value = eventName;
        document.querySelector("#eventYearUpdate").value = eventYear;

        return _id

    } catch (err) {
        console.error(err);
        window.alert("Erro ao encontrar evento, tente novamente mais tarde");
    }
};


const deleteBox = async (e) => {
    e.preventDefault();
    const search = document.querySelector("#search").value;

    const actualBox = await findBox(e)
    try {
        const response = await fetch(`http://localhost:5000/${actualBox}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eventName: search }),
        });

        const result = await response.json();

        if (result.status === 404) {
            window.alert("Nenhum evento encontrado com o nome pesquisado.");
        } else {
            window.alert('Evento deletado com sucesso!');
        }
    } catch (err) {
        window.alert("Erro ao deletar evento, tente novamente mais tarde");
    }
}


const updateBox = async (e) => {
    e.preventDefault();
    const textUpdate = document.querySelector("#textUpdate").value;
    const eventNameUpdate = document.querySelector("#eventNameUpdate").value;
    const eventYearUpdate = parseInt(document.querySelector("#eventYearUpdate").value);

    const actualBox = await findBox(e)
    try {
        const response = await fetch(`http://localhost:5000/${actualBox}`, {
            method: 'PUT', // Use PUT or PATCH depending on your server's API
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            body: JSON.stringify({
                text: textUpdate,
                eventName: eventNameUpdate,
                eventYear: eventYearUpdate

            }),
        });

        if (response.status === 404) {
            window.alert("Evento não encontrado");
            return;
        }

        window.alert('Evento atualizado com sucesso!');
    } catch (err) {
        console.error(err);
        window.alert("Erro ao atualizar evento, tente novamente mais tarde");
    }
};
