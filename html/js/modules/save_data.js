window.onload = function(){
    const firebaseRef = firebase.database().ref(`/html`);
    firebaseRef.on("value", function(snapshot) {
        const html_data = snapshot.val();
        for (const key in html_data) {
        if (html_data.hasOwnProperty(key)) {
            let element = html_data[key];
            element = element.replace(/</g,'&lt;').replace(/>/,'&gt;');
            // console.log(element);
            var div_element = document.createElement("div");
            div_element.innerHTML = element+'';
            var parent_object = document.getElementById("miss_data");
            parent_object.appendChild(div_element);
        }
        }
    });
}