function loginForm() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let login = JSON.parse(localStorage.getItem('userData'));

    if (!login) {
        Swal.fire({
            icon: "error",
            title: "User Not Found",
        })
        setTimeout(() => {
            window.location.href = "/signup.html"
        }, 2000)
    };

    if (login.email !== email.value) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
        })
    }
    else if (login.password !== password.value) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password",
        })
    }
    else {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Successfully Login`,
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            window.location.href = "/web.html"
        }, 2000)
    }
}
