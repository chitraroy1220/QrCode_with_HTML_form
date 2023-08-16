// const qrText = document.getElementById('qr-text');
// const sizes = document.getElementById('sizes');
// const generateBtn = document.getElementById('generateBtn');
// const downloadBtn = document.getElementById('downloadBtn');
// const qrContainer = document.querySelector('.qr-body');

// let size = sizes.value;
// generateBtn.addEventListener('click',(e)=>{
//     e.preventDefault();
//     isEmptyInput();
// });

// sizes.addEventListener('change',(e)=>{
//     size = e.target.value;
//     isEmptyInput();
// });

// downloadBtn.addEventListener('click', ()=>{
//     let img = document.querySelector('.qr-body img');

//     if(img !== null){
//         let imgAtrr = img.getAttribute('src');
//         downloadBtn.setAttribute("href", imgAtrr);
//     }
//     else{
//         downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
//     }
// });

// function isEmptyInput(){
//     // if(qrText.value.length > 0){
//     //     generateQRCode();
//     // }
//     // else{
//     //     alert("Enter the text or URL to generate your QR code");
//     // }
//     qrText.value.length > 0 ? generateQRCode() : alert("Enter the text or URL to generate your QR code");;
// }
// function generateQRCode(){
//     qrContainer.innerHTML = "";
//     new QRCode(qrContainer, {
//         text:qrText.value,
//         height:size,
//         width:size,
//         colorLight:"#fff",
//         colorDark:"#000",
//     });
// }


document.addEventListener("DOMContentLoaded", function () {
    const generateBtn = document.getElementById("generateBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const qrBody = document.querySelector(".qr-body");
    const sizesSelect = document.getElementById("sizes");
    let selectedSize=sizesSelect.value;
    sizes.addEventListener('change',(e)=>{
        selectedSize = e.target.value;
    });


    generateBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const firstName = document.getElementById("name").value;
        const middleName = document.getElementById("middle_name").value;
        const lastName = document.getElementById("last_name").value;
        const email = document.getElementById("email").value;
        const mobileNo = document.getElementById("Mobile_No").value;
        const address = document.getElementById("Address").value;
        const photoInput = document.getElementById("photo");
        

        const data = {
            firstName,
            middleName,
            lastName,
            email,
            mobileNo,
            address,
        };
        if (photoInput.files && photoInput.files[0]) {
            console.log("Inside",photoInput.files,photoInput.files[0]);
            const reader = new FileReader();
            reader.onload = function (e) {
                data.photo = e.target.result;
            };
            reader.readAsDataURL(photoInput.files[0]);
        } else {
            data.photo="No Image"
        }

        const qrCodeData = JSON.stringify(data);

        qrBody.innerHTML = ""; // Clear previous QR code
        const qrCode = new QRCode(qrBody, {
            text: qrCodeData,
            width: selectedSize,
            height: selectedSize,
        });
    });

    downloadBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const qrCodeImg = qrBody.querySelector("img");

        if (qrCodeImg) {
            const a = document.createElement("a");
            a.href = qrCodeImg.src;
            a.download = "qrcode.png";
            a.click();
        } else {
            alert("Generate a QR code first.");
        }
    });
});
