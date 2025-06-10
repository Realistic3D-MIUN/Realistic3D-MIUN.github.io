window.HELP_IMPROVE_VIDEOJS = false;

$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }
//============================================================//
document.getElementById('btn-drag').addEventListener('click', () => setMoveMode(1));
document.getElementById('btn-wander').addEventListener('click', () => setMoveMode(3));
let currentScene = null;
const scenes_depth = {
      'Car':'Car.png',
      'Face':'Face.png',
      'Flower':'Flower.png',
      'London':'London.png',
      'Pasta':'Pasta.png',
      'Pikachu':'Pikachu.png',
      'Semla':'Semla.png',
      'Forest':'Forest.png',};

  console.log(scenes_depth);
  document.getElementById('backButton').addEventListener('click', function() {
    document.querySelector('.scene-grid').style.display = 'grid';
    document.getElementById('viewerSection').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
  });

function showViewer(sceneName) {
  document.querySelector('.scene-grid').style.display = 'none';
  document.getElementById('viewerSection').style.display = 'block';
  document.getElementById('backButton').style.display = 'block';
  loadScene(sceneName);
  resetPose();
}

// Load scenes from directory
async function loadScenes() {
  try {
    const scenes = [
      'Car',
      'Pikachu',
      'Pasta',
      'Forest',
      'Semla',
      'Flower'
    ];
    console.log(scenes);
    const scenes_thumbnails = {
      'Car':'Car.jpeg',
      'Face':'Face.jpeg',
      'Flower':'Flower.png',
      'London':'London.jpeg',
      'Pasta':'Pasta.jpeg',
      'Pikachu':'Pikachu.jpeg',
      'Semla':'Semla.jpeg',
      'Forest':'Forest.jpeg'};

    const grid = document.getElementById('sceneGrid');
    if (!grid) {
      throw new Error('Scene grid element not found');
    }
    
    // Clear any existing content
    grid.innerHTML = '';
    
    scenes.forEach(scene => {
      const item = document.createElement('div');
      item.className = 'scene-item';
      item.onclick = () => showViewer(scene);
      
      const thumb = document.createElement('div');
      thumb.className = 'scene-thumbnail';
      thumb.style.backgroundImage = `url(Thumbnails/${scenes_thumbnails[scene]})`;
      
      const name = document.createElement('div');
      name.className = 'scene-name';
      name.textContent = scene;
      
      item.appendChild(thumb);
      item.appendChild(name);
      grid.appendChild(item);
    });

    // Show error if no scenes were loaded
    if (scenes.length === 0) {
      throw new Error('No scenes found');
    }
  } catch (error) {
    console.error('Error loading scenes:', error);
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = 'Error loading scenes. Please ensure the PreProcessed_MPIs directory exists and contains scene folders.';
    errorDiv.style.display = 'block';
  }
}

// MPI Viewer Functions
function error(text) {
  const e = document.getElementById('error');
  e.textContent = text;
  e.style.display = 'block';
}

function px(a) {
  return a.toFixed(2) + 'px';
}

function nopx(a) {
  return a.toFixed(2);
}

function create(what, classname) {
  const e = document.createElement(what);
  if (classname) {
    e.className = classname;
  }
  return e;
}

function lerp(a, b, p) {
  if (a.constructor == Array) {
    const c = [];
    for (let i = 0; i < a.length; i++) {
      c.push(lerp(a[i], b[i], p));
    }
    return c;
  } else {
    return b*p + a*(1-p);
  }
}

function setDims(element, width, height) {
  element.style.width = px(width);
  element.style.height = px(height);
}

function buildMPI(layers, width, height) {
  const mpi = create('div', 'mpi');
  setDims(mpi, width, height);
  for (let i = 0; i < layers.length; i++) {
    const layer = create('div');
    const url = layers[i].url;
    const depth = layers[i].depth;
    const img = create('div', 'img');
    img.style.backgroundImage = `url(${url})`;
    layer.style.transform = `scale(${nopx(depth)}) translateZ(-${px(depth)})`;
    layer.appendChild(img);
    mpi.appendChild(layer);
  }
  return mpi;
}

function digits(i, min) {
  const s = '' + i;
  if (s.length >= min) {
    return s; 
  } else {
    return ('00000' + s).substr(-min);
  }
}

