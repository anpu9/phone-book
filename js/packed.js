const str = 'hello '

window.onload = function(){
  let div=document.createElement('div');
  div.innerHTML = str;
  document.body.appendChild(div)
}