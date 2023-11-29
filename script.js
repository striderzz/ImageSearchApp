const accessKey="copy paste your unsplash api access key";

const formEl=document.querySelector("form");
const searchInput=document.getElementById("search-input");
const searchResultEl=document.querySelector(".search-results");
const showMoreButton=document.getElementById("show-more-button");

let inputData= "";
let page=1;

async function searchImages()
{
  inputData = searchInput.value;
  const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  console.log(url);

  const response = await fetch(url);
  const data = await response.json();
  if(page===1)
  {
    searchResultEl.innerHTML="";
  }
  const results=data.results;

  results.map((result)=>
  {
    const ImageWraper=document.createElement("div");
    ImageWraper.classList.add("search-result");
    const Image = document.createElement("img");
    Image.src = result.urls.small;
    Image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent=result.alt_description;

    ImageWraper.appendChild(Image);
    ImageWraper.appendChild(imageLink);
    
    
    searchResultEl.appendChild(ImageWraper);
  });

  page++;
  

  if(page>1)
  {
    showMoreButton.style.display = "block";
  }
  console.log(results);
}

formEl.addEventListener("submit",(event)=>{
  event.preventDefault();
  page=1;
  searchImages();
});

showMoreButton.addEventListener("click",()=>{
  searchImages();
})

