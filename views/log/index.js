const formulario = document.querySelector('#form');
const inputEmail = document.querySelector('#email-input');
const inputPass = document.querySelector('#email-pass');

formulario.addEventListener('submit', async e => {
    e.preventDefault();
    try {

        const email = inputEmail.value;
        const password = inputPass.value;
        const { data: credentials } = await axios.post('http://localhost:3003/api/login',
            { email, password });
        console.log(credentials);
        window.location.replace(`/app/${credentials.userId}`)
    } catch (error) {
        const p = document.createElement('p');
        p.innerHTML = error.response.data.error;
        p.classList.add('text-rose-300', 'font-bolt', 'text-center');
        formulario.children[3] ? formulario.children[3].remove() : null;
        formulario.append(p);

    }

});