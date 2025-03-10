  console.log("Loaded");
  

  document.addEventListener('DOMContentLoaded', function() {
    const images = [];
    for (let i = 0; i < 20; i++) {
        images.push(`./public/images/Thumbnails/${i}_resized.png`);
    }
  
    const cardContainer = document.getElementById('card-container');
  
    images.forEach((image, index) => {
      const card = document.createElement('div');
      card.classList.add('demo-card');
      card.style.backgroundImage = `url(${image})`;

      card.addEventListener('click', function() {
        var currentUrl = window.location.href;
        currentUrl = currentUrl.replace("/SLFDB.html","")
        console.log("Current URL"+currentUrl);
        var newUrl = currentUrl + "/scene_"+index+".html";
        window.location.href = newUrl;
      });

      const centeredText = document.createElement('div');
      centeredText.classList.add('centered-text');
      centeredText.innerText = `Scene ${index}`;
      card.appendChild(centeredText);
      cardContainer.appendChild(card);
    });
    const LFimages = [];
    const urlList = [];
    const scenenameList = [];
    LFimages.push(`./public/images/scene_0/f001.png`); urlList.push("/LF_Scene_0.html"); scenenameList.push("LF Scene 0");
    LFimages.push(`./public/images/scene_3/f001.png`); urlList.push("/LF_Scene_3.html"); scenenameList.push("LF Scene 3");
    LFimages.push(`./public/images/scene_6/f001.png`); urlList.push("/LF_Scene_6.html"); scenenameList.push("LF Scene 6");
    LFimages.push(`./public/images/scene_9/f001.png`); urlList.push("/LF_Scene_9.html"); scenenameList.push("LF Scene 9");
    
    const cardContainerLF = document.getElementById('card-container-lf');
  
    LFimages.forEach((image, index) => {
      const card = document.createElement('div');
      card.classList.add('demo-card');
      card.style.backgroundImage = `url(${image})`;

      card.addEventListener('click', function() {
        var currentUrl = window.location.href;
        currentUrl = currentUrl.replace("/SLFDB.html","")
        var newUrl = currentUrl + urlList[index];
        console.log(newUrl);
        window.location.href = newUrl;
      });
      const centeredText = document.createElement('div');
      centeredText.classList.add('centered-text');
      centeredText.innerText = scenenameList[index];

      card.appendChild(centeredText);
      cardContainerLF.appendChild(card);
    });
  });
