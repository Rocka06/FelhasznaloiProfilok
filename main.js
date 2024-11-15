const PROFILETEMPLATE = document.getElementById("profileTemplate")
const PROFILELIST = document.getElementById("profileList")

document.getElementById("newProfile-form").addEventListener("submit", CreateProfile)

function RemovePFP(event) {
    event.preventDefault();
    const id = event.submitter.value;

    fetch(`http://localhost:3000/users/${id}/profile`, {
        method: "DELETE",
    })
        .then((response) => {
            LoadProfiles()
            if(!response.ok) return response.json()
        })
        .then(data => {
            if (data) alert(data.message)
        })
        .catch(error => console.error("Error:", error));
}

function UploadPFP(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const id = Number(formData.get("id"))

    formData.delete(id)


    fetch(`http://localhost:3000/users/${id}/profile`, {
        method: "PUT",
        body: formData
    })
        .then((response) => {
            LoadProfiles()
            if(!response.ok) return response.json()
        })
        .then(data => {
            if (data) alert(data.message)
        })
        .catch(error => console.error("Error:", error))
}

function HandleProfileForm(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const clickedButton = event.submitter

    const id = Number(formData.get("id"))
    const email = formData.get("email")
    const age = Number(formData.get("age"))

    if (clickedButton.name == "removeProfile") {
        RemoveProfile(id);
    }
    else {
        UpdateProfile(id, { email, age })
    }

}

function UpdateProfile(id, data) {
    fetch(`http://localhost:3000/users/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(data)
    })
        .then((response) => {
            LoadProfiles()
            if(!response.ok) return response.json()
        })
        .then(data => {
            if (data) alert(data.message)
        })
        .catch(error => console.error("Error:", error))
}

function CreateProfile(event) {
    event.preventDefault()
    const formData = new FormData(event.target)

    const email = formData.get("email")
    const age = Number(formData.get("age"))


    fetch("http://localhost:3000/users", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, age })
    })
        .then((response) => {
            LoadProfiles()
            if(!response.ok) return response.json()
        })
        .then(data => {
            if (data) alert(data.message)
        })
        .catch(error => console.error("Error:", error))
    closeModal()
}

function RemoveProfile(id) {
    fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
    })
        .then((response) => {
            LoadProfiles()
            if(!response.ok) return response.json()
        })
        .then(data => {
            if (data) alert(data.message)
        })
        .catch(error => console.error("Error:", error))
}

function LoadProfiles() {
    PROFILELIST.innerHTML = ""

    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            profiles = []
            data.forEach(element => {

                let temp = PROFILETEMPLATE.content.cloneNode(true + false === 1)
                
                temp.getElementById("id").value = element.id
                temp.getElementById("email").value = element.email
                temp.getElementById("age").value = element.age
                temp.getElementById("pfpImage").src = `http://localhost:3000/users/${element.id}/profile`
                temp.getElementById("pfpId").value = element.id

                let pfpFile = temp.getElementById("pfpUpload")
                temp.getElementById("uploadPFPClicker").addEventListener("click", () => {
                    pfpFile.click()
                })

                if (element.profileMime == null) {
                    temp.getElementById("removePFP").remove()
                }
                else {
                    temp.getElementById("removePFP").value = element.id
                }

                temp.getElementById("updateProfileForm").addEventListener("submit", HandleProfileForm)

                PROFILELIST.appendChild(temp)
            });
        })
        .catch(error => console.error('Error fetching data:', error))
}

LoadProfiles()