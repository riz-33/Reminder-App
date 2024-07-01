function registrationForm() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');

    if (email.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Please Enter Your Email",
        })
    }
    else if (password.value.trim() === "") {
        Swal.fire({
            icon: "error",
            title: "Please Enter Password",
        })
    }
    else if (password.value !== confirmPassword.value) {
        Swal.fire({
            icon: "error",
            title: "Password Not Match",
        })
    }
    else {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `You're Successfully Registered`,
            showConfirmButton: false,
            timer: 1500
        });

        let userData = {
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
        }

        localStorage.setItem("userData", JSON.stringify(userData))

        setTimeout(() => {
            window.location.href = "/web.html"
        }, 2000)
    }
}
