const formulario = document.querySelector('#form');
const inputEmail = document.querySelector('#email-input');
const inputPass = document.querySelector('#email-pass');
const inputConfirmPass = document.querySelector('#pass-confirm');


const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const validation = (regex, e, element) => {
    const isValid = regex.test(e.target.value)
    if (isValid) {
        element.classList.add('border-2', 'border-green-500')
        element.classList.remove('border-rose-500');
    }
    else {
        element.classList.remove('border-2', 'border-green-500')
        element.classList.add('border-2', 'border-rose-500');
    }
};

//email

inputEmail.addEventListener('input', e => {
    validation(regexEmail, e, inputEmail);
});

//pass
inputPass.addEventListener('input', e => {
    validation(regexPass, e, inputPass);
})

//confirmar password

inputConfirmPass.addEventListener('input', e => {
    const isValid = e.target.value === inputPass.value;
    if (isValid) {
        inputConfirmPass.classList.add('border-2', 'border-green-500');
        inputConfirmPass.classList.remove('border-rose-500');
    }
    else {
        inputConfirmPass.classList.remove('border-2', 'border-green-500');
        inputConfirmPass.classList.add('border-2', 'border-rose-500');
    }
});

formulario.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            email: inputEmail.value,
            password: inputPass.value
        }

        await axios.post('/api/users', newUser);
        window.location.pathname = '/log'

    } catch (error) {
        const p = document.createElement('p');
        p.innerHTML = error.response.data.error;
        p.classList.add('text-rose-300', 'font-bolt', 'text-center');
        formulario.children[4] ? formulario.children[4].remove() : null;
        formulario.append(p);

    }
});