

function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth")) || null;
    console.log("auth", auth);
    if (auth) {
        return auth.user;
    } else {
        return null;
    }
}

export { getUser }