function loadScene(sceneName) {
  currentScene = sceneName;
  const layerzero = `PreProcessed_MPIs/${sceneName}/layer_$$.png`;
  const num_layers = 32;  
  const width = 256;
  const height = 256;
  const near = 1.0;
  const far = 100.0;
  const fov = 60;

  const focal_length_px = 0.5 * width/Math.tan(fov/2 * Math.PI/180);
  const ppm = 3600;
  const layers = [];
  const ratio = near/far;

  const match = (layerzero.match(/^(.*[^$|])([$]+)([^$]*)$/)
    || layerzero.match(/^(.*[\D]|)([0]+)([\D]*)$/));
  if (!match) {
    error(`Path "${layerzero}" doesn't look like a layer zero URL.`);
    return;
  }
  const prefix = match[1];
  const mindigits = match[2].length;
  const postfix = match[3];

  for (let i = 0; i < num_layers; i++) {
    layers.push({
      url: prefix + digits(i, mindigits) + postfix,
      depth: 1/lerp(ratio, 1, i/(num_layers - 1))});
  }
  const mpi = buildMPI(layers, width, height);
  mpi.postTransform = `translateZ(${px(focal_length_px)})`;
  mpi.preTransform = `scale3D(${ppm/focal_length_px}, ${ppm/focal_length_px}, ${ppm})`;
  const view = create('div', 'view');
  setDims(view, width, height);
  view.innerHTML = '';
  view.appendChild(mpi);
  view.style.perspective = px(focal_length_px);
  pose.offset = 1.5*ppm;
  const viewSpace = document.querySelector('.viewspace');
  const depthSpace = document.querySelector('.depthspace');

  const half = create('div', 'half');
  const whole = create('div', 'whole');
  setDims(half, 0, height * 0.5625);
  setDims(whole, 0, height);
  viewSpace.innerHTML = '';
  viewSpace.appendChild(view);
  viewSpace.appendChild(half);
  viewSpace.appendChild(whole);
  //===================== Adding Depth Here =============================//
  depthSpace.innerHTML = ''
  const depthImage = document.createElement('img');
  depthImage.src = `./Depth/${scenes_depth[sceneName]}`;
  depthImage.style.width = '256px';
  depthImage.style.height = '256px';
  depthImage.style.objectFit = 'contain';
  depthImage.style.border = '3px solid #000';
  depthImage.style.borderRadius = '8px';
  depthImage.alt = `${sceneName} Depth Map`;
  depthSpace.appendChild(depthImage);
  setPose();
  // Add event handlers after view is created
  addHandlers();
}

// Pose management
const pose = {
  rx: 0,
  ry: 0,
  tx: 0,
  ty: 0,
  tz: 0,
  offset: 0
}

let moveScale = 1.0;

function setPose() {
  const mpi = document.querySelector('.mpi');
  const transform = `translateZ(${px(-pose.offset)}) translate3D(${px(pose.tx * moveScale)}, ${px(pose.ty * moveScale)}, ${px(pose.tz * moveScale)}) rotateX(${pose.rx * moveScale}deg) rotateY(${pose.ry * moveScale}deg) translateZ(${px(pose.offset)})`;
  mpi.style.transform = mpi.postTransform + ' ' + transform + ' ' + mpi.preTransform;
}

function resetPose() {
  pose.rx = 0;
  pose.ry = 0;
  pose.tx = 0;
  pose.ty = 0;
  pose.tz = 0;
  setPose();
}

// UI controls
const rotSpeed = 0.003;
const transSpeed = .5;
const wheelSpeed = .5;
const hoverAngle = 2;

let moveMode = 1;
let moveStartTime = 0;

function dragStart(dragState) {
  if (moveMode != 1) {
    return false;
  }
  return true;
}

function dragDuring(dragState, x, y) {
  pose.tx += transSpeed * (x - dragState.x);
  pose.ty += transSpeed * (y - dragState.y);
  dragState.x = x;
  dragState.y = y;
  setPose();
}

function dragEnd(dragState) {}

function addHandlers() {
  const view = document.querySelector('.view');
  view.addEventListener('wheel', function(e) {
    pose.tz += wheelSpeed * e.deltaY;
    setPose();
    e.preventDefault();
  });
  let dragging = false;
  let dragState = {};
  view.addEventListener('mousedown', function(e) {
    dragState.x = e.clientX;
    dragState.y = e.clientY;
    dragState.shiftKey = e.shiftKey;
    e.preventDefault();
    dragging = dragStart(dragState);
  });
  view.addEventListener('dblclick', function(e) {
    resetPose();
    e.preventDefault();
  });
  document.body.addEventListener('mousemove', function(e) {
    if (!dragging) {
      return;
    } else {
      dragDuring(dragState, e.clientX, e.clientY);
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  document.body.addEventListener('mouseup', function(e) {
    if (!dragging) {
      return;
    } else {
      dragging = false;
      dragEnd(dragState);
      e.preventDefault();
    }
  }, true);
  document.body.addEventListener('mouseenter', function(e) {
    if (!dragging) {
      return;
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);
  document.body.addEventListener('mouseleave', function(e) {
    if (!dragging || e.fromElement != document.body) {
      return;
    } else {
      dragging = false;
      dragEnd(dragState);
      e.preventDefault();
    }
  }, true);
}

function updateButtons(id, mode) {
  if (id === 'movemode') {
    document.getElementById('btn-drag').classList.toggle('on', mode === 0);
    document.getElementById('btn-wander').classList.toggle('on', mode === 1);
  } else if (id === 'viewsize') {
    document.getElementById('btn-size-256').classList.toggle('on', mode === 0);
    document.getElementById('btn-size-512').classList.toggle('on', mode === 1);
  }
}

function setMoveMode(mode) {
  moveMode = mode;
  moveStartTime = 0;
  updateButtons('movemode', mode === 1 ? 0 : 1);
  resetPose();
  const view = document.querySelector('.view');
  view.setAttribute('nav', mode);
}

function setViewSize(s) {
  updateButtons('viewsize', s);
  viewSpace = document.querySelector('.viewspace');
  viewSpace.setAttribute('size', s);
}

function tick(time) {
  window.requestAnimationFrame(tick);
  if (moveMode !== 3) {
    return;
  }
  if (!moveStartTime) {
    moveStartTime = time;
  }
  time -= moveStartTime;
  pose.ry = 2*Math.sin(Math.PI * time/4300);
  pose.rx = Math.cos(Math.PI * time/5000);
  pose.tz = 200 * Math.sin(Math.PI * time/8012);
  setPose();
}

// Initialize
loadScenes();
tick();
   
})


