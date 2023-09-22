// const myPikachu = document.querySelector("#myPikachu");



addEventListener('DOMContentLoaded', async (e)=> {
    let res = await ( await fetch("https://pokeapi.co/api/v2/pokemon")).json();
    let btns = res.results.map((btn) => `<button id="my${btn.name}">${btn.name}</button>`).join("");
    document.body.innerHTML = btns

})


// myPikachu.addEventListener("click", async () => {
//   let res = await (
//     await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//   ).json();
//   let img = res.sprites.front_default;
//   let defaultImg =
//     "https://i.pinimg.com/originals/27/ae/5f/27ae5f34f585523fc884c2d479731e16.gif";

//   Swal.fire({
//     title: `${res.name}`,
//     text: "Modal with a custom image.",
//     imageUrl: `${img ? img : defaultImg}`,
//     html: `
//         ${res.stats.map(data => `<input type="range" value="${data.base_stat}"><label><b>${data.base_stat}</b> ${data.stat.name} </label><br>`
//           ).join("")}
//         `,
//     imageWidth: "80%",
//     imageHeight: "80%",
//   });
// });